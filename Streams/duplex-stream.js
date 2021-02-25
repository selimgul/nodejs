const {
    Duplex
} = require('stream');

const inoutStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log("Write => " + chunk.toString());
        callback();
    },
    read(size) {

        if (this.currentCharCode > 90) {
            this.push(null);
            return;
        }

        this.push("Read => " + String.fromCharCode(this.currentCharCode++) + '\n');
    }
});

inoutStream.currentCharCode = 85;

process.stdin.pipe(inoutStream).pipe(process.stdout);