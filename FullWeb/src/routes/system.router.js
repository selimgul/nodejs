module.exports = (express) => {

    const router = express.Router();
    const controller = require('../controllers/system.controller')();
    
    router.route("/")
          .get(controller.getenv);

    return router;
}