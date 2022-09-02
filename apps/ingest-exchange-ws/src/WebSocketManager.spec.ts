import { createWebsocketClient } from './utils/WebsocketClientFactory';
import { WebSocketManager } from './WebsocketManager';
import { MockWS } from './utils/mockWS';
import { WebSocketInstance } from './WebsocketInstance';

const mockCreateWS = createWebsocketClient as jest.Mock;
jest.mock('./utils/WebsocketClientFactory');

describe('WS Manager should manage CRUD of WS Instances', () => {
  let wsm: WebSocketManager;
  let mws: MockWS;
  beforeEach(() => {
    wsm = new WebSocketManager();
    mws = new MockWS('ws://null');
  });
  afterEach(() => {
    mockCreateWS.mockReset();
  });
  it('create new instance', () => {
    mws._setConnectionStatus(WebSocketInstance.CONNECTION_STATUS.CONNECTING);
    mockCreateWS.mockReturnValue(mws);

    const newConnId = wsm.create('new connection', 'ws://localhost:8080');
    expect(wsm.getName(newConnId)).toEqual('new connection');
    expect(wsm.getStatus(newConnId)).toEqual(
      WebSocketInstance.CONNECTION_STATUS.CONNECTING
    );
  });

  it('should send message', () => {
    mws._setConnectionStatus(WebSocketInstance.CONNECTION_STATUS.OPEN);
    mockCreateWS.mockReturnValue(mws);

    const connId = wsm.create('new connection', 'ws://localhost:8080');
    const instanceSendSpy = jest.spyOn(wsm.manager[connId], 'sendMessage');

    wsm.sendMessage(connId, 'test');
    expect(instanceSendSpy).toBeCalledWith('test');
  });

  it('should receive a message', () => {
    mws._setConnectionStatus(WebSocketInstance.CONNECTION_STATUS.OPEN);
    mockCreateWS.mockReturnValue(mws);

    const connId = wsm.create('new connection', 'ws://localhost:8080');
  });
});
