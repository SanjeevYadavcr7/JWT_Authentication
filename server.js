require('dotenv').config({ path: './config.env' });
const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

connectDB();

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

//Error handler should be last piece of middleware
app.use(errorHandler);

const server = app.listen(PORT, () => console.log('Express Server Started!'));

// to avoid big error text in console
//now it will just print error in a singe line
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
