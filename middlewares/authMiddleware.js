// Middleware para verificar la autenticación del usuario
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.uid) {
    return next();
  } else {
    return res.send('usuario no autenticado');
  }
};

module.exports = {
isAuthenticated,
};