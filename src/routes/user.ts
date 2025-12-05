import { Router } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { createUserSchema, updateUserSchema } from '../models/UserDTO';

const userRepo = new UserRepository();
const router = Router();

// List users
router.get('/', async (_req, res) => {
  const users = await userRepo.list();
  res.json(users);
});

// Get user by id
router.get('/:id', async (req, res) => {
  const user = await userRepo.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Create user
router.post('/', async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { name, email } = parsed.data;
  const existing = await userRepo.findByEmail(email);
  if (existing) return res.status(409).json({ error: 'Email already exists' });
  const created = await userRepo.create({ name, email });
  res.status(201).json(created);
});

// Update user
router.patch('/:id', async (req, res) => {
  const parsed = updateUserSchema.safeParse(req.body ?? {});
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { name, email } = parsed.data;
  const updated = await userRepo.update(req.params.id, { name, email });
  if (!updated) return res.status(404).json({ error: 'User not found' });
  res.json(updated);
});

// Delete user
router.delete('/:id', async (req, res) => {
  const ok = await userRepo.delete(req.params.id);
  if (!ok) return res.status(404).json({ error: 'User not found' });
  res.status(204).send();
});

export default router;
