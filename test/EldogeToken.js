var EldogeToken = artifacts.require("./EldogeToken.sol");

contract("EldogeToken", function(accounts){

	it('sets the total suppy upon deployment', function(){
		return EldogeToken.deployed().then(function(instance){
			tokenInstance =  instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 10000000, 'sets the total supply to 10,000,000');
		});
	});
});