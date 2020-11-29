require('ts-node').register();

const startProxy = require('..').default;

startProxy({coreIp: '127.0.0.1', localPort:8083})
