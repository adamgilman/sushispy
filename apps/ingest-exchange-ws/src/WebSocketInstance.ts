import * as WebSocket from 'ws';
import { createWebsocketClient } from './utils/WebsocketClientFactory';

export class WebSocketInstance {
  client: WebSocket;

  constructor(
    private readonly connectionString: string,
    private readonly connectionName: string,
    private readonly onMessageCallback: MessageReceivedCallback
  ) {
    this.client = createWebsocketClient(connectionString);
    this.client.on('message', (msg) => {
      this.receiveMessage(msg);
    });
  }

  public getConnectionString(): string {
    return this.connectionString;
  }
  public getConnectionName(): string {
    return this.connectionName;
  }
  public getConnectionStatus(): WebSocketInstance.CONNECTION_STATUS {
    return WebSocketInstance.CONNECTION_STATUS.CONNECTING;
  }

  public sendMessage(msg: string): void {
    if (this.client.readyState != WebSocketInstance.CONNECTION_STATUS.OPEN) {
      throw new Error(
        `${this.connectionName} is not in an OPEN state and cannot send message`
      );
    }
    this.client.send(msg);
  }

  private receiveMessage(msg: string) {
    //
  }
}

export namespace WebSocketInstance {
  export enum CONNECTION_STATUS {
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED,
  }
}

type MessageReceivedCallback = (connId: number, message: string) => void;
