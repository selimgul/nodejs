const mongoose = require('../modules/db/mongo.client.mongoose')();

module.exports = () => {

    function getAll(req, res) {        
        mongoose.get().then((data) => res.send(data)).catch((err) => error(err, res));
    }

    function getOne(req, res) {
        mongoose.getOneByID(req.params.id).then((data) => res.send(data)).catch((err) => error(err, res));
    }

    function create(req, res) {
        mongoose.create(req.body.name, req.body.password).then((data) => res.send(data)).catch((err) => error(err, res))
    }

    function update(req, res) {
        mongoose.update(req.body.id, req.body.name, req.body.password).then((data) => res.send(data)).catch((err) => error(err, res))
    }

    function del(req, res) {
        mongoose.delete(req.params.id).then((data) => res.send(data)).catch((err) => error(err, res))
    }

    function error(err, res) {
        console.log(err);
        res.send(err);
    }

    return {
        getAll,
        getOne,
        create,
        update,
        del
    };
}