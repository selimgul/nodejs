exports.port = 8080;

exports.mongodb = { 
                    connectionString : 'mongodb://localhost:27017/userdb',
                    options:  {
                                   useNewUrlParser: true,
                                   useUnifiedTopology: true,
                                   useFindAndModify:false
                              }
                  };
                  
exports.jwt = {
                privatekey: 'selim',
                expiresIn: 60*10 // 10 minutes
              };
