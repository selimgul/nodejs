const {
    Readable
} = require('stream');

const inStream = new Readable();
inStream.push('selim');
inStream.push(null);

inStream.pipe(process.stdout);
