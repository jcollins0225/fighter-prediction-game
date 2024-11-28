import Web3 from "web3";
import FighterPredictionGame from "./FighterPredictionGame.json";

const getWeb3 = async () => {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);

    try {
      // Prompt the user to connect MetaMask in a non-blocking way
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return web3;
    } catch (error) {
      // User rejected the connection request
      console.error("MetaMask connection denied by the user.");
      throw new Error("MetaMask connection denied. Please connect to proceed.");
    }
  } else {
    // MetaMask not installed
    throw new Error("MetaMask is not installed. Please install it to use this app.");
  }
};

const getContract = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = FighterPredictionGame.networks[networkId];
  if (!deployedNetwork) {
    throw new Error("Smart contract not deployed to the detected network.");
  }
  return new web3.eth.Contract(
    FighterPredictionGame.abi,
    deployedNetwork && deployedNetwork.address
  );
};

export { getWeb3, getContract };
