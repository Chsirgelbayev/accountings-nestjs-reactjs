import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ExceptionMessage } from '../../common/enums';
import { ExpressRequest } from '../../common/interfaces';

@Injectable()
export class AuthJwtGuard implements CanActivate {
    constructor(private readonly _jwtService: JwtService) {}

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
            req.user = this._jwtService.verify(token);

            return true;
        } catch (e) {
            throw new UnauthorizedException(ExceptionMessage.INVALID_TOKEN);
        }
    }
}
