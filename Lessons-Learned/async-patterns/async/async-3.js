// Kullanılan yapı imkan veriyorsa nesnenin metodları doğrudan promise olarak kullanılabilir.
    
const fs = require('fs').promises;

async function readFileAsync(filename) {    
    const data = await fs.readFile(filename);
    return data;
};

readFileAsync(__filename)
    .then(data => console.log(data))
    .catch(err => console.log(err));
