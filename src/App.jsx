import React, { useState } from "react";
import { ethers } from "ethers";
import { Keypair } from "@solana/web3.js";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaCopy, FaExclamationTriangle, FaLock } from "react-icons/fa";
import * as bip39 from "bip39";

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [ethDetails, setEthDetails] = useState({ address: "", privateKey: "" });
  const [solDetails, setSolDetails] = useState({ publicKey: "", secretKey: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [isMnemonicVisible, setIsMnemonicVisible] = useState(false);
  const [isEnteringMnemonic, setIsEnteringMnemonic] = useState(false);
  const [mnemonicInput, setMnemonicInput] = useState("");

  const generateWallets = async (mnemonicPhrase) => {
    try {
      let ethWallet;
      if (mnemonicPhrase) {
        if (!bip39.validateMnemonic(mnemonicPhrase.trim())) {
          throw new Error("Invalid mnemonic phrase");
        }

        ethWallet = ethers.HDNodeWallet.fromMnemonic(
          ethers.Mnemonic.fromPhrase(mnemonicPhrase.trim())
        );
        setMnemonic(mnemonicPhrase.trim());
      } else {
        const newMnemonic = bip39.generateMnemonic();
        ethWallet = ethers.HDNodeWallet.fromMnemonic(
          ethers.Mnemonic.fromPhrase(newMnemonic)
        );
        setMnemonic(newMnemonic);
      }

      setEthDetails({
        address: ethWallet.address,
        privateKey: ethWallet.privateKey,
      });

      const solWallet = Keypair.generate();
      setSolDetails({
        publicKey: solWallet.publicKey.toString(),
        secretKey: Buffer.from(solWallet.secretKey).toString("hex"),
      });

      setShowPopup(!isEnteringMnemonic);
    } catch (error) {
      alert(
        error.message || "Invalid mnemonic phrase. Please check and try again."
      );
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const toggleMnemonicVisibility = () => {
    setIsMnemonicVisible(!isMnemonicVisible);
  };

  const handleMnemonicInput = () => {
    generateWallets(mnemonicInput);
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
        <h1 className="text-6xl font-extrabold mb-4 text-neon-cyan">
          Cryptowave
        </h1>
        <p className="mb-8 text-xl text-gray-300">
          Generate or Enter Mnemonic, Private Keys, and Public Addresses
        </p>

        <div className="flex justify-center mb-8">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-full font-bold shadow-lg hover:shadow-neon hover:from-blue-500 hover:to-purple-400 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none"
            onClick={() => {
              setIsEnteringMnemonic(false);
              generateWallets(null);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate New Wallet
          </motion.button>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 text-white rounded-full font-bold shadow-lg hover:shadow-neon hover:from-teal-500 hover:to-green-400 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none ml-4"
            onClick={() => setIsEnteringMnemonic(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter Existing Mnemonic
          </motion.button>
        </div>

        {isEnteringMnemonic && (
          <div className="mb-8 w-full flex flex-col items-center">
            <input
              type="text"
              className="w-full max-w-lg p-4 text-black rounded-lg focus:outline-none"
              placeholder="Enter your existing mnemonic phrase here..."
              value={mnemonicInput}
              onChange={(e) => setMnemonicInput(e.target.value)}
            />
            <motion.button
              className="mt-4 px-6 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-500 transition-transform transform hover:scale-105 active:scale-95 focus:outline-none"
              onClick={handleMnemonicInput}
            >
              Use Mnemonic
            </motion.button>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8 rounded-xl shadow-lg max-w-xl w-full relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2
                className="text-3xl font-extrabold mb-6 text-center text-neon-cyan"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Your Secret Phrase
              </motion.h2>
              <div className="grid grid-cols-3 gap-4 mb-6 relative">
                <motion.div
                  className="absolute inset-0 bg-gray-700 rounded-lg z-10 flex items-center justify-center"
                  initial={false}
                  animate={{ opacity: isMnemonicVisible ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {!isMnemonicVisible && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FaLock size={48} className="text-neon-cyan ml-8" />
                      <p className="mt-2 text-neon-cyan font-bold">
                        Phrase Hidden
                      </p>
                    </motion.div>
                  )}
                </motion.div>
                {mnemonic.split(" ").map((word, index) => (
                  <motion.div
                    key={index}
                    className="p-3 bg-gray-900 rounded text-center shadow-inner"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="text-neon-pink font-bold mr-2">
                      {index + 1}.
                    </span>
                    <span className="font-mono">{word}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <motion.button
                  className="text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-500 transition flex items-center"
                  onClick={toggleMnemonicVisibility}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMnemonicVisible ? (
                    <FaEyeSlash className="mr-2" />
                  ) : (
                    <FaEye className="mr-2" />
                  )}
                  {isMnemonicVisible ? "Hide" : "Show"} Phrase
                </motion.button>
                <motion.button
                  className="text-white bg-green-600 px-4 py-2 rounded-full hover:bg-green-500 transition flex items-center"
                  onClick={() => copyToClipboard(mnemonic)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCopy className="mr-2" /> Copy Phrase
                </motion.button>
                <motion.button
                  className="text-white bg-red-600 px-4 py-2 rounded-full hover:bg-red-500 transition"
                  onClick={() => setShowPopup(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
              <motion.p
                className="text-red-500 text-sm mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FaExclamationTriangle className="inline mr-1" /> Important:
                Copy and store your mnemonic securely. This is the only way to
                recover your wallets. If lost, your funds cannot be retrieved.
                Do not share it with anyone.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showPopup && mnemonic && (
        <motion.div
          className="mt-10 p-6 bg-gray-900 bg-opacity-80 text-neon-cyan rounded-3xl shadow-xl max-w-3xl w-full z-10 border border-neon-pink backdrop-blur-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold mb-4">Wallet Details</h2>

          <div className="mb-8">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="mr-2">Ethereum Wallet</span>
              <img
                src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024"
                alt="Ethereum"
                className="w-8 h-8 inline-block"
              />
            </h3>
            <div className="relative mb-4">
              <div className="mt-2 p-4 bg-black bg-opacity-30 border border-neon-cyan rounded-xl shadow-inner flex items-center">
                <strong className="mr-2">Address:</strong>
                <p className="flex-1 font-mono truncate hover:overflow-visible hover:whitespace-normal hover:bg-opacity-60 transition-all duration-300 text-eth-address">
                  {ethDetails.address}
                </p>
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
                <p className="flex-1 font-mono truncate hover:overflow-visible hover:whitespace-normal hover:bg-opacity-60 transition-all duration-300 text-eth-private-key">
                  {ethDetails.privateKey}
                </p>
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
              <img
                src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=024"
                alt="Solana"
                className="w-8 h-8 inline-block"
              />
            </h3>
            <div className="relative mb-4">
              <div className="mt-2 p-4 bg-black bg-opacity-30 border border-neon-cyan rounded-xl shadow-inner flex items-center">
                <strong className="mr-2">Public Key:</strong>
                <p className="flex-1 font-mono truncate hover:overflow-visible hover:whitespace-normal hover:bg-opacity-60 transition-all duration-300 text-sol-public-key">
                  {solDetails.publicKey}
                </p>
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
                <p className="flex-1 font-mono truncate hover:overflow-visible hover:whitespace-normal hover:bg-opacity-60 transition-all duration-300 text-sol-secret-key">
                  {solDetails.secretKey}
                </p>
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
