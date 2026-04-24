import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createSuccessResponse } from '../responses/api-response.factory';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter')

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as any)?.message ?? exception.message
        : 'Internal server error';

    const formattedMessage = Array.isArray(message) ? message.join(', ') : message

    if (statusCode >= 500) {
      this.logger.error(
        `[${request.method}] ${request.url} → ${statusCode} ${formattedMessage}`,
        exception instanceof Error ? exception.stack : undefined,
      )
    } else {
      this.logger.warn(`[${request.method}] ${request.url} → ${statusCode} ${formattedMessage}`)
    }

    response.status(statusCode).send({
      ...createSuccessResponse(null),
      statusCode,
      success: false,
      message: formattedMessage,
    });
  }
}
