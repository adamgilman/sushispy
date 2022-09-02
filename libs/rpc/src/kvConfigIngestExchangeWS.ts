import { Encodable } from './common';
import { GlobalProduct } from './globalProduct';

type globalProductID = string;
export interface KVConfigIngestExchangeWS extends Encodable {
  serverURL: string;
  subscriptions: Record<
    globalProductID,
    {
      globalProduct: GlobalProduct;
      exchangeSubscription: string;
    }
  >;
}
