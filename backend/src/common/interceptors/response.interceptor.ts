import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, PaginatedResponse } from '../interfaces/api-response.interface';
import { createSuccessResponse } from '../responses/api-response.factory';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse();
    const statusCode: number = response.statusCode ?? 200;

    return next.handle().pipe(
      map((result: any) => {
        if (result === null || result === undefined) {
          return { ...createSuccessResponse(null), statusCode };
        }

        if (this.isPaginatedResponse(result)) {
          return {
            ...result,
            statusCode,
            success: true,
          };
        }

        return { ...createSuccessResponse(result), statusCode };
      }),
    );
  }

  private isPaginatedResponse(result: any): result is PaginatedResponse<unknown> {
    return Boolean(result && typeof result === 'object' && Array.isArray(result.data) && result.meta);
  }
}
