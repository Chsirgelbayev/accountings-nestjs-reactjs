import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    RequestTimeoutException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ExceptionMessage } from 'src/common/enums/exception-message.enum';
import { ConfigEnum } from '../enums/config.enum';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    constructor(private readonly configService: ConfigService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const reqStartTime = Date.now();
        const REQUEST_TIMEOUT_TIME = this.configService.get(
            ConfigEnum.REQUEST_TIMEOUT_TIME
        );

        return next.handle().pipe(
            timeout(REQUEST_TIMEOUT_TIME),
            catchError(err => {
                if (err instanceof TimeoutError) {
                    throw new RequestTimeoutException(
                        `${ExceptionMessage.REQUSET_TIMEOUT} ${
                            Date.now() - reqStartTime
                        }ms`
                    );
                }

                throw err;
            })
        );
    }
}
