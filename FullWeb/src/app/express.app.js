const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config/config.app');
const indexRouter = require('../routes/index.router');
const systemRouter = require('../routes/system.router');
const mongoRouter = require('../routes/mongo.router');
const authRouter = require('../routes/auth.router');
const logMiddleware = require('../middlewares/log.middleware');

module.exports = () => {

    const app = express();

    // static  
    app.use(express.static("public"));

    // view engine
    app.set('view engine', 'ejs');
    app.set('views', 'src/views');

    // context parsers
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // middlewares
    app.use(logMiddleware);

    // routers
    app.use("/",       indexRouter(express));
    app.use("/system", systemRouter(express));
    app.use("/auth",   authRouter(express));    
    app.use("/mongo",  mongoRouter(express));
    
    app.listen(config.port, () => console.log(`Express running at port ${config.port}`));
}