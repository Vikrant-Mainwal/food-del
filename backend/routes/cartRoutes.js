import express from 'express';
import { addCart, getCart, removeCart } from '../controller/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addCart);
cartRouter.post('/remove', authMiddleware, removeCart);
cartRouter.post('/get', authMiddleware, getCart);

export default cartRouter;
