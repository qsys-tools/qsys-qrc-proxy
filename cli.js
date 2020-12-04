#!/usr/bin/env node
'use strict';
const meow = require('meow');
const startProxy = require('.').default;

const cli = meow(`
	Usage:
		$ qsys-qrc-proxy <core-ip> [options]

	Options:
	  --remote-port, -r      QRC port on core (defaults to 1710)
	  --ws-port, -w          Socket to proxy via websocket
	  --tcp-port, -t         Socket to proxy with raw TCP
	  --log, -l              Log communications to stdout

	Note: Must choose ws-port or tcp-port or both
`, {
	flags: {
		remotePort: {
			alias: 'r',
			type: 'number',
			default: 1710
		},
		wsPort: {
			alias: 'w',
			type: 'number',
			isRequired: flags => !flags.tcpPort
		},
		tcpPort: {
			alias: 't',
			type: 'number',
			isRequired: flags => !flags.wsPort
		},
		log: {
			type: 'boolean'
		}
	}
});

startProxy(cli.input[0], cli.flags);
