import React, { useState } from "react";

const App = () => {
  const [fighter, setFighter] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [potentialReturn, setPotentialReturn] = useState(0);

  const handleFighterSelect = (fighterId) => {
    setFighter(fighterId);
    console.log(`Selected Fighter: ${fighterId}`);
  };

  const placeBet = () => {
    if (!fighter || !betAmount) {
      alert("Please select a fighter and enter a bet amount.");
      return;
    }

    alert(`Bet placed on Fighter ${fighter} with ${betAmount} BNB!`);
  };

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "'Press Start 2P', cursive", // Retro arcade font
        color: "white",
        backgroundImage:
          "radial-gradient(circle at center, #ff00cc, #3333ff, #000000)", // Neon retro gradient
        backgroundSize: "cover",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          color: "#FF00FF",
          textShadow: "3px 3px 10px cyan, -3px -3px 10px magenta",
          animation: "flash 1.5s infinite alternate",
        }}
      >
        Fighter Prediction Game
      </h1>
      <style>
        {`
          @keyframes flash {
            from {
              opacity: 1;
            }
            to {
              opacity: 0.8;
            }
          }

          .retro-button {
            display: inline-block;
            margin-top: 10px;
            padding: 15px 30px;
            font-size: 1.2rem;
            font-family: 'Press Start 2P', cursive;
            color: white;
            background: linear-gradient(45deg, #FF00FF, #FFAA00, #00FFFF);
            border: 3px solid #333;
            border-radius: 10px;
            text-transform: uppercase;
            text-shadow: 0 0 10px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF;
            box-shadow: 0 0 20px #FF00FF, 0 0 30px #FF00FF;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.3s;
          }

          .retro-button:hover {
            transform: scale(1.1);
            box-shadow: 0 0 30px #FFFF00, 0 0 40px #FFFF00;
          }

          .retro-button:active {
            transform: scale(1);
            box-shadow: 0 0 20px #FF0000, 0 0 30px #FF0000;
          }
        `}
      </style>

      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <div>
          <img
            src="/fighter1.gif"
            alt="Fighter 1"
            style={{
              width: "250px",
              border: "5px solid blue",
              borderRadius: "10px",
              boxShadow: "0px 0px 20px rgba(0, 0, 255, 0.8)",
            }}
          />
          <br />
          <button
            className="retro-button"
            onClick={() => handleFighterSelect(1)}
          >
            Select Fighter 1
          </button>
        </div>

        <div>
          <img
            src="/fighter2.gif"
            alt="Fighter 2"
            style={{
              width: "250px",
              border: "5px solid red",
              borderRadius: "10px",
              boxShadow: "0px 0px 20px rgba(255, 0, 0, 0.8)",
            }}
          />
          <br />
          <button
            className="retro-button"
            onClick={() => handleFighterSelect(2)}
          >
            Select Fighter 2
          </button>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <label>
          Bet Amount (in BNB):{" "}
          <input
            type="text"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>
        <br />
        <p style={{ marginTop: "10px" }}>
          Selected Fighter: {fighter || "None"} | Potential Return:{" "}
          {potentialReturn} BNB
        </p>
        <button
          className="retro-button"
          onClick={placeBet}
          style={{ marginTop: "20px" }}
        >
          Place Bet
        </button>
      </div>
    </div>
  );
};

export default App;
