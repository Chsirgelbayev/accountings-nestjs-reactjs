import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ExceptionMessage } from 'src/common/enums/exception-message.enum';
import { Request } from 'express';
import { ExpressRequest } from 'src/common/interfaces/request.interface';

@Injectable()
export class AuthJwtGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req: ExpressRequest = context.switchToHttp().getRequest();

        let token: string;
        const reqHeadTok: string = req.headers.authorization;
        const reqCookTok: string = req.cookies.token;

        if (reqHeadTok && reqHeadTok.startsWith('Bearer')) {
            token = reqHeadTok.split(' ')[1];
        } else if (reqCookTok) {
            token = reqCookTok;
        }

        if (!token) {
            throw new UnauthorizedException(ExceptionMessage.USER_NOT_AUTH);
        }

        try {
            req.user = this.jwtService.verify(token);

            return true;
        } catch (e) {
            throw new UnauthorizedException(ExceptionMessage.INVALID_TOKEN);
        }
    }
}
