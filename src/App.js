import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TennisOddsPredictor = () => {
  const [player1Odds, setPlayer1Odds] = useState("");
  const [player2Odds, setPlayer2Odds] = useState("");
  const [breakPlayer, setBreakPlayer] = useState("");
  const [predictedOdds, setPredictedOdds] = useState("");

  const handlePredictOdds = () => {
    const p1Odds = parseFloat(player1Odds);
    const p2Odds = parseFloat(player2Odds);

    if (!p1Odds || !p2Odds || !breakPlayer) {
      alert("Please fill in all fields!");
      return;
    }

    // Convert odds to implied probabilities
    const p1Probability = 1 / p1Odds;
    const p2Probability = 1 / p2Odds;

    // Adjust probabilities based on the player who made the break
    let newP1Probability, newP2Probability;

    if (breakPlayer === "Player 1") {
      // Player 1 made the break
      newP1Probability = p1Probability * (1 + 0.33); // Increase Player 1 probability by 33%
      newP2Probability = p2Probability * (1 - 0.33); // Decrease Player 2 probability by 33%
    } else if (breakPlayer === "Player 2") {
      // Player 2 made the break
      newP1Probability = p1Probability * (1 - 0.33); // Decrease Player 1 probability by 33%
      newP2Probability = p2Probability * (1 + 0.33); // Increase Player 2 probability by 33%
    }

    // Normalize probabilities to ensure they sum to 1
    const totalProbability = newP1Probability + newP2Probability;
    newP1Probability /= totalProbability;
    newP2Probability /= totalProbability;

    // Convert back to odds
    const newPlayer1Odds = (1 / newP1Probability).toFixed(2);
    const newPlayer2Odds = (1 / newP2Probability).toFixed(2);

    setPredictedOdds(
        `Player 1: ${newPlayer1Odds}, Player 2: ${newPlayer2Odds}`
    );
  };

  return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">Tennis Odds Predictor</h2>
          <div className="mb-3">
            <label htmlFor="player1Odds" className="form-label">
              Player 1 Odds
            </label>
            <input
                type="number"
                id="player1Odds"
                className="form-control"
                value={player1Odds}
                onChange={(e) => setPlayer1Odds(e.target.value)}
                placeholder="Enter Player 1 Odds"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="player2Odds" className="form-label">
              Player 2 Odds
            </label>
            <input
                type="number"
                id="player2Odds"
                className="form-control"
                value={player2Odds}
                onChange={(e) => setPlayer2Odds(e.target.value)}
                placeholder="Enter Player 2 Odds"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="breakPlayer" className="form-label">
              Who Made the Break?
            </label>
            <select
                id="breakPlayer"
                className="form-select"
                value={breakPlayer}
                onChange={(e) => setBreakPlayer(e.target.value)}
            >
              <option value="">Select Player</option>
              <option value="Player 1">Player 1</option>
              <option value="Player 2">Player 2</option>
            </select>
          </div>
          <button className="btn btn-primary w-100" onClick={handlePredictOdds}>
            Predict Odds
          </button>

          {predictedOdds && (
              <div className="alert alert-info mt-4 text-center">
                {predictedOdds}
              </div>
          )}
        </div>
      </div>
  );
};

export default TennisOddsPredictor;
