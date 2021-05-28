import socketIO from "socket.io-client";

import domainName from '../constants/domainName';

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
} as any;


const socket = socketIO(domainName, {
  withCredentials: true,
  autoConnect: false,
});

export default socket;
