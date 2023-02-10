const boom = require('@hapi/boom');
const { config } = require('../config/config')


function checkApiKey(req, res, next) {
    const apikey = req.headers['api'];
    if( apikey === config.apiKey){
        next()
    }else{
        next(boom.unauthorized('Necesita la apiKey'));
    }

}

//Versión 1 del midleware para roles
function checkAdminRole(req, res, next) {
    console.log(req);
    const user = req.user;
    if (user.role === 'admin') {
      next();
    } else {
      next(boom.unauthorized('Este servicio es para roles Administrativo'));
    }
}
  
  
    //Versión 2 del midleware para roles
  function checkRoles(...roles) {
    return (req, res, next) => {
      const user = req.user;
      if (roles.includes(user.role)) {
        next();
      } else {
        next(boom.unauthorized(`Es servicio es para roles permitidos. Este rol ${user.role} no tiene permisos`));
      }
    }
}
module.exports = { checkApiKey, checkAdminRole, checkRoles }