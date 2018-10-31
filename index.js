const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, data){
        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = "0";
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }
    mineBlock(difficulty){
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesis()];
        this.difficulty = 3;
    }
    createGenesis() {
        return new Block(0, "01/01/2017", "Genesis block", "0")
    }
    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    checkValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let jsChain = new BlockChain();
console.log('Mining block 1...');
jsChain.addBlock(new Block(1, "20/07/2017", { amount: 4 }));

console.log('Mining block 2...');
jsChain.addBlock(new Block(2, "20/07/2017", { amount: 8 }));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid? " + jsChain.checkValid());