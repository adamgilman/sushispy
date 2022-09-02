import * as WebSocket from 'ws';
import { WebSocketInstance } from '../WebSocketInstance';

export interface WebsocketClient {
  on(event: WebSocketInstanceEvents, WebSocketEventHandler);
  readyState: WebSocketInstance.CONNECTION_STATUS;
}

type WebSocketInstanceEvents = 'on' | 'err' | 'open' | 'close';
type WebSocketEventHandler = (msg: any) => void;

export function createWebsocketClient(
  connectionString: string
): WebsocketClient {
  return new WebSocket(connectionString);
}
