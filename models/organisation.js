var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var orgaSchema   = new Schema({
    name: String,
});

module.exports = mongoose.model('Organisation', orgaSchema);