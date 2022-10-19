import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    BadRequestException,
    NotFoundException
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { Request, Response } from 'express';
import { ExceptionMessage } from '../enums/exception-message.enum';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ErrorName } from '../enums/error-name.enum';

@Catch()
export class AllErrorsFilter implements ExceptionFilter {
    catch(err: InternalServerErrorException, host: ArgumentsHost): void {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const res: Response = ctx.getResponse<Response>();
        const req: Request = ctx.getRequest<Request>();

        if (err instanceof MongoServerError && err.code === 11000) {
            const message = `${ExceptionMessage.DUPLICATE} ${err}`;
            err = new BadRequestException(message);
        }

        if (err.name === ErrorName.CAST) {
            const message = ExceptionMessage.RESOURS_NOT_FOUND;
            err = new NotFoundException(message);
        }

        if (err.name === ErrorName.VALIDATION) {
            err = new BadRequestException(err.message);
        }

        const status: number =
            err instanceof HttpException
                ? err.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponce: any =
            err instanceof HttpException
                ? err.getResponse()
                : { message: ExceptionMessage.SERVER_ERROR };

        res.status(status).json({
            success: false,
            error: errorResponce.message,
            statusCode: status,
            path: req.url
        });
    }
}
