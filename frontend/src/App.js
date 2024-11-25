import React, { useState, useEffect } from "react";
import { getWeb3, getContract } from "./web3";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const [fighter, setFighter] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const contract = await getContract(web3);
        const accounts = await web3.eth.getAccounts();

        setWeb3(web3);
        setContract(contract);
        setAccount(accounts[0]);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    init();
  }, []);

  const placeBet = async () => {
    if (!fighter || !betAmount) {
      alert("Please select a fighter and enter a bet amount.");
      return;
    }

    try {
      await contract.methods.placeBet(parseInt(fighter)).send({
        from: account,
        value: web3.utils.toWei(betAmount, "ether"),
      });

      alert("Bet placed successfully!");
    } catch (err) {
      console.error(err);
      alert("Error placing bet: " + err.message);
    }
  };

  const handleFighterChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 2) {
      setFighter(value);
    }
  };

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{
        fontSize: "3rem",
        color: "hotpink",
        textShadow: "2px 2px 8px purple",
        animation: "flash 1.5s infinite alternate",
      }}>
        Fighter Prediction Game
      </h1>
      <style>
        {`
          @keyframes flash {
            from {
              opacity: 1;
            }
            to {
              opacity: 0.5;
            }
          }
        `}
      </style>
      <div>
        <h2>Select Your Fighter</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
          <img src="/fighter1.png" alt="Fighter 1" style={{ width: "200px", border: "3px solid blue" }} />
          <img src="/fighter2.png" alt="Fighter 2" style={{ width: "200px", border: "3px solid red" }} />
        </div>
      </div>
      <div style={{ margin: "20px" }}>
        <label>
          Fighter (1 or 2):{" "}
          <input
            type="number"
            value={fighter}
            onChange={handleFighterChange}
          />
        </label>
        <br />
        <label>
          Bet Amount (in ETH):{" "}
          <input
            type="text"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
          />
        </label>
        <br />
        <button
          onClick={placeBet}
          style={{
            padding: "10px 20px",
            backgroundColor: "purple",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Place Bet
        </button>
      </div>
    </div>
  );
};

export default App;
