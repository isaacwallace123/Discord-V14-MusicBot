const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },

    guilds: {
        type: Map,
        of: new Schema({
            balance: {
                type: Number,
                default: 0,
            },
            level: {
                type: Number,
                default: 1,
            }
        }),
    },
});

module.exports = model('User', userSchema);