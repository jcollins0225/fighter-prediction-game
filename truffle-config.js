const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    bscTestnet: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        `https://data-seed-prebsc-1-s1.binance.org:8545/`
      ),
      network_id: 97, // BSC Testnet ID
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.21",
    },
  },
};
