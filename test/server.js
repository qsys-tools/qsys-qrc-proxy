require('ts-node').register();
const delay = require('delay');

const startProxy = require('..').default;

delay(2000).then(() => { // Delay so the other proxy has time to get setup. We proxy twice, just to prove both methods work.
	startProxy('127.0.0.1', {wsPort:8083, remotePort: 8084});
})
