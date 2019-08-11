var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organisation: Schema.Types.ObjectId,
  team: Schema.Types.ObjectId
});

module.exports = mongoose.model("User", userSchema);
