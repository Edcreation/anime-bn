import express from "express";
import userService from "../services/user.service";
import { validate } from "../middleware/validate";
import userSchema from "../schema/validation.schema"
import errorHandler from "../middleware/errorHandler";

const router = express.Router();

router.post('/signup', validate(userSchema.SignUpSchema), errorHandler(userService.SignUp))
router.post('/login', validate(userSchema.LoginSchema), errorHandler(userService.Login))

export default router;