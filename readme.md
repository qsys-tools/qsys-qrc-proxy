# qsys-qrc-proxy [![Build Status](https://travis-ci.com/jamestalmage/qsys-qrc-proxy.svg?branch=master)](https://travis-ci.com/github/jamestalmage/qsys-qrc-proxy)

> A proxy server and format converter for the QSYS QRC protocol.

Can be used to proxy over Websockets for browser-based control. Or as a simple TCP pass-through proxy for logging and observing communications.

## Install

```
$ npm install -g qsys-qrc-proxy
```

## Usage

Via Command line:

```shell script
qsys-qrc-proxy 127.0.0.1 --ws-port 8083 # proxy over websockets on port 8083
# or
qsys-qrc-proxy 127.0.0.1 --tcp-port 6000 --log # proxy over tcp on port 6000, and log traffic
```

Via API:

```js
import qsysQrcProxy from 'qsys-qrc-proxy';

qsysQrcProxy(
  '127.0.0.1', // The IP address or hostname of a QSYS core with QRC enabled.
  {
    wsPort: 8083 // The port this server will expose a websocket on.
  }
)
```

## API

### qsysQrcProxy(remoteIP: string, {wsPort?: number, tcpPort?: number, log?: boolean, remotePort?: number})

#### remoteIP

Type: `string`

The IP address or hostname of a QSYS core with QRC enabled.

#### remotePort

Type: `number`
Default: `1710`

The TCP port the QRC service is exposed on. Should be `1710` unless there's some funky port forwarding between the proxy and the core.

#### wsPort or tcpPort

Type: `number`

Must specify at least one. Specifies which port this server will serve the proxied communications on.
`wsPort` will proxy over websockets.
`tcpPort` will proxy a raw QRC stream (useful for using the log feature to inspect traffic).


#### log

Type: `boolean`
Default: `false`

If `true`, will log the traffic to standard out.

## CLI

```

	Usage:
		$ qsys-qrc-proxy <core-ip> [options]

	Options:
	  --remote-port, -r      QRC port on core (defaults to 1710)
	  --ws-port, -w          Socket to proxy via websocket
	  --tcp-port, -t         Socket to proxy with raw TCP
	  --log, -l              Log communications to stdout

	Note: Must choose ws-port or tcp-port or both
```
