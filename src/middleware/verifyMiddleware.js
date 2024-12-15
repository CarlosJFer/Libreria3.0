const jwt = require('jsonwebtoken');

// Middleware para verificar el JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];
  console.log("Token:", token);
  if (!token) {
    return res.status(403).send('Token requerido para la autenticación');
  }

  // Verifica el token con la clave secreta
  jwt.verify(token, "my_secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    console.log("Decoded token:", decoded);
    req.user = { _id: decoded.id, role: decoded.role }; // Ajustar el campo de userId
    next();
  });
};

module.exports = verifyToken;
