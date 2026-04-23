import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const statusCode: number = response.statusCode ?? 200;

    return next.handle().pipe(
      map((result: any) => {
        if (result === null || result === undefined) {
          return { statusCode, success: true, data: null, message: 'Success' };
        }

        // Paginated response: { data: [], meta: {} }
        if (result?.data !== undefined && result?.meta !== undefined) {
          return { statusCode, success: true, message: 'Success', ...result };
        }

        return { statusCode, success: true, data: result, message: 'Success' };
      }),
    );
  }
}
