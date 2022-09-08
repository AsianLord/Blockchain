var EldogeToken = artifacts.require("./EldogeToken.sol");

contract("EldogeToken", function(accounts){
	var tokenInstance;
	// name, symbol and standard attributes
	it('initialises the contract with the correct values', function(){
		return EldogeToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name){
			assert.equal(name, 'Eldoge Token', 'has the correct name');
			return tokenInstance.symbol();
		}).then(function(symbol){
			assert.equal(symbol, 'ELDOGE', 'has the correct symbol');
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard, 'Eldoge Token v1.0', 'has the correct standard');
		});
	});

	it('allocates the initial supply upon deployment', function(){
		return EldogeToken.deployed().then(function(instance){
			tokenInstance =  instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 10000000, 'sets the total supply to 10,000,000');
			return tokenInstance.balanceOf(accounts[0]); // accounts[0] first account indexed [0]
		}).then(function(adminBalance){
			assert.equal(adminBalance.toNumber(), 10000000, 'it allocates the initial supply to the admin');
		});
	});

	//transfer function
	it('transfers token ownership', function() {
		return EldogeToken.deployed().then(function(instance){
			tokenInstance = instance;
			//Test `require` statement first by transferring something larger than the sender's balance
			return tokenInstance.transfer.call(accounts[1], 999999999999999);
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
			return tokenInstance.transfer.call(accounts[1], 2500000, { from : accounts[0] });
		}).then(function(success){
			assert.equal(success, true , 'it returns true'); //asserts that success is equal to true and returns true
			return tokenInstance.transfer(accounts[1], 2500000, { from: accounts[0] });
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, 'triggers one event');
			assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
			assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
			assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
			assert.equal(receipt.logs[0].args._value, 2500000, 'logs the transfer amount');
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 2500000, 'adds the amount to the receiving account');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 7500000, 'deducts the amount from the sending account');
		});
	});
});