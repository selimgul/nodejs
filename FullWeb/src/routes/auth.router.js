module.exports = (express) => {

    const router = express.Router();
    const controller = require('../controllers/auth.controller')();
    
    router.route('/login').get(controller.loginGet)
                          .post(controller.loginPost);
    router.route('/signup').get(controller.signupGet)
                           .post(controller.signupPost);                     

    return router;
}