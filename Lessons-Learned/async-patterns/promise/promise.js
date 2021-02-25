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

readFileAsArray(__filename)
    .then(lines => console.log(lines.length))
    .catch(err => console.log(err));