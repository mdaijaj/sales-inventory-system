const sendSuccess = (res, statusCode, message, data = {}) => {
    res.status(statusCode).json({
      status: true,
      statusCode,
      message,
      data,
    });
};
   

const sendError = (res, statusCode, message, data = {}) => {
    res.status(statusCode).json({
      status: false,
      statusCode,
      message,
      data,
    });
};
   
   
module.exports = {
    sendSuccess,
    sendError,
};
   