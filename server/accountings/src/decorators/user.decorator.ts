import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/users/users.schema';
import { ExpressRequest } from '../interfaces';

export const UserDecorator = createParamDecorator(
    (data: string, ctx: ExecutionContext): User => {
        const req: ExpressRequest = ctx.switchToHttp().getRequest();
        const user: User = req.user;

        return data ? user?.[data] : user;
    }
);
