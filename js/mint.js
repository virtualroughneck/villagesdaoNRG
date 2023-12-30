async function mintNFT() {
  try {
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

            // Add a counter to keep track of the number of mints
            const mintCounter = 0;

            // Function to increment the mint counter and check if it's reached the limit
            function incrementMintCounter() {
              mintCounter++;
              if (mintCounter >= 1000) {
                // Disable the "Mint Now" button
                document.getElementById('mintButton').disabled = true;
              }
            }

            // Attach a click event handler to the "Mint Now" button
            document.getElementById('mintButton').addEventListener('click', function () {
              // Increment the mint counter
              incrementMintCounter();

              // Construct and sign the minting transaction
              const mintTx = {
                from: accounts[0], // User's Ethereum address
                to: '0x0b21b455850dfAE1577A605Efb5F61E093bC8B61', // Your contract address
                gas: '50000',
                gasPrice: '20000000000',
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
