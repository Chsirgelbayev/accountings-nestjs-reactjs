import { Request } from 'express';
import { User } from 'src/modules/users/users.schema';

export interface ExpressRequest extends Request {
    user?:  User;
}

