import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Keypair } from '@solana/web3.js';
import { motion } from 'framer-motion';

function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [ethDetails, setEthDetails] = useState({ address: '', privateKey: '' });
  const [solDetails, setSolDetails] = useState({ publicKey: '', secretKey: '' });

  const generateWallets = () => {
    const ethWallet = ethers.Wallet.createRandom();
    setMnemonic(ethWallet.mnemonic.phrase);
    setEthDetails({ address: ethWallet.address, privateKey: ethWallet.privateKey });

    const solWallet = Keypair.generate();
    setSolDetails({ publicKey: solWallet.publicKey.toString(), secretKey: Buffer.from(solWallet.secretKey).toString('hex') });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-blue-900 opacity-30 animate-gradient-x pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-black"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-transparent to-black"></div>
      </div>
      
      <motion.div 
        className="text-center max-w-3xl w-full z-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-extrabold mb-4 text-neon-cyan">Cryptowave</h1>
        <p className="mb-8 text-xl text-gray-300">Generate Mnemonic, Private Keys, and Public Addresses</p>
        
        <motion.button 
          className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-full font-bold shadow-lg hover:shadow-neon hover:from-blue-500 hover:to-purple-400 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none"
          onClick={generateWallets}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate Wallets
        </motion.button>
      </motion.div>

      {mnemonic && (
        <motion.div 
          className="mt-10 p-6 bg-gray-900 bg-opacity-80 text-neon-cyan rounded-3xl shadow-xl max-w-3xl w-full z-10 border border-neon-pink backdrop-blur-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold mb-4">Mnemonic:</h2>
          <p className="break-words mb-8 text-lg">{mnemonic}</p>

          <div className="mb-8">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="mr-2">Ethereum Wallet</span>
              <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024" alt="Ethereum" className="w-8 h-8 inline-block" />
            </h3>
            <div className="relative mb-4">
              <div className="mt-2 p-4 bg-black bg-opacity-30 border border-neon-cyan rounded-xl shadow-inner flex items-center">
                <strong className="mr-2">Address:</strong>
                <p className="flex-1 font-mono truncate hover:overflow-visible hover:whitespace-normal hover:bg-opacity-60 transition-all duration-300">{ethDetails.address}</p>
                <button 
                  className="ml-4 text-sm bg-neon-cyan hover:bg-neon-green text-gray-900 rounded-full p-2 transition-all"
                  onClick={() => copyToClipboard(ethDetails.address)}
                >
                  Copy
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="mt-2 p-4 bg-black bg-opacity-30 border border-neon-cyan rounded-xl shadow-inner flex items-center">
                <strong className="mr-2">Private Key:</strong>
                <p className="flex-1 font-mono truncate hover:overflow-visible hover:whitespace-normal hover:bg-opacity-60 transition-all duration-300">{ethDetails.privateKey}</p>
                <button 
                  className="ml-4 text-sm bg-neon-cyan hover:bg-neon-green text-gray-900 rounded-full p-2 transition-all"
                  onClick={() => copyToClipboard(ethDetails.privateKey)}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold flex items-center">
              <span className="mr-2">Solana Wallet</span>
              <img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=024" alt="Solana" className="w-8 h-8 inline-block" />
            </h3>
            <div className="relative mb-4">
              <div className="mt-2 p-4 bg-black bg-opacity-30 border border-neon-cyan rounded-xl shadow-inner flex items-center">
                <strong className="mr-2">Public Key:</strong>
                <p className="flex-1 font-mono truncate hover:overflow-visible hover:whitespace-normal hover:bg-opacity-60 transition-all duration-300">{solDetails.publicKey}</p>
                <button 
                  className="ml-4 text-sm bg-neon-cyan hover:bg-neon-green text-gray-900 rounded-full p-2 transition-all"
                  onClick={() => copyToClipboard(solDetails.publicKey)}
                >
                  Copy
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="mt-2 p-4 bg-black bg-opacity-30 border border-neon-cyan rounded-xl shadow-inner flex items-center">
                <strong className="mr-2">Secret Key:</strong>
                <p className="flex-1 font-mono truncate hover:overflow-visible hover:whitespace-normal hover:bg-opacity-60 transition-all duration-300">{solDetails.secretKey}</p>
                <button 
                  className="ml-4 text-sm bg-neon-cyan hover:bg-neon-green text-gray-900 rounded-full p-2 transition-all"
                  onClick={() => copyToClipboard(solDetails.secretKey)}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
