const { String } = require('core-js');
const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema(
{
    tilulo: {type: String, required: true},
    descricao: String
});

const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;