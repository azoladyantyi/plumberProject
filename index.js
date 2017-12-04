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
app.use(express.static("Public"));
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

});
app.get("/api/plumbers/bookings/:id", function(req, res) {
  var book = req.params.id;
   models.pumblerData.findOneAndUpdate({
           _id: id
       },

       {
           $inc: {
               book: -1
           }
       }, {
           upsert: false
       },
       function(err, results) {
           if (err) {
               console.log(err);
           }

           if (results.book <= 1) {
               results.remove()
           } else {
               res.json(results);
           }
       })


});


app.post('/api/plumbers', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var cellnumber = req.body.cellnumber;
    var day = req.body.day;
    var slot = req.body.slot;
    var book = book.value;
    console.log(name);
    models.pumblerData.create({
        slot:slot,
        day:day,
        name: name,
        email: email,
        cellnumber: cellnumber,
        book: book,

    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            res.json(results)
        }



    })

})

const port = process.env.PORT || 6003;
      app.use(function(err, req, res, next) {
        res.status(500).send(err.stack);
      })

      app.listen(port, function() {
        console.log('Example app listening at :' + port)
      });
