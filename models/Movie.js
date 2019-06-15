var mongoose = require("mongoose");
var Schema = mongoose.Schema ;
var MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    }
    // isSaved: {
    //     type: Boolean,
    //     default: FileReader,
    //     required: false,
    //     unique: false
    // }
});

var Movie = mongoose.model("Movie", MovieSchema)

module.exports = Movie; // exporting Movie
