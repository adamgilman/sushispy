import { WebSocketInstance } from '../WebsocketInstance';
import { WebsocketClient } from './WebsocketClientFactory';

export class MockWS implements WebsocketClient {
  constructor(connectionString: string) {}
  readyState: WebSocketInstance.CONNECTION_STATUS;
  on(event: 'on' | 'err' | 'open' | 'close', WebSocketEventHandler: any) {}

  _setConnectionStatus(status: WebSocketInstance.CONNECTION_STATUS) {
    this.readyState = status;
  }
  send(msg: string): void {}
}
