async function getProvider() {
    // Replace with your desired RPC server URL
    const rpcServerUrl = 'https://nodeapi.test.energi.network';

    // Ensure that the MetaMask provider is available
    if (window.ethereum) {
        // Use MetaMask provider directly
        const provider = window.ethereum;
        await provider.request({ method: 'eth_requestAccounts' });
        return provider;
    } else {
        // Use a JsonRpcProvider with the specified RPC server URL
        const provider = new ethers.providers.JsonRpcProvider(rpcServerUrl);
        return provider;
    }
}  

async function getContract() {
    // Replace with the actual contract address
    const contractAddress = '0x0b21b455850dfAE1577A605Efb5F61E093bC8B61';
    const contractABI = [
      {"type":"constructor","stateMutability":"nonpayable","inputs":[]},
      {"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"approved","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},
      {"type":"event","name":"ApprovalForAll","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"operator","internalType":"address","indexed":true},{"type":"bool","name":"approved","internalType":"bool","indexed":false}],"anonymous":false},
      {"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},
      {"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"tokenId","internalType":"uint256","indexed":true}],"anonymous":false},
      {"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MINT_PRICE","inputs":[]},
      {"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"TOTAL_SUPPLY","inputs":[]},
      {"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approve","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},
      {"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"owner","internalType":"address"}]},
      {"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"baseTokenURI","inputs":[]},
      {"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getApproved","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},
      {"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isApprovedForAll","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"operator","internalType":"address"}]},
      {"type":"function","stateMutability":"payable","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"mintTo","inputs":[{"type":"address","name":"recipient","internalType":"address"}]},
      {"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},
      {"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},
      {"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"ownerOf","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},
      {"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"payments","inputs":[{"type":"address","name":"dest","internalType":"address"}]},
      {"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},
      {"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},
      {"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"bytes","name":"data","internalType":"bytes"}]},
      {"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setApprovalForAll","inputs":[{"type":"address","name":"operator","internalType":"address"},{"type":"bool","name":"approved","internalType":"bool"}]},
      {"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setBaseTokenURI","inputs":[{"type":"string","name":"_baseTokenURI","internalType":"string"}]},
      {"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"supportsInterface","inputs":[{"type":"bytes4","name":"interfaceId","internalType":"bytes4"}]},
      {"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},
      {"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"tokenURI","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},
      {"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},
      {"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},
      {"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawPayments","inputs":[{"type":"address","name":"payee","internalType":"address payable"}]}
    ];

    try {
        // Ensure that the MetaMask provider is available
        if (window.ethereum) {
            // Use MetaMask provider directly
            const provider = window.ethereum;

            // Request account access if needed
            await provider.request({ method: 'eth_requestAccounts' });

            // Get the signer from the current account
            const signer = provider.getSigner();

            // Create a Contract instance with the signer
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Check if the contract has the 'mintTo' function
            if (contract.mintTo) {
                return contract;
            } else {
                throw new Error('The contract does not have a "mintTo" function.');
            }
        } else {
            throw new Error('Web3Provider is not available. Make sure MetaMask is installed and properly configured.');
        }
    } catch (error) {
        console.error('Error initializing contract:', error);
        throw error;
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
  
      const contract = await getContract();
      const signerAddress = (await ethereum.request({ method: 'eth_accounts' }))[0];
      // const mintPriceInWei = await contract.methods.MINT_PRICE().call();
      const mintPriceInWei = '80000000000000000'; // 0.08 NRG
      console.log(`Signer Address: ${signerAddress}`)
  
      const transactionResponse = await contract.methods.mintTo(signerAddress).send({
        gasLimit: 500_000,
        gasPrice: '120000000000', // 120 GWei
        value: mintPriceInWei,
      });
  
      console.log(`Transaction Hash: ${transactionResponse.transactionHash}`);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Example usage:
  mintNFT();
  