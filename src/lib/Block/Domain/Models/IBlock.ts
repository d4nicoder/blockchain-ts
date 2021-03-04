export interface IBlock {
  index: number;
  date: number;
  data: string;
  previousHash: string;
  nonce: number;
  hash: string;
}