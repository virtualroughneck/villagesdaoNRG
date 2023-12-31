async function getProvider() {
    // Ensure that the MetaMask provider is available
    if (window.ethereum) {
      // Use MetaMask provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      return provider;
    } else {
      throw new Error("Web3Provider is not available. Make sure MetaMask is installed and properly configured.");
    }
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
  
      const provider = await getProvider();
      const signer = provider.getSigner();
      const addressToMint = await signer.getAddress();
  
      const contract = await getContract();
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
  