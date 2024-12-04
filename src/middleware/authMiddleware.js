const jwt = require("jsonwebtoken");

// Middleware para verificar el JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send("Token requerido para la autenticación");
  }
  // Verifica el token con la clave secreta
  jwt.verify(token.split(" ")[1], "mi_clave_secreta", (err, decode) => {
    if (err) {
      return res.status(401).json({ error: "Token invalido" });
    }
    req.user = decode;
    console.log("Datos decodificados",decode);
    // Continuar con la siguiente función
    next();
  });
};

module.exports = verifyToken;
