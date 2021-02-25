const fs = require('fs');

const readFileAsArray = function (file, callback){  
    fs.readFile(file, function(err, data){
        if (err){
            callback(err);
        }
        
        const lines = data.toString().trim().split('\n');
        callback(null, lines);
    });    
};

readFileAsArray(__filename, (err, lines) => {
        if(err) throw err;
        console.log(lines.length);                
});