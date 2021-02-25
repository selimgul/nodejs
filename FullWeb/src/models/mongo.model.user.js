const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10
    }
});

UserSchema.methods.validateUser = (user) => {
    const schema = {
        name: Joi.string().min(5).max(10).required(),
        password: Joi.string().min(5).max(10).required()
    };

    return Joi.validate(user, schema);
}

module.exports = mongoose.model('User', UserSchema, 'usercollection');