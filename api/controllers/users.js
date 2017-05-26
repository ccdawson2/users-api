var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	
   userId:   Number,
   userName: String,
   password: String,
   fName:    String,
   lName:    String,
   updated:  Date,
   created:  Date
});

var User = mongoose.model('user', userSchema);

//mongoose.connect('mongodb://localhost:27017/users');
mongoose.connect('mongodb://admin:admin@ds147421.mlab.com:47421/squares');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db not connected...'));
db.once('open', function callback() {});

module.exports = {
  dbStats:       dbStats,
  getUsers:      getUsers,
  getSingleUser: getSingleUser,
  createUser:    createUser,
  updateUser:    updateUser,
  deleteUser:    deleteUser
};

function dbStats(req, res) {

   res.json("Not Yet Implemented ..");
}
	
function getUsers(req, res, next) {

// http://users-api-01.appspot.com/users/?size=2

   var size = req.swagger.params.size.value;
   console.log("getUsers() size=" + size);
  
   User.find({}, {}, {limit:size}, function(err, data) {
      if(err) {
         return next(err);
      }
         res.json(data);
   });  
}

function getSingleUser(req, res, next) {
  
// http://users-api-01.appspot.com/users/2
  
   var userId = parseInt(req.swagger.params.id.value);
   console.log('getSingleUser() userId=' + userId);
 
   User.findOne({'userId':userId} , function(err, data) {
      if(err) {
         return next(err);
      }
         res.json(data);
   });
}

function createUser(req, res, next) {

// curl --header "Content-Type: application/json" --request POST --data '{"userId":1,"userName":"fred01","password":"********","fName":"Fred","lName":"Smith"}' http://users-api-01.appspot.com/users

   console.log("createUser() userId=" + req.swagger.params.body.value.userId);

   var currentDateTime = new Date();

   var user = new User({
      userId:   req.swagger.params.body.value.userId,
      userName: req.swagger.params.body.value.userName,
      password: req.swagger.params.body.value.password,
      fName:    req.swagger.params.body.value.fName,
      lName:    req.swagger.params.body.value.lName,
      updated:  currentDateTime,
      created:  currentDateTime
      });
		
   user.save(function(err, data) {
      if(err) {
         return next(err);
      }
      res.status(200)
         .json({
            status:  'success',
            message: 'Created user'
      });        
   });
}

function updateUser(req, res, next) {
	
//curl --header "Content-Type: application/json" --request PUT --data '{"userId":1,"userName":"fred01","password":"********","fName":"Fred","lName":"Smith"}' http://users-api-01.appspot.com/users   

   var userId = parseInt(req.swagger.params.id.value);
   console.log("updateUser() userId=" + userId);

   var currentDateTime = new Date();
   
   req.swagger.params.body.value.updated = currentDateTime;
      
   console.log(req.swagger.params.body.value);
   
   User.findOneAndUpdate({'userId':userId} , 
                         {$set:req.swagger.params.body.value} ,
    					   function(err, data) {
      if(err) {
         return next(err);
      }
      res.status(200)
         .json({
            status:  'success',
            message: 'Updated user'
      });       
  });
}

function deleteUser(req, res, next) {

// curl --header "Content-Type: application/json" --request DELETE "http://users-api-01.appspot.com/users/1" 
  
   var userId = parseInt(req.swagger.params.id.value);
   console.log("deleteUser() userId=" + userId);
 
   User.findOneAndRemove({'userId':userId} , function(err, data) {
      if(err) {
         return next(err);
      }
      res.status(200)
         .json({
            status:  'success',
            message: 'Deleted user'
      });       
  });
}