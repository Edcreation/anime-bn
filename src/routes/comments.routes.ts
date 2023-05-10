import express from "express";
import commentSchema from '../schema/validation.schema';
import { validate } from "../middleware/validate";
import commentService from "../services/comment.service";
import errorHandler from "../middleware/errorHandler";
import isLoggedIn from "../middleware/isLoggedIn";

const router = express.Router();

router.post('/create/:id', isLoggedIn, validate(commentSchema.CommentSchema), errorHandler(commentService.addComment));
router.get('/:id', errorHandler(commentService.getAllComments));

export default router;