import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { messages } from 'src/common/data/messages';
import { Request } from 'express';

@Injectable()
export class AuthJwtGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        let token: string;
        const reqHeadTok = req.headers.authorization;
        const reqCookTok = req.cookies.token;

        if (reqHeadTok && reqHeadTok.startsWith('Bearer')) {
            token = reqHeadTok.split(' ')[1];
        } else if (reqCookTok) {
            token = reqCookTok;
        }

        if (!token) {
            throw new UnauthorizedException(messages.MESG_USER_NOT_AUTH);
        }

        try {
            req.user = this.jwtService.verify(token);

            return true;
        } catch (e) {
            throw new UnauthorizedException(messages.MESG_INVALID_TOKEN);
        }
    }
}


