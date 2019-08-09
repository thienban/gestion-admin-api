var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var teamSchema   = new Schema({
    name: String,
});

module.exports = mongoose.model('Team', teamSchema);