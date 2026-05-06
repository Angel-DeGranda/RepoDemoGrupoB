import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import ChatManager from './ChatManager.js';

class Server {
  constructor() {
    this.app = express();
    this.port = 4000;
    this.server = http.createServer(this.app);
    this.io = new SocketServer(this.server, {
      cors: { origin: '*' }
    });

    this.chatManager = new ChatManager();

    this.middlewares();
    this.sockets();
  }

  middlewares() {
    this.app.use(express.json());
  }

  sockets() {
    this.io.on('connection', (socket) => {
      console.log('Cliente conectado:', socket.id);

      socket.emit('history', this.chatManager.getHistory());

      socket.on('send_message', (data) => {
        const msg = this.chatManager.addMessage(data.user, data.text);
        this.io.emit('receive_message', msg);
      });

      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}

export default Server;
