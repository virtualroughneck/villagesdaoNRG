// Define the mintNFT function for minting logic
async function mintNFT() {
  try {
      // Check if ethereum is available globally
      if (typeof ethereum !== 'undefined') {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          const networkId = await ethereum.request({ method: 'net_version' });

          if (networkId === '49797') { // Update with the correct network ID for your Energi testnet
              const contractAddress = '0x0b21b455850dfAE1577A605Efb5F61E093bC8B61'; // Update with your deployed contract address on Energi

              const gasLimit = 50000; // Set your desired gas limit
              const gasPrice = '20000000000'; // 20 Gwei in Wei

              const mintTx = {
                  from: accounts[0],
                  to: contractAddress,
                  gas: gasLimit,
                  gasPrice: gasPrice,
                  value: '80000000000000000', // 0.08 ether in Wei
                  data: '0x3fa4f245', // The function signature of `mintTo(address)` in hexadecimal
              };

              try {
                  const transactionHash = await ethereum.request({ method: 'eth_sendTransaction', params: [mintTx] });
                  console.log('Transaction Hash:', transactionHash);
              } catch (error) {
                  console.error('Transaction Error:', error);
              }
          } else {
              console.error('Please connect to the Energi testnet in MetaMask.');
          }
      } else {
          console.error('MetaMask is not installed.');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}

// Wrap the minting function in an asynchronous function
async function initMinting() {
  try {
      // Check if ethereum is available globally
      if (typeof ethereum !== 'undefined') {
          document.getElementById('mintButton').addEventListener('click', async function (event) {
              event.preventDefault(); // Prevent default behavior of the anchor tag

              // Call the mintNFT function when the button is clicked
              await mintNFT();
          });
      } else {
          console.error('MetaMask is not installed.');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}
