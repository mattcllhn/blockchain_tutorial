const BlockChain = require('./blockchain');
const Block = require('./block');


let jsChain = new BlockChain();
console.log('Mining block 1...');
jsChain.addBlock(new Block(1, "20/07/2017", { amount: 4 }));

console.log('Mining block 2...');
jsChain.addBlock(new Block(2, "20/07/2017", { amount: 8 }));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid? " + jsChain.checkValid());