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

        if (err.name === 'CastError') {
            const message = ExceptionMessage.RESOURS_NOT_FOUND;
            err = new NotFoundException(message);
        }

        if (err.name === 'ValidationError') {
            err = new BadRequestException(err.message);
        }

        const status: number =
            err instanceof HttpException
                ? err.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponce: any =
            err instanceof HttpException
                ? err.getResponse()
                : { message: 'Server error' };

        res.status(status).json({
            success: false,
            error: errorResponce.message,
            statusCode: status,
            path: req.url
        });
    }
}
