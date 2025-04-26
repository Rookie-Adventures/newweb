import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

interface ExceptionResponse {
  message?: string | string[];
  errors?: string | string[];
  [key: string]: any;
}

interface ResponseBody {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  errors: string | null;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ExceptionResponse;

    let message: string;
    let errors: string | null = null;

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      message = exceptionResponse.message?.toString() || exception.message;
      errors = exceptionResponse.errors?.toString() || null;
    } else {
      message = exception.message;
    }

    const responseBody: ResponseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      errors,
    };

    response.status(status).json(responseBody);
  }
}
