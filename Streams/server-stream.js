const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {

    const path = 'star_trails.mp4';
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    console.log(JSON.stringify(req.headers));
        
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, {
            start,
            end
        });
        
        const header = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        console.log(`Range header exists =>  ${start}-${end}/${fileSize}, Headers => ${JSON.stringify(header)}`);

        res.writeHead(206, header);
        file.pipe(res);

    } else {
        const header = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        }

        console.log("Range header does not exists.");

        res.writeHead(200, header);
        fs.createReadStream(path).pipe(res);
    }

});

server.listen(8000, () => {
    console.log(process.pid)
});