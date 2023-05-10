import jwt from 'jsonwebtoken';
import { RESPONSE } from '../types';
import { error } from 'console';

export default function isLoggedIn(req:any, res: any, next: any) {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const payload = jwt.verify(token, 'TOP_SECRET');
        req.user = payload;
        return next();
    } catch (error) {
        return res.status(401).json({
            code: 401,
            message: 'Please Login',
        } as RESPONSE)
    }
}