"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
server.listen(5000);
app.listen(server, () => console.log('Example app listening on port 5000!'));
app.get('/', function (req, res) {
    res.sendFile('E:\\chatWork\\src\\index.html');
});
const connections = [];
io.sockets.on('connection', function (socket) {
    console.log("Successful connection");
    connections.push(socket);
    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected");
    });
    socket.on('send mess', function (data) {
        io.sockets.emit('add mess', { mess: data.mess, name: data.name, className: data.className });
    });
});
