// Wrap the code in an asynchronous function
async function initMinting() {
    try {
        // Check if ethereum is available globally
        if (typeof ethereum !== 'undefined') {
            document.getElementById('mintButton').addEventListener('click', async function (event) {
                event.preventDefault(); // Prevent default behavior of the anchor tag

                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const networkId = await ethereum.request({ method: 'net_version' });

                if (networkId === '49797') {
                    const contractAddress = '0x0b21b455850dfAE1577A605Efb5F61E093bC8B61';
                    const mintTx = {
                        from: accounts[0],
                        to: contractAddress,
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
            });
        } else {
            console.error('MetaMask is not installed.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Do not call the asynchronous function here
