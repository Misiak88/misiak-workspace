import morgan from 'morgan';

// Define a custom token that returns the current UNIX timestamp.
morgan.token('timestamp', () => {
  return String(Math.round(+new Date() / 1000));
});

// Define a custom token that returns the current ISO formatted timestamp
morgan.token('timestampISO', () => {
  return new Date().toISOString();
});

/*
  Morgan format explanation:
  - :timestamp --> custom token for current time
  - :method    --> HTTP verb (GET, POST, etc.)
  - :url       --> the request path
  - :status    --> HTTP status code in the response
  - :response-time[0]ms --> time taken to handle the request, in ms (rounded)
*/
const morganFormat = ':timestamp :timestampISO :method :url :status :response-time[0]ms';

export const loggerMiddleware = morgan(morganFormat);
