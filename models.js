const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/pumblerApp";

mongoose.connect(mongoURL, {
    useMongoClient: true
}, function(error) {

});

module.exports = function() {
    const plumberSchema = mongoose.Schema({
        name: String,
        email: String,
        cellnumber: Number,
        slot: String,
        day: String
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
