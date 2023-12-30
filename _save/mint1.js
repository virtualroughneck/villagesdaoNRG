// Check if MetaMask is installed and connected
if (typeof window.ethereum !== 'undefined') {
  const ethereum = window.ethereum;

  // Request user's permission to access MetaMask
  ethereum.request({ method: 'eth_requestAccounts' })
    .then(async function (accounts) {
      // Check if the current network is Energi
      const networkId = await ethereum.request({ method: 'net_version' });
      if (networkId === '49797') {
        // The user is connected to the Energi network
        // You can proceed with minting here

        // Construct and sign the minting transaction
        const mintTx = {
          from: accounts[0], // User's Ethereum address
          to: '0x0b21b455850dfAE1577A605Efb5F61E093bC8B61', // Your contract address
          data: 'YOUR_MINT_FUNCTION_DATA', // Data for the minting function
        };

        ethereum.request({ method: 'eth_sendTransaction', params: [mintTx] })
          .then(function (transactionHash) {
            // Transaction sent successfully
            console.log('Transaction Hash:', transactionHash);

            // You can display a success message or perform other actions here
          })
          .catch(function (error) {
            // Transaction failed
            console.error('Transaction Error:', error);

            // You can display an error message to the user
          });
      } else {
        // User is not connected to the Energi network
        console.error('Please connect to the Energi network in MetaMask.');

        // You can display a message instructing the user to switch networks
      }
    })
    .catch(function (error) {
      // User denied access to MetaMask
      console.error('User denied access to MetaMask:', error);

      // You can display a message to the user indicating that access is required to proceed
    });
} else {
  // MetaMask not found
  console.error('MetaMask is not installed.');

  // You can display a message instructing the user to install MetaMask
}
