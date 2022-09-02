import * as _ from 'lodash';
import { WebSocketInstance } from './WebSocketInstance';

export class WebSocketManager {
  manager: Record<number, WebSocketInstance> = {};

  public create(connectionName: string, connectionString: string): number {
    const newId = this.generateNextId();
    this.manager[newId] = new WebSocketInstance(
      connectionString,
      connectionName,
      newId,
      this.messageReceived
    );
    return newId;
  }

  public getName(id: number): string {
    return this.manager[id].getConnectionName();
  }

  public getStatus(id: number): WebSocketInstance.CONNECTION_STATUS {
    return this.manager[id].getConnectionStatus();
  }

  public sendMessage(id: number, msg: string): void {
    this.manager[id].sendMessage(msg);
  }

  messageReceived = (msg) => {};

  private generateNextId(): number {
    let newKey: number;
    // if empty '0', otherwise get keys, cast to int, max
    const currentHighestKey = _.isEmpty(this.manager)
      ? 0
      : Math.max(...Object.keys(this.manager).map((x: string) => parseInt(x)));
    newKey = currentHighestKey + 1;
    return newKey;
  }
}
