export interface IBlockCriteria {
  index?: {
    from: number;
    to: number;
  };
  date?: {
    from: number;
    to: number;
  };
  hash?: string;
  previousHash?: string;
}