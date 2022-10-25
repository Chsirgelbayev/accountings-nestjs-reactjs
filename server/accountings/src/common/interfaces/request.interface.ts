import { Request } from 'express';
import { User } from 'src/users/users.schema';

export interface ExpressRequest extends Request {
    user?:  User;
}

