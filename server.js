const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const snackReviews = require('./src/routes/snackReviews')
app.use('/api/snacks/:id/reviews', snackReviews)

const userReviews = require('./src/routes/userReviews')
app.use('/api/users/:id/reviews', userReviews)

const snacks = require('./src/routes/snacks');
app.use('/api/snacks', snacks);

const reviews = require('./src/routes/reviews');
app.use('/api/reviews', reviews);

const users = require('./src/routes/users')
app.use('/api/users', users)

const auth = require('./src/routes/auth');
app.use('/auth', auth)

app.use((req, res) => {
  const status = 404;
  const message = `Could not ${req.method} ${req.path}`;
  res.status(status).json({ status, message });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  res.status(status).json({ message, status });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port', port);
});
