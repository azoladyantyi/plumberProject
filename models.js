const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/pumblerApp";

useMongoClient: true
mongoose.connect(mongoURL, {
}, function(error) {

});

module.exports = function() {
    const plumberSchema = mongoose.Schema({
    slot: String,
    day: String,
    name: String,
    email: String,
    cellnumber: Number,
    book: Number
    })
    plumberSchema.index({
        name: 1
    }, {
        unique: true
    })
    const pumblerData = mongoose.model("pumblerData", plumberSchema)

    return {
        pumblerData
    }
}
