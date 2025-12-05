import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.string().email('email must be valid'),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
