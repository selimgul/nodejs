const fs = require('fs');

const readFileAsArray = function (file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, function (err, data) {
            if (err) {
                return reject(err);
            }

            const lines = data.toString().trim().split('\n');
            return resolve(lines);
        });
    })
};

async function readFileAsync(){
    try{
        const lines = await readFileAsArray(__filename);
        console.log(lines.length);
    }
    catch(err){        
        console.log(err);
    }
}

readFileAsync();


