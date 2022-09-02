import { WebSocketInstance } from './WebSocketInstance';
import { createWebsocketClient } from './utils/WebsocketClientFactory';

import { MockWS } from './utils/mockWS';
import exp = require('constants');

const mockCreateWS = createWebsocketClient as jest.Mock;
jest.mock('./utils/WebsocketClientFactory');

describe('WebSocketInstance should create a websocket connection', () => {
  let mockedCreatedWS = <jest.Mock<typeof createWebsocketClient>>(
    (<unknown>createWebsocketClient)
  );

  const values = {
    connectionString: 'ws://null',
    connectionName: 'Test Connection',
  };
  it('should accept a connection string and name', () => {
    const mockCallback = jest.fn();
    const mws = new MockWS('ws://null');
    mockCreateWS.mockReturnValue(mws);
    let wsi = new WebSocketInstance(
      values.connectionString,
      values.connectionName,
      mockCallback
    );
    expect(wsi.getConnectionString()).toBe(values.connectionString);
    expect(wsi.getConnectionName()).toBe(values.connectionName);
  });

  it('should create ws connection to connectionString', () => {
    const mockCallback = jest.fn();
    const mws = new MockWS('ws://null');
    mws._setConnectionStatus(WebSocketInstance.CONNECTION_STATUS.CONNECTING);
    mockCreateWS.mockReturnValue(mws);

    let wsi = new WebSocketInstance(
      values.connectionString,
      values.connectionName,
      mockCallback
    );

    expect(wsi.getConnectionStatus()).toBe(
      WebSocketInstance.CONNECTION_STATUS.CONNECTING
    );

    expect(wsi['client'].readyState).toBe(wsi.getConnectionStatus());
  });

  it('should send message', () => {
    const mockCallback = jest.fn();
    const mws = new MockWS('ws://null');
    mws._setConnectionStatus(WebSocketInstance.CONNECTION_STATUS.OPEN);
    mockCreateWS.mockReturnValue(mws);

    let wsi = new WebSocketInstance(
      values.connectionString,
      values.connectionName,
      mockCallback
    );

    const sendSpy = jest.spyOn(wsi.client, 'send');
    wsi.sendMessage('test');
    expect(sendSpy).toBeCalledWith('test');
  });

  it('should throw error if not in open state', () => {
    const mockCallback = jest.fn();
    const mws = new MockWS('ws://null');
    mws._setConnectionStatus(WebSocketInstance.CONNECTION_STATUS.CLOSED);
    mockCreateWS.mockReturnValue(mws);

    let wsi = new WebSocketInstance(
      values.connectionString,
      values.connectionName,
      mockCallback
    );
    expect(() => {
      wsi.sendMessage('test');
    }).toThrow();
  });

  it('should receive messages', () => {});
});
