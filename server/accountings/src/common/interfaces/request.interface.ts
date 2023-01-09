import { Request } from 'express';
import { User } from 'src/users/schemas/user.schema';

export interface ExpressRequest extends Request {
    user?: User;
}
