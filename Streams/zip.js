const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const command = process.argv[2];
const plainFile = process.argv[3];
const zipFile = plainFile + '.gz';
const extractedFile = plainFile + '.extracted';

const {
    Transform
} = require('stream');

const upperCase = new Transform({
    transform(chunk, encoding, callback) {
        chunk = chunk.toString().toUpperCase();
        callback(null, chunk);
    }
});

if (command === 'zip') {
    fs.createReadStream(plainFile)
        .pipe(upperCase)
        .pipe(zlib.createGzip())
        .pipe(crypto.createCipher('aes192', 'secret_key'))
        .pipe(fs.createWriteStream(zipFile))
        .on('finish', () => {
            console.log('Done')
        });
} else {
    fs.createReadStream(zipFile)
        .pipe(crypto.createDecipher('aes192', 'secret_key'))
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(extractedFile))
        .on('finish', () => {
            console.log('Done')
        });
}