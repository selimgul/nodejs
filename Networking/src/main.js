const server = require('net').createServer();

let counter = 0;
let sockets = {};

server.on('connection', socket => {

    socket.id = counter++;    
    console.log('Client connected.');
    socket.write('Please type your name');

    function timestamp(){
        const now = new Date();
        return `${now.getHours()}:${now.getMinutes()}`;
    }

    socket.on('data', data => {        
        
        if (!sockets[socket.id]){
            socket.name = data.toString().trim();
            socket.write(`Welcome ${socket.name}`);
            sockets[socket.id] = socket;
        }

        Object.entries(sockets).forEach(
            ([index, cs]) => {
                
                if (socket.id == index) return;

               cs.write(`${socket.name} ${timestamp()}: `);
               cs.write(data);               
            }
        );       
    });

    socket.on('end', () => {
        delete sockets[socket.id];
        console.log('Client disconnected.');
    });
    
});

server.listen(8000, () => { console.log('Server is listening...');});