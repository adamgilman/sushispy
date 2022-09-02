export interface Encodable {
  encodeType: EncodingType;
  encode();
  decode();
}

type EncodingType = 'JSON' | 'UNKNOWN';
