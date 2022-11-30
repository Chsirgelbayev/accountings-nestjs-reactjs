import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    RequestTimeoutException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { PropertyPath, ExceptionMessage } from '../constants';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    constructor(private readonly configService: ConfigService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const REQUEST_TIMEOUT_TIME = this.configService.get(
            PropertyPath.REQUEST_TIMEOUT_TIME
        );

        return next.handle().pipe(
            timeout(REQUEST_TIMEOUT_TIME),
            catchError(err => {
                if (err instanceof TimeoutError) {
                    throw new RequestTimeoutException(
                        `${ExceptionMessage.REQUSET_TIMEOUT} ${
                            Date.now() - now
                        }ms`
                    );
                }

                throw err;
            })
        );
    }
}
