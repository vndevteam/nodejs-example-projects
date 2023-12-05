import { createLogger, format, transports } from 'winston';

const prodLoggerConfig = (level: string) => {
  return {
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json(),
    ),
    transports: [
      new transports.File({
        filename: 'error.log',
        level,
      }),
      new transports.Console({
        level,
      }),
    ],
  };
};

export const newInstance = (level: string) => {
  return createLogger(prodLoggerConfig(level));
};
