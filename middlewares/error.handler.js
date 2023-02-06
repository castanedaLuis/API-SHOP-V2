const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom');


function logErrors (err, req, res, next) {
    //console.log('logErrors');
    console.error(err);
    next(err);
  }
  
  function errorHandler(err, req, res, next) {
    //console.log('errorHandler');
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
  function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
      const { output } = err;
      res.status(output.statusCode).json(output.payload);
    }
    next(err);
  }

  //Para cachar los errores del ORM sequalize
  function ormErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
      res.status(409).json({
        statusCode: 409,
        message: err.name,
        errors: err.errors
      });
    }
    next(err);
  }
  
  
  
  
  module.exports = { logErrors, errorHandler , boomErrorHandler,ormErrorHandler }