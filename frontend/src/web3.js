import Web3 from "web3";
import FighterPredictionGame from "./FighterPredictionGame.json";

const getWeb3 = async () => {
  // Check if window.ethereum exists
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return web3;
    } catch (error) {
      console.error("User denied account access.");
      throw new Error("User denied account access to MetaMask.");
    }
  } else if (typeof window.web3 !== "undefined") {
    // Legacy dapp browsers (e.g., Mist/old MetaMask)
    return new Web3(window.web3.currentProvider);
  } else {
    // If no injected provider is detected, throw an error
    throw new Error("MetaMask is not installed. Please install MetaMask to use this application.");
  }
};

const getContract = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = FighterPredictionGame.networks[networkId];
  if (!deployedNetwork) {
    throw new Error("Smart contract not deployed to detected network.");
  }
  return new web3.eth.Contract(
    FighterPredictionGame.abi,
    deployedNetwork && deployedNetwork.address
  );
};

export { getWeb3, getContract };
