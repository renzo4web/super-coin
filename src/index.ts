/* eslint-disable no-constant-condition */
import hash from "object-hash";

import { BlockChain } from "./BlockChain";

const blockChain = new BlockChain();

// This should be a complicated algo to check
const PROOF = 1250;

const validProof = (proof: any) => {
  const guessHash = hash(proof);
  console.log(`Hashing: ${guessHash}`);
  return guessHash == hash(PROOF);
};

const proofOfWork = () => {
  let proof = 0;

  while (true) {
    if (!validProof(proof)) {
      proof += 1;
    } else {
      break;
    }
  }

  return proof;
};

interface Transaction {
  sender: string;
  recipient: string;
  amount: number;
}
const newTransaction = (transaction: Transaction) => {
  const { sender, recipient, amount } = transaction;

  if (proofOfWork() === PROOF) {
    blockChain.addNewTransaction(sender, recipient, amount);
    const prevHash = blockChain.lastBlock ? blockChain.lastBlock.hash : null;

    blockChain.addNewBlock(prevHash);
  }

  console.log(`Chain ${JSON.stringify(blockChain.getChain, null, 2)}`);
};

const user1: Transaction = {
  sender: "Renzo",
  recipient: "Vitalik",
  amount: 100,
};

const user2: Transaction = {
  sender: "Jack",
  recipient: "Mark",
  amount: 50,
};
newTransaction(user1);
newTransaction(user2);
