import socketIO from "socket.io-client";

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
} as any;

const socket = socketIO("https://idsp.link/", {
  withCredentials: true,
  autoConnect: false,
});

export default socket;
