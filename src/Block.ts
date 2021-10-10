import hash from "object-hash";

interface IBlock {
  index: number;
  transactions: any[];
  prevHash: string | null;
}

export default class Block {
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
