import { WebSocket, WebSocketServer } from "npm:ws";

const wss = new WebSocketServer({port: 8080})