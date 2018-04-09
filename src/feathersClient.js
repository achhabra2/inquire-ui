import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import localForage from 'localforage';

let socket;
if (process.env.NODE_ENV === 'production') {
  socket = io();
} else {
  socket = io('http://localhost:3000', { transports: ['websocket'] });
}

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: localForage }));

export default feathersClient;
