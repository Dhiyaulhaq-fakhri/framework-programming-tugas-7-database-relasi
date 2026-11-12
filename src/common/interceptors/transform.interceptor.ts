import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Interceptor untuk menyeragamkan format respons data yang dikirim oleh API.
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
    // Menangkap hasil proses endpoint dan mengubahnya menjadi format respons JSON.
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
        map((data) => ({
            success: true,
            message: data?.message ?? 'Data berhasil diambil',
            data: data?.data ?? data,
        })),
        );
    }
}