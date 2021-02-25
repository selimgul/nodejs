// Hazır bir kodu promise haline getirmek için promisify kullanılabilir.

const fs = require('fs')
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function readFileAsync(filename){
    try{
    const data = await readFile(filename);    
     console.log('file data is =>', data);    
    }
    catch(err){
        console.log(err);        
    }
};

readFileAsync(__filename);
