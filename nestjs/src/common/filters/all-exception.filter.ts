/**
 * Custom exception filter for handling various exceptions in NestJS.
 * This filter transforms the exception response into a standardized format.
 * It extracts error details, maps error codes to human-readable messages,
 * and sends a JSON response with the appropriate HTTP status code.
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { Error } from 'src/types/error.type';
import errorMessage from '../errors/errorMessage';
import { Request } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  /**
   * Method to handle caught exceptions.
   * Transforms the exception response and sends a standardized JSON response.
   * @param exception - The caught exception instance.
   * @param host - ArgumentsHost instance for accessing the response object.
   */
  catch(exception: any, host: ArgumentsHost) {
    // Extracting necessary objects for handling the exception
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { body, params, query, url, headers } = ctx.getRequest<Request>();

    const errors: Error[] = [];
    let status: number;
    this.logger.log(
      `[Request]: ${JSON.stringify({ body, params, query, url, headers })}`,
    );
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionRes = exception.getResponse() as any;

      // Check if the exception message is an array of errors
      if (Array.isArray(exceptionRes?.message)) {
        const messages = exceptionRes.message as Error[];
        // Iterate through each error, map error codes to messages, and push to the errors array
        messages.forEach((message) => {
          errors.push({
            ...message,
            message: message.message || errorMessage[message.code],
          });
        });
      } else {
        // Map error code to message for a single error and push to the errors array
        errors.push({
          ...exceptionRes,
          message: exceptionRes.message || errorMessage[exceptionRes.code],
        });
      }

      this.logger.debug(`${JSON.stringify(errors)}`);
    } else {
      // Handle non-HttpExceptions with an internal server error status
      status = HttpStatus.INTERNAL_SERVER_ERROR.valueOf();
      /* 
        TODO Notification to third parties such as slack, ...
      */

      errors.push({
        code: status.toString(),
        message: 'INTERNAL_SERVER_ERROR',
      });

      this.logger.error(exception);
      this.logger.debug(exception.stack);
    }
    // Send a JSON response with standardized error format and appropriate status code
    response.status(status).json({
      success: false,
      errors,
    });
  }
}
