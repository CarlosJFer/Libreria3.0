const authorizeAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== "admin") {
      return res.status(403).send("Acceso denegado: Se requieren permisos de administrador");
    }
    next();
  };
  
  module.exports = authorizeAdmin;