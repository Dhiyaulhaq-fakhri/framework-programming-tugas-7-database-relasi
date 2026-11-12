import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

// Exception Filter untuk menangani dan menyeragamkan format respons error HTTP.
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    // Menangkap exception yang terjadi dan mengambil objek request-response HTTP.
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        // Menentukan status HTTP berdasarkan jenis exception, atau 500 jika terjadi error internal.
        const status =
        exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        // Mengambil pesan error dari exception untuk ditampilkan pada respons.
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

        // Mengirim respons JSON dengan informasi status, pesan, dan jenis error.
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