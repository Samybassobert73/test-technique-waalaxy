import { Server } from 'socket.io';
import { createServer } from 'node:http';
import app from '../application/app';

export const server = createServer(app);
export const io = new Server(server);


