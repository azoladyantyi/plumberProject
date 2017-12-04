const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/pumblerApp";

useMongoClient: true
mongoose.connect(mongoURL, {
}, function(error) {

});

module.exports = function() {
    const plumberSchema = mongoose.Schema({
    slot: Array,
    day: Array,
    name: String,
    email: String,
    cellnumber: Number
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
