const mongoose = require('mongoose');
const config = require('../../config/config.app');
const User = require("../../models/mongo.model.user");

mongoose.connect(config.mongodb.connectionString, config.mongodb.options)
    .then(() => console.log("Connection Successful."))
    .catch((err) => console.log("Connection Error. => " + err));

module.exports = () => {

    async function get() {

        let Users;

        await User.find({}).then(users => Users = users)
            .catch(err => {
                throw err
            });

        return Users;
    }

    async function getOneByID(id) {

        let currentUser;

        await User.findOne({
                _id: new mongoose.mongo.ObjectId(id)
            }).then(user => currentUser = user)
            .catch(err => {
                throw err
            });

        return currentUser;
    }

    async function getOneByName(name) {

        let currentUser;

        await User.findOne({
                name: name
            }).then(user => currentUser = user)
            .catch(err => {
                throw err
            });

        return currentUser;
    }

    async function create(name, password) {

        let user = new User({
            name: name,
            password: password
        });

        await user.save()
            .then(doc => user = doc)
            .catch(err => {
                throw err
            });

        return user;
    }

    async function update(id, name, password) {

        let user;

        await User.findOneAndUpdate({
                _id: new mongoose.mongo.ObjectId(id)
            }, {
                name: name,
                password: password
            }, {
                new: true
            })
            .then(doc => user = doc)
            .catch(err => {
                throw err
            });

        return user;
    }

    async function del(id) {

        let user;

        await User.deleteOne({
                _id: new mongoose.mongo.ObjectId(id)
            })
            .then(doc => user = doc)
            .catch(err => {
                throw err
            });

        return user;
    }

    return {
        get,
        getOneByID,
        getOneByName,
        create,
        update,
        del
    }
}