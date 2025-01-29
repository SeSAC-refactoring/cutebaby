import express from 'express';
import { getUserPosts } from '../controllers/postController.js';

const router = express.Router();

router.post('/getPosts', getUserPosts);

export default router;
