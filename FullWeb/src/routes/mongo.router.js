const authMiddleware = require('../middlewares/auth.middleware');

module.exports = (express) => {

    const router = express.Router();
    const controller = require('../controllers/mongo.controller')();

    router.all('/', authMiddleware);

    router.route('/')
        .get(controller.getAll)
        .post(controller.create)
        .put(controller.update);

    router.route('/:id')
        .get(controller.getOne)
        .delete(controller.del);

    return router;
}