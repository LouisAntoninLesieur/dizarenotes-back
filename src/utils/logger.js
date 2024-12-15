import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info', // Minimum level to log
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Display logs in the console
    new transports.File({ filename: 'app.log' }) // Save logs in a file named app.log
  ]
});

export default logger;

// When to use ?
// Use a logger to track the flow of your application and to help you debug and monitor it.
// The logger can help you identify where an error occurred and what caused it.
// It can also help you monitor the performance of your application.
// You can use the logger to track the flow of your application and to help you debug and monitor it.