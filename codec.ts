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

export const makeLogger = (prefix = ''): Transform => through2.obj(function (chunk, encoding, cb) {
	if (chunk !== NULL_CHAR) {
		console.log(prefix, String(chunk));
	}

	this.push(chunk, encoding);
	cb();
});

export default function wrapSocket(socket: Socket, log = false) {
	let readStream = socket.pipe(decoder());
	let writeStream = encoder();
	writeStream.pipe(socket);

	if (log) {
		readStream = readStream.pipe(makeLogger('received: '));
		const logger = makeLogger('sending: ');
		logger.pipe(writeStream);
		writeStream = logger;
	}

	return {readStream, writeStream};
}
