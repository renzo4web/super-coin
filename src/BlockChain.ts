/**
 * A sample async function (to demo Typescript's es7 async/await down-leveling).
 *
 * ### Chain (es imports)
 * ```
 * const chain = block[]
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var double = require('typescript-starter').asyncABC;
 * asyncABC().then(console.log);
 * // => ['a','b','c']
 * ```
 *
 * @returns a Promise which should contain `['a','b','c']`
 */

import hash from "object-hash";

interface IBlock {
  index: number;
  transactions: any[];
  prevHash: string | null;
}

class Block {
  private _index: number;
  private _blockstamp: number;
  private _transactions: any[];
  private _hash: string | null;
  private _prevHash: string | null;

  constructor(readonly blockProps: IBlock) {
    this._index = blockProps.index;
    this._blockstamp = Date.now();
    this._transactions = blockProps.transactions;
    this._hash = hash(blockProps);
    this._prevHash = blockProps.prevHash;
  }

  get index() {
    return this._index;
  }

  get blockstamp() {
    return this._blockstamp;
  }
  get transactions() {
    return this._transactions;
  }
  get hash() {
    return this._hash;
  }
  get prevHash() {
    return this._prevHash;
  }
}

export class BlockChain {
  private chain: Block[];
  private currentTransactions: any[];

  constructor() {
    this.chain = [];
    // Transactions
    this.currentTransactions = [];
  }

  addNewBlock(prevHash: string | null) {
    const block = new Block({
      index: this.chain.length + 1,
      prevHash,
      transactions: this.currentTransactions,
    });

    // Add block to the chain
    this.chain.push(block);
    // Reset currentTransactions
    this.currentTransactions = [];
    return block;
  }

  addNewTransaction(sender: string, recipient: string, amount: number) {
    const transaction = {
      sender,
      recipient,
      amount,
    };

    this.currentTransactions.push(transaction);
  }

  get lastBlock() {
    return this.chain.slice(-1)[0];
  }

  get getChain() {
    return this.chain;
  }

  get isChainEmpty() {
    return this.chain.length === 0;
  }
}
