import * as WebSocket from 'ws';
import {Socket, Server as TCPServer} from 'net';
import codec, {NULL_CHAR} from './codec';

export default function startProxy(remoteIP: string, {wsPort, tcpPort, remotePort = 1710, log = false}: {wsPort?: number; tcpPort?: number; remotePort?: number; log?: boolean}) {
	const socket = new Socket();
	const core = codec(socket, log);

	socket.connect({host: remoteIP, port: remotePort});

	if (wsPort) {
		new WebSocket.Server({port: wsPort})
			.on('connection', (ws: WebSocket) => {
				ws.on('message', message => {
					core.writeStream.write(message);
				});

				core.readStream.on('data', data => {
					ws.send(data);
				});
			});
	}

	if (tcpPort) {
		new TCPServer(socket => {
			const client = codec(socket, false);
			client.readStream.on('data', message => {
				core.writeStream.write(message);
				core.writeStream.write(NULL_CHAR);
			});

			core.readStream.on('data', message => {
				client.writeStream.write(message);
			});
		}).listen(tcpPort);
	}
}
