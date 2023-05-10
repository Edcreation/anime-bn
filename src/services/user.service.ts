import User from "../models/user.model";
import { USER_LOGIN, USER_SIGNUP, RESPONSE } from "../types";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const { hash, compare } = bcrypt;

const SignUp = async (req: any, res: any) => {
    let userInfo: USER_SIGNUP = req.body;
    userInfo.password = await hash(userInfo.password, 10);
    const userExists = await User.findOne({$or: [
        {email: userInfo.email},
        {username: userInfo.username}
    ]});
    if (userExists) {
        return res.status(409).json({
            code: 409,
            message: 'User Already Exists'
        } as RESPONSE)
    }
    await User.create(userInfo).then((data) => {
        const userObj = {
            id: data!.id,
            email: data.email,
            username: data.username,
        }
        jwt.sign(userObj, 'TOP_SECRET', (err, payload) => {
            if (!err) {
                return res.status(200).json({
                    code: 200,
                    message: 'Sign Up Successful.',
                    data: payload
                } as RESPONSE)   
            }
            throw new Error('Error Signing token.')
        })
    })
    .catch((error) => {
        return res.status(400).json({
            code: 400,
            message: 'Account Not Created.',
            error: error.message,
        } as RESPONSE)
    });
}

const Login = async (req: any, res: any) => {
    let userInfo: USER_LOGIN = req.body;
    const user = await User.findOne({email: userInfo.email})
    if (!user) {
        return res.status(401).json({
            code: 401,
            message: 'User Not Found.',
        } as RESPONSE)      
    }
    const validUser = await compare(userInfo.password, user!.password);
    if (validUser) {
        const userObj = {
            id: user!.id,
            email: user!.email,
            username: user!.username
        }
        jwt.sign(userObj, 'TOP_SECRET', (err, payload) => {
            if (!err) {
                return res.status(200).json({
                    code: 200,
                    message: 'Log In Successful.',
                    data: payload
                } as RESPONSE)   
            }
            throw new Error('Error Signing token.')
        })
    }  
    else {
        return res.status(401).json({
            code: 401,
            message: 'Password Incorrect.',
        } as RESPONSE)
    }
}

export default { SignUp, Login }