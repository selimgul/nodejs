const mongoose = require('../modules/db/mongo.client.mongoose')();
const jwt = require('../modules/utils/jwt')();

module.exports = () => {

    function loginGet(req, res) {
        res.render('auth/login');
    }

    function signupGet(req, res) {
        res.render('auth/signup');
    }

    async function loginPost(req, res) {

        try {
            const user = await mongoose.getOneByName(req.body.username);
            
            if (!user || (user.password !== req.body.password))
                throw ("Not authorized user.");

            const token = jwt.sign({
                id: user.id,
                name: req.body.username,
                password: req.body.password
            });

            res.header('x-access-token', token);
            res.locals.message = token;
        } catch (err) {
            res.locals.message = err;
        }

        res.render('auth/login');
    }

    async function signupPost(req, res) {

        try {
            const user = await mongoose.getOneByName(req.body.username);

            if (!user) {
                await mongoose.insert(req.body.username, req.body.password);
                res.locals.message = "User created.";
            } else
                res.locals.message = "User already exists.";
        } catch (err) {
            res.locals.message = err;
        }

        res.render("auth/signup");
    }
    return {
        loginGet,
        loginPost,
        signupGet,
        signupPost,
    };
}