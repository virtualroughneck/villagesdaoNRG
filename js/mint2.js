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
  
      // Use MetaMask provider directly
      const provider = ethereum;
      const signerAddress = (await provider.request({ method: 'eth_accounts' }))[0];
  
      const contract = await getContract();
      const mintPriceInWei = await contract.MINT_PRICE();
  
      const transactionResponse = await contract.mintTo(signerAddress, {
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
  