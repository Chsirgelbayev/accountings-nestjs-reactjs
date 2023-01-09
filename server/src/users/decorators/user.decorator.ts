import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../schemas/user.schema';

export const UserDecorator = createParamDecorator(
    (data: string, ctx: ExecutionContext): User => {
        const req = ctx.switchToHttp().getRequest();
        const user: User = req.user;

        return data ? user?.[data] : user;
    }
);
