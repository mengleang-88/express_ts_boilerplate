export type UserRecord = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

class UserModel {
  private store: Map<string, UserRecord> = new Map();

  async findUnique({ where }: { where: { id?: string; email?: string } }): Promise<UserRecord | null> {
    if (where.id && this.store.has(where.id)) return this.store.get(where.id)!;
    if (where.email) {
      for (const u of this.store.values()) {
        if (u.email === where.email) return u;
      }
    }
    return null;
  }

  async findMany({ orderBy }: { orderBy?: { createdAt?: 'asc' | 'desc' } } = {}): Promise<UserRecord[]> {
    const arr = Array.from(this.store.values());
    if (orderBy?.createdAt === 'desc') arr.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    if (orderBy?.createdAt === 'asc') arr.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return arr;
  }

  async create({ data }: { data: { name: string; email: string } }): Promise<UserRecord> {
    const now = new Date();
    const id = (Math.random() + 1).toString(36).substring(2, 10);
    const rec: UserRecord = { id, name: data.name, email: data.email, createdAt: now, updatedAt: now };
    this.store.set(id, rec);
    return rec;
  }

  async update({ where, data }: { where: { id: string }; data: Partial<{ name: string; email: string }> }): Promise<UserRecord> {
    const rec = this.store.get(where.id);
    if (!rec) throw new Error('Not found');
    const updated: UserRecord = { ...rec, ...data, updatedAt: new Date() } as UserRecord;
    this.store.set(where.id, updated);
    return updated;
  }

  async delete({ where }: { where: { id: string } }): Promise<void> {
    const existed = this.store.delete(where.id);
    if (!existed) throw new Error('Not found');
  }
}

export class PrismaClient {
  user: UserModel = new UserModel();
}

export default PrismaClient;
