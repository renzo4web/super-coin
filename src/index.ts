import { BlockChain } from './lib/BlockChain';
import hash from 'object-hash';

let blockChain = new BlockChain();

// This should be a complicated algo to check
const PROOF = 125;

const validProof = (proof) => {
  let guessHas = hash(proof);
};
