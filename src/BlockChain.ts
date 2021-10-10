import Block from "./Block";

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
