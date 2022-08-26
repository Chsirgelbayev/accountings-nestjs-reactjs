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
import { messages } from '../constants/messages.constant';

@Catch()
export class AllErrorsFilter implements ExceptionFilter {
    catch(err: InternalServerErrorException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res: Response = ctx.getResponse();
        const req: Request = ctx.getRequest();

        if (err instanceof MongoServerError && err.code === 11000) {
            const message = `${messages.MESG_DUPLICATE} ${err}`;
            err = new BadRequestException(message);
        }

        if (err.name === 'CastError') {
            const message = `${messages.MESG_RESOURS_NOT_FOUND}`;
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
