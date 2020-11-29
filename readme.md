# qsys-qrc-proxy [![Build Status](https://travis-ci.com/jamestalmage/qsys-qrc-proxy.svg?branch=master)](https://travis-ci.com/github/jamestalmage/qsys-qrc-proxy)

> A Websocket proxy of the QSYS QRC protocol

## Install

```
$ npm install qsys-qrc-proxy
```

## Usage

```js
import qsysQrcProxy from 'qsys-qrc-proxy';

qsysQrcProxy({
  localPort: 8083, // The port this server will expose a websocket on.
  coreIp: '127.0.0.1' // The IP address or hostname of a QSYS core with QRC enabled.
})
```

## API

### qsysQrcProxy({localPort: number, coreIp: string, corePort?: number})

#### localPort

Type: `number`

The port this server will expose a websocket on.

#### coreIp

Type: `string`

The IP address or hostname of a QSYS core with QRC enabled.

#### corePort

Type: `number`
Default: `1710`

The TCP port the QRC service is exposed on. Should be `1710` unless there's some funky port forwarding between the proxy and the core.
