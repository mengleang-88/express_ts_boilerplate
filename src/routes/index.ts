import { Router } from 'express';
import health from './health';
import users from './user';

const router = Router();

router.use(health);
router.use('/users', users);

export default router;
