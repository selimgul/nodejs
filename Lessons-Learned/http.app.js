const http = require('http');
const url  = require('url');

const config  = require('../src/config/config.app');
const utils   = require('../src/modules/utils/common');
const mongodb = require('../src/modules/db/mongo.client.mongodb');
const events = require('../src/modules/utils/event-emitters');

module.exports = () => {
    const server = http.createServer();
    server.on("request", httpListener);
    server.listen(config.port, () => { console.log(`Http running at port ${config.port}`); });

    events.subscribe("logged", (q) => { console.log(`Event caught => ${q}`); });
}

function httpListener(req, res){
        
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(`Requested url => ${req.url}`);
     
    var q = url.parse(req.url, true);
    utils.writeLog(q);
    
    switch(q.pathname)
    {     
        case "/get":
            mongodb.get();
            break; 
        case "/getone":      
            mongodb.getone(q.query.id);
            break; 
        case "/insert":      
            mongodb.insert(q.query.id, q.query.name);
            break; 
        case "/update":      
            mongodb.update(q.query.id, q.query.name);
            break; 
        case "/delete":      
            mongodb.delete(q.query.id);
            break; 
    }
    
    res.end();

  };