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
import { ExceptionMessage } from 'src/enums/exception-message.enum';
import { PropertyPath } from '../enums/property-path.enum';

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
