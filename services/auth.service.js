/*******
* auth.service.js file - services
********/ 

const JsonTokens = require('../util/JsonTokens');
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_KEY;
const fs = require('fs');

module.exports = {
  authorize: () => {
    return (req, res, next) => {
      const token = req.headers["authorization"];
      const email = req.headers["email"];
      if (!token || !email) {
        res.status(401).json({
          status: "no_access",
          statusCode: 401,
          message: "Access Denied",
        });
      } else {

          try {
              fs.readFile("email_token.json", 'utf8', function(err, data) {                     
                  if (err) throw err;                  
                  const tokens = JSON.parse(data); 
                  let req_token;

                  tokens.forEach(function(value) {
                    if(JSON.parse(value).email == req.headers["email"] && JSON.parse(value).token == req.headers["authorization"]){
                        req_token = req.headers['authorization'];
                    }
                  });

                  jwt.verify(req_token, secret, function(err, decoded) {
                        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'});                          
                          req.email_auth = decoded;
                          return next();
                  });
              });
          }
         catch(err) {
             res.status(401).json({
              status: "no_access",
              statusCode: 401,
              message: "Access Denied",
            });
          }
      }
    };
  },

  createToken: () => {
    return (req, res, next) => {
       const email = req.body.email;
       const payload = { email };
       const token = jwt.sign(payload, secret, {
            expiresIn: '7d'  // expires in 1 week
       });
       let email_token = { 
          email: email,
          token: token
       };
       // Add email token to json file 
       let data = JSON.stringify(email_token);
       JsonTokens.append_jsondata('email_token.json', data)
       // respond with token
      res.status(200).send({ auth: true, token: token});
    };
  }
};
