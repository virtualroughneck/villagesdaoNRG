// Helper method for fetching a connection provider to the Ethereum network
function getProvider() {
    if (typeof ethereum !== 'undefined') {
      return new Web3Provider(ethereum);
    } else {
      throw new Error('MetaMask is not installed or not connected.');
    }
  }
  
  // Helper method for fetching a contract instance at a given address
  async function getContract(contractName) {
    const provider = getProvider();
    const contractAddress = getEnvVariable("NFT_CONTRACT_ADDRESS");
  
    const abi = [
      // Include the ABI for your NFT contract here
      // ...
    ];
  
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }
  
  async function mintNFT() {
    try {
      // Wait for MetaMask connection
      await ethereum.request({ method: 'eth_requestAccounts' });
  
      // Ensure the connected network is 49797 (testnet)
      const networkId = await ethereum.request({ method: 'net_version' });
      if (networkId !== '49797') {
        console.error('Please connect to the Energi testnet in MetaMask.');
        return;
      }
  
      const provider = getProvider();
      const signer = provider.getSigner();
      const addressToMint = await signer.getAddress();
  
      const contract = await getContract("NFT");
      const mintPriceInWei = await contract.MINT_PRICE();
  
      const transactionResponse = await contract.mintTo(addressToMint, {
        gasLimit: 500_000,
        gasPrice: '120000000000', // 120 GWei
        value: mintPriceInWei,
      });
  
      console.log(`Transaction Hash: ${transactionResponse.hash}`);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Example usage:
  mintNFT();
  