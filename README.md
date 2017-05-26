This node application is based on the swagger npm package - https://www.npmjs.com/package/swagger

After installing this package "swagger project create users-api" created the users-api directory with all files required to set up a set of api's to manage users data.

API paramaters, validation, responses and schemas etc. are maintained in swagger.yaml and the JS code to persist data is maintained in the controllers. In this project the controllers put/get data using a mongo database. (using mongoose)

These api's are created/maintained using the following process;

1. from the users-api directory run "swagger project start". This starts a node Express application serving http://users-api-01.appspot.com. 

http://users-api-01.appspot.com/swagger displays the yaml swagger definition for the apis
http://users-api-01.appspot.com/users/?size=10 etc will allow the api's to be tested

put, post etc can be tested using curl (e.g. curl --header "Content-Type: application/json" --request PUT --data '{"userId":1,"ownerId":2,"xCoord":5}' http://users-api-01.appspot.com/users)

2. from the users-api directory run "swagger project edit". This creates a webpage at a temporary URL  (e.g. http://127.0.0.1:58668/#!/) This webpage display a Swagger UI view of users-api\api\swagger\swagger.yaml

3. API's are then maintained by changing the get, put etc. path definitions in swagger UI;

paths:
  /users:
    get:
    post:

  /users/{id}: 
    get:             
    put:
    delete: 

These definitions must have  x-swagger-router-controller and operationId defined. x-swagger-router-controller specifies the controller containing the operationId. The operationId specifies the JS function within the controller (getusers() etc.)

4. Data access code is mainatained in the users-api\api\controllers\users.js. controller contains the following functions;

  getusers()      
  getSingleuser() 
  createuser()    
  updateuser()    
  deleteuser()      
  
5. Testing can be performed using the following API calls;

http://users-api-01.appspot.com/users/?size=2
http://users-api-01.appspot.com/users/2

curl --header "Content-Type: application/json" --request POST --data '{"userId":1,"userName":"chris01","password":"********","fName":"Chris","lName":"Dawson"}' http://users-api-01.appspot.com/users
curl --header "Content-Type: application/json" --request POST --data '{"userId":2,"userName":"cath01","password":"********","fName":"Catherine","lName":"Dawson"}' http://users-api-01.appspot.com/users

curl --header "Content-Type: application/json" --request PUT --data '{"userId":1,"userName":"fred01","password":"********","fName":"Fred","lName":"Smith"}' http://users-api-01.appspot.com/users   

curl --header "Content-Type: application/json" --request DELETE "http://users-api-01.appspot.com/users/1" 