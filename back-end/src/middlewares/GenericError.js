// const { ErrorRequestHandler } = require('express');

// class MyNewError extends Error {
//   status

//   constructor(status, message) {
//     super(message);
//     this.status = status;
//   }
// }

// const GenericError = (
//   error,
//   _req,
//   res,
//   _next,
// ) => {
//   const { status, message } = error;
//   console.error('Meu middleWare --------->', error);
//   return res.status(status || 500)
//     .send({ message: message || error });
// };

// module.exports = {
//   MyNewError,
//   GenericError,
// };

// app.use((error, _req, res, _next) => {
//   return res.status(500).json({ error: error.message });
// });

// const newError = (error, _req, res, _next) => {
//   if (error.name && error.status) {
//     return res.status(error.status).send({ message: error.message });
//   }
//   console.error("Meu middleWare --------->", error);
//   return res.status(500).send({ error });
// };

// module.exports = {
//   newError,
// };