const authorizeAdmin = (req, res, next) => {
    const user = req.user;
    // Aquí asumes que req.user fue previamente asignado
    // por algún middleware de autenticación, como verifyToken
  
    if (!user || user.role !== "admin") {
      return res.status(403).send("Acceso denegado: Se requieren privilegios de administrador");
    }
  
    // Si el usuario es admin, permitir que continúe
    next();
  };
  
  module.exports = authorizeAdmin;
  