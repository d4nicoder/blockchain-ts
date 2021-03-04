import { IBlock } from "../../../Block/Domain/Models/IBlock";
import Block from "../../../Block/Domain/ValueObjects/Block";
import BlockCriteria from "../ValueObjects/BlockCriteria";

export interface IBlockchainRepository {
  get: (criteria: BlockCriteria) => Promise<IBlock[]>;
  getLast: () => Promise<IBlock>;
  addBlock: (block: Block) => Promise<void>;
}