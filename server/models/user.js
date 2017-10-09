const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: false
    }
    ,
    password: {
        type: String,
        required: false
    }
    ,
    email: {
        type: String,
        index: { unique: true },
        required: false
    },
    token: {
        type: String,
        required: false
    },
    externalId: {
        type: String,
        required: false
    } ,
    externalType: {
        type: String,
        required: false
    },
    city: {
        type:String
    },
    phone: {
        type:String
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;  
