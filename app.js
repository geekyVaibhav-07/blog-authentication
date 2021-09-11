const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { AppError, globalErrorHandler } = require('@geekcorp/express-utils')
const cookieParser = require('cookie-parser')
const loginRoutes = require('./routes/loginRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/login', loginRoutes);
app.use('/auth', authRoutes);

app.route('*').all((req, res, next) => {
    next(new AppError('route not defined', 404));
});

app.use((err, req, res, next) => globalErrorHandler(err, req, res, next))

module.exports = app;