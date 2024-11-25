const FighterPredictionGame = artifacts.require("FighterPredictionGame");

module.exports = function (deployer) {
  deployer.deploy(FighterPredictionGame);
};

