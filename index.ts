import * as WebSocket from 'ws';
import {Socket} from 'net';
import codec from './codec';

export default function startProxy({coreIp, corePort = 1710, localPort}: {coreIp: string; corePort?: number; localPort: number}) {
	const socket = new Socket();
	const {readStream, writeStream} = codec(socket);

	socket.connect({host: coreIp, port: corePort});

	const wss = new WebSocket.Server({port: localPort});

	wss.on('connection', (ws: WebSocket) => {
		ws.on('message', message => {
			writeStream.write(message);
		});

		readStream.on('data', data => {
			ws.send(data);
		});
	});
}
