const mongodb = require('mongodb').MongoClient;
const config = require('../../config/config.app');

module.exports = () => {

    function get() {
        mongodb.connect(config.mongodb.connectionString, config.mongodb.options, function (err, db) {
            if (err) throw err;

            var dbo = db.db("userdb");
            var query = {};

            dbo.collection("usercollection").find(query).toArray(function (err, result) {
                if (err) throw err;

                result.forEach((user, i) => logUser(user));

                db.close();
            });
        });
    };

    function getOne(id) {
        mongodb.connect(config.mongodb.connectionString, config.mongodb.options, function (err, db) {
            if (err) throw err;

            var dbo = db.db("userdb");
            var query = {
                'user_id': id
            };

            dbo.collection("usercollection").findOne(query, function (err, result) {
                if (err) throw err;
                logUser(result);
                db.close();
            });
        });
    };

    function insert(user_id, name) {
        mongodb.connect(config.mongodb.connectionString, config.mongodb.options, function (err, db) {
            if (err) throw err;

            var dbo = db.db("userdb");
            var myobj = {
                'user_id': user_id,
                'name': name
            };

            dbo.collection("usercollection").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("inserted");
                db.close();
            });

        });
    };

    function update(id, name) {
        mongodb.connect(config.mongodb.connectionString, config.mongodb.options, function (err, db) {
            if (err) throw err;

            var dbo = db.db("userdb");
            var query = {
                'user_id': id
            };
            var new_values = {
                $set: {
                    'name': name
                }
            };

            dbo.collection("usercollection").updateOne(query, new_values, function (err, res) {
                if (err) throw err;
                console.log("updated");
                db.close();
            });
        });
    };

    function del(id) {
        mongodb.connect(config.mongodb.connectionString, config.mongodb.options, function (err, db) {
            if (err) throw err;

            var dbo = db.db("userdb");
            var query = {
                'user_id': id
            };

            dbo.collection("usercollection").deleteOne(query, function (err, obj) {
                if (err) throw err;
                console.log("deleted");
                db.close();
            });
        });
    };

    function logUser(user) {
        console.log("user => id: " + user.user_id + ", name: " + user.name);
    }

    return {
        get,
        getOne,
        insert,
        update,
        del
    }
}