// artifacts allows us to interact with JS runtime environment
var EldogeToken = artifacts.require("./EldogeToken.sol");

module.exports = function(deployer) {
  // passes 10,000,000 to EldogeToken constructor
  deployer.deploy(EldogeToken, 10000000);
};


