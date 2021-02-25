module.exports = (express) => {

    const router = express.Router();
    const controller = require('../controllers/index.controller')();

    router.route('/').get(controller.index);

    return router;
}