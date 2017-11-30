const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/pumblerApp";
const Models = require("./models");
const models = Models(mongoURL);

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000 * 30
    }
}));
app.use(flash());

// setting rendering engine
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    extname: "handlebars"
}));
app.use(express.static("public"));
app.use(express.static("views"))
app.use(form.urlencoded({
    extended: true
}));
app.set("view engine", "handlebars")

app.get("/api/plumbers", function(req, res) {
  models.pumblerData.find({}, function(err, results) {
       if (err) {
           console.log(err);
       } else {
           console.log(results);
           res.json({
               data: results
           })

       }
   })
});

app.post("/api/plumbers/slot/:slot/day/:day", function(req, res) {
  var slot = req.params.slot;
   var day = req.params.day;
   models.apiData.find({
       slot: slot,
       day: day
   }, function(err, results) {
       if (err) {
           console.log(err);
       } else {
           res.json(results)
       }
     })

    // res.render("admin")
});
app.get("/api/plumbers/:id/bookings", function(req, res) {
    res.render("admin")
});


app.post('/api/plumbers', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var cellnumber = req.body.cellnumber;
    console.log(name);
    models.pumblerData.create({
        name: name,
        email: email,
        cellnumber: cellnumber
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.json(results)
            // console.log(results);
        }



    })

})
app.set('port', (process.env.PORT || 5000));

app.use(function(err, req, res, next) {
    res.status(500).send(err.stack)
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port' + app.get('port'));

});
