var express     = require('express'),
 	  bodyParser  = require('body-parser'),
  	mongoose    = require('mongoose'),
 	  path        = require('path'),
 	  port        = 3000;
 	  
var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/mongoose_dashboard');

var RabbitSchema = new mongoose.Schema({
 name: { type: String, required: true, minlength: 4},
 age: { type: Number, min: 1, max: 10}
})

mongoose.model('rabbit', RabbitSchema);
var Rabbit = mongoose.model('rabbit')

// require("./models/rabbits.js")


app.get('/', function(req, res) {
    Rabbit.find({}, function(err, rabbits){
      if(err){
        console.log("Something went wrong");
      }
      else{
        console.log("Look at the cute rabbits");
        console.log(rabbits);
        res.render('index', {rabbits:rabbits});
      }
    })
});

app.get('/rabbit/new', function(req, res){
  console.log("I hope this goes to the right place");
  res.render('new');
});

app.post('/rabbits', function(req, res) {
  console.log("Information posted", req.body);
  var rabbit = new Rabbit({name: req.body.name, age: req.body.age});
  console.log(rabbit);
  rabbit.save(function(err) {
    if(err) {
      res.render('index', {title: 'you have errors!', errors: user.errors})
    } else {
      console.log('Added a rabbit!');
      res.redirect('/');
    }
  })
});

app.get('/rabbit/:id/edit', function(req, res){
  Rabbit.findOne({_id:req.params.id}, function(err, rabbit){
    if(err){
      console.log("rabbit/:id/edit error ", err);
    }
    else{
      res.render('edit',{rabbit:rabbit});
    }
  })
});

app.post('/rabbits/:id/update', function(req, res) {
  console.log("posted data", req.body);
  Rabbit.findOne({_id:req.params.id}, function(err, rabbit){
    rabbit.name = req.body.name;
    rabbit.age = req.body.age;
    console.log(rabbit.name, " is the new name");
    console.log(rabbit.age, " is the new age");
    rabbit.save(function(err) {
      if(err) {
        console.log('oops something went wrong');
      }
      else {
        console.log('Updated a rabbit!');
        console.log(rabbit);
        res.redirect('/');
      }
    })
  })
});

app.post('/rabbits/:id/destroy', function(req, res){
  Rabbit.remove({_id:req.params.id}, function(err, rabbit){
    if(err){
      console.log("rabbits/:id/destroy error ", err);
    }
    else{
      console.log("Please don't delete the cute rabbit ", req.params.id);
      res.redirect('/');
    }
  })
});

app.get('/rabbit/:id', function(req, res){
  Rabbit.findOne({_id:req.params.id}, function(err, rabbit){
    if(err){
      console.log("rabbit/:id error ", err);
    }
    else{
      res.render('show',{rabbit:rabbit});
    }
  })
});

app.listen(port, function(){
  console.log('Listening on port 3000');
});
