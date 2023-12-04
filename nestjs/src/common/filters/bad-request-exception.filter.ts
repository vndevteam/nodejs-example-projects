/**
 * Custom exception filter for handling BadRequestExceptions in NestJS.
 * This filter transforms the exception response into a standardized format.
 * It extracts error details, maps error codes to human-readable messages,
 * and sends a JSON response with the appropriate HTTP status code.
 */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { Error } from 'src/types/error.type';
import errorMessage from '../errors/errorMessage';

@Catch(BadRequestException)
export class BadRequestExceptionFilter
  implements ExceptionFilter<BadRequestException>
{
  /**
   * Method to handle the caught BadRequestException.
   * Transforms the exception response and sends a standardized JSON response.
   * @param exception - The caught BadRequestException instance.
   * @param host - ArgumentsHost instance for accessing the response object.
   */
  catch(exception: BadRequestException, host: ArgumentsHost) {
    // Extracting necessary objects for handling the exception
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse() as any;
    const errors: Error[] = [];

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

    // Send a JSON response with standardized error format and appropriate status code
    response.status(status).json({
      success: false,
      errors,
    });
  }
}
