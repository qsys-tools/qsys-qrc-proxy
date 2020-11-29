import {Transform} from 'stream';
import split from 'split2';

import through2 from 'through2';
import {Socket} from 'net';

export const NULL_CHAR = '\u0000';

// Splits the stream at NULL_CHAR.
export const decoder = (): Transform => split(NULL_CHAR, {trailing: false} as any);

// Inserts NULL_CHAR between messages.
export const encoder = (): Transform => through2(function (message, _, cb) {
	this.push(message);
	this.push(NULL_CHAR);
	cb();
});

export default function wrapSocket(socket: Socket) {
	const readStream = socket.pipe(decoder());
	const writeStream = encoder();
	writeStream.pipe(socket);

	return {readStream, writeStream};
}
