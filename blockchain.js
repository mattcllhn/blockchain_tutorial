const Block = require('./block');

 class BlockChain {
    constructor() {
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
module.exports = BlockChain;