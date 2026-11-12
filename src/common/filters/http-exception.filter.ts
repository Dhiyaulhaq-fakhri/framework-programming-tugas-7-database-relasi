import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status =
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        let message = 'Internal server error';
        if (exception instanceof HttpException) {
        const res = exception.getResponse();
        if (typeof res === 'string') {
            message = res;
        } else if (typeof res === 'object' && res !== null && 'message' in res) {
            const m = (res as any).message;
            message = Array.isArray(m) ? m.join(', ') : m;
        }
        }

        response.status(status).json({
        success: false,
        message,
        error:
            exception instanceof HttpException
            ? exception.name
            : 'Internal Server Error',
        statusCode: status,
        });
    }
}