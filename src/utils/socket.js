import { io } from "socket.io-client";

const socket = io("wss://ws.coincap.io/prices?assets=bitcoin,ethereum");

export default socket;
