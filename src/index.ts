import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new Server(server);
server.listen(5000);



app.get('/', function(req: Request, res: Response) {
    res.sendFile('E:\\chatWork\\src\\index.html');
});


const connections: any = [];


io.sockets.on('connection', (socket: any) => {
    console.log("Successful connection");

    connections.push(socket);


    socket.on('disconnect', function(data: any) {

        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected");
    });


    socket.on('send mess', function(data: any) {

        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    });

});

app.listen(5000, () => console.log('Example app listening on port 5000!'));