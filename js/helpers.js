const { ethers } = require("ethers");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");

// Helper method for fetching environment variables from .env
function getEnvVariable(key, defaultValue) {
  if (process.env[key]) {
    return process.env[key];
  }
  if (!defaultValue) {
    throw `${key} is not defined and no default value was provided`;
  }
  return defaultValue;
}

// Helper method for fetching a connection provider to the Ethereum network
function getProvider(hardhat) {
  const network = getEnvVariable("NETWORK", "energiTestnet");
  const providerUrl = getEnvVariable("RPC_URL", "https://nodeapi.test.energi.network");

  const networkConfig = hardhat.config.networks[network];
  if (!networkConfig) {
    throw new Error(`Network '${network}' is not defined in the hardhat.config.js file.`);
  }

  return new ethers.providers.JsonRpcProvider(providerUrl, networkConfig.chainId);
}

// Helper method for fetching a wallet account using an environment variable for the PK
function getAccount(hardhat) {
  const privateKey = getEnvVariable("ACCOUNT_PRIVATE_KEY");
  const provider = getProvider(hardhat);
  const wallet = new ethers.Wallet(privateKey, provider);
  return wallet;
}

// Helper method for fetching a contract instance at a given address
function getContract(contractName, hre) {
  const account = getAccount(hre);
  return getContractAt(hre, contractName, getEnvVariable("NFT_CONTRACT_ADDRESS"), account);
}

module.exports = {
  getEnvVariable,
  getProvider,
  getAccount,
  getContract,
};
