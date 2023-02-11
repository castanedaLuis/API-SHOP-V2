const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Sorry, this email does not exist.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Ups! Wrong password.');;
    }
    delete user.dataValues.password;
    return user;
  }

  //firmado del toekn
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
        throw boom.unauthorized('Sorry, Unauthorized');
    }
    const payload = { 
        sub: user.id 
    };

    const token = jwt.sign(payload, config.jwtSecretRecovery, {expiresIn: '3min'});

    const link = `http://sitiomyfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    
    const mail = {
      from: process.env.CORREO_RECOVERY_PASSWORD,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }

    const rta = await this.sendMail(mail);
    return rta;

  }

  async changePassword(token, newPassword) {
    try {

        //verificamos el token
      const payload = jwt.verify(token, config.jwtSecretRecovery);

      const user = await service.findOne(payload.sub);

      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);

      await service.update(user.id, {recoveryToken: null, password: hash});
      
      return { message: 'password changed' };

    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: process.env.CORREO_RECOVERY_PASSWORD,
        pass: process.env.PASSWORD_RECOVERY_PASSWORD,
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };

  }


  
}

module.exports = AuthService;