import express from 'express';
import dotenv from 'dotenv';
// import crypto from 'crypto';

// import Course from './course';
import ConnectionsInitiator from './connections';
import AppRoutes from './src/app.routes';
import { HandleHTTPErrors, HandleGeneralErrors } from './middlewares/error.middleware';
import SequelizeAssociationsMaker from './connections/sequelize/associations';

export default class App {
  static async init() {
    const app = express();
    dotenv.config();

    // const router = express.Router();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    await ConnectionsInitiator.initConnections();
    SequelizeAssociationsMaker.init();

    app.use('/api', new AppRoutes().router);

    app.use(HandleHTTPErrors);
    app.use(HandleGeneralErrors);

    return app;
  }
}

// const apiRouting = router.post('/registration', (req, res) => {
//   const { username, password } = req.body;
//   console.log('password > ', password)
//   console.log("==========   HMAC   ==========")
//   const secretKey = 'mySecretKey';
//   const hmacPassword = crypto.createHmac('sha256', secretKey).update(password).digest('hex');
//   console.log('hmacPassword > ', hmacPassword)
//   // console.log("==========   SALT   ==========")
//   // const salt = crypto.randomBytes(16).toString('hex');
//   // const hashPassword = crypto.scryptSync(hmacPassword, salt, 64).toString('hex');
//   // console.log('salt > ', salt)
//   // console.log('hashPassword > ', hashPassword)
//   // console.log("==========   Cipher   ==========")
//   // const key = crypto.randomBytes(32);
//   // const iv = crypto.randomBytes(16);

//   // const cipher = crypto.createCipheriv('aes256', key, iv);
//   // const encryptedMessage = cipher.update(hmacPassword, 'utf8', 'hex') + cipher.final('hex');

//   // const decipher = crypto.createDecipheriv('aes256', key, iv);
//   // const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8');
//   // console.log('key > ', key)
//   // console.log('iv > ', iv)
//   // console.log('cipher > ', cipher)
//   // console.log('encryptedMessage > ', encryptedMessage)
//   // console.log('decipher > ', decipher)
//   // console.log('decryptedMessage > ', decryptedMessage)

//   console.log('=====   Singleton   =====')
//   const courseObj = Course.createInstance('bTech', '4 years');
//   const courseObj1 = Course.createInstance('BCA', '3 years');
//   // const courseObj2 = new Course('BCA', '3 years');

//   console.log('courseObj > ', courseObj)
//   console.log('courseObj1 > ', courseObj1)

//   console.log(courseObj.getCourseName())

//   res.send('Registered')
// })

// app.use(apiRouting)
