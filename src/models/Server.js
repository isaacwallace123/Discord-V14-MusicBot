const { Schema, model } = require("mongoose");

const serverSchema = new Schema({
   guildId: {
    type: String,
    required: true,
    unique: true,
   },
});

module.exports = model('Server', serverSchema);