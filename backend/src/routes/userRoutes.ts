import express from 'express';
import { register, login, updateProfile, deleteAccount } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update', authenticateToken, updateProfile); // Protected route
router.delete('/delete', authenticateToken, deleteAccount); // Protected route
router.get('/test', (req, res) => { res.send('Test route') });

export default router;
