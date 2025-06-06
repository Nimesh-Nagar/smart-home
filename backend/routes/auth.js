import express from 'express';
import { loginUser } from '../controllers/authControllers.js';

const router = express.Router();

// router.post('/login', loginUser);
router.route('/login').post(loginUser);

export default router;

