/* eslint-disable no-constant-condition */
import hash from "object-hash";
import chalk from "chalk";
import promptly from "promptly";
import { BlockChain } from "./BlockChain";
import { validatorAmount, validatorString } from "./inputValidations";

// Create the Blockchain
const blockChain = new BlockChain();

// This should be a complicated algo to check
const PROOF = 1250;

// simulate the work that the computer to make to add a new block to the chain
const validProof = (proof: number) => {
  const guessHash = hash(proof);
  console.log(`Hashing: ${chalk.green(guessHash)}`);
  return guessHash == hash(PROOF);
};

// Generate hash's until there is a valid proof
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

  const lastBlock = blockChain.lastBlock;

  console.log(
    `
    Super-Coin
    Blocks in chain: ${chalk.green(blockChain.getChain.length)}
    Chain : ${chalk.blueBright(JSON.stringify(blockChain.getChain, null, 2))}

     ${chalk.blue("------------------------------------------------")} 
      Last Block 
      Hash: ${chalk.yellow(lastBlock.hash)}
      Time: ${chalk.yellow(lastBlock.blockstamp)}
      Transaction : ${chalk.yellow(
        JSON.stringify(lastBlock.transactions, null, 2)
      )}
    `
  );
};

const runBlockChain = async (): Promise<void> => {
  const sender = await promptly.prompt("Sender: ", {
    validator: validatorString,
  });
  const recipient = await promptly.prompt("Recipient: ", {
    validator: validatorString,
  });
  const amount = await promptly.prompt("Amount (number): ", {
    validator: validatorAmount,
  });

  console.log(`
              Current Transaction:
              Sender: ${chalk.blue(sender)}
              Recipient: ${chalk.blue(recipient)}
              Amount: ${chalk.blue(amount)}
              `);

  // adding the new transaction
  newTransaction({ sender, recipient, amount: Number(amount) });

  const isContinuing = await promptly.confirm("Add new transaction? [y/n]");

  if (isContinuing) {
    runBlockChain();
  }
};

runBlockChain().catch(console.error);
