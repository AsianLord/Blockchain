pragma solidity ^0.5.16;

//this contract is responsible for knowing where each token is
contract EldogeToken {
	// Name
	string public name = "Eldoge Token";
	// Symbol
	string public symbol = "ELDOGE";
	// standard
	string public standard = 'Eldoge Token v1.0';

	// state variable that writes to storage(blockchain)
	// so will be publicly visible
	// uint256 is unsigned integer
	// solidity provides getter function already because of
	// public declaration of state variable
	uint256 public totalSupply;

	// This event is something that the contract is going to admit that the consumer can subscribe to
	event Transfer(
		address indexed _from, // _from account is msg.sender
		address indexed _to,
		uint256 _value
	);
	
	// takes the address of the owner and returns
	// returns an unsigned integer - the balance of the address
	// this function is primarily responsible for knowing who has each token
	mapping(address => uint256) public balanceOf;

 	// Constructor
	// Sets the total number of tokens
	// Read the total number of tokens
	constructor (uint256 _initialSupply) public {
		balanceOf[msg.sender] = _initialSupply;

		// state variable that writes to storage(blockchain)
		// value passed from the migrations file "1_deploy_contracts.js" is set as 
		// the value of total supply
		totalSupply = _initialSupply;
	}

	// Transfer
	// address is a special data type in solidity that corresponds to the user's connection to the blockchain

	function transfer(address _to, uint256 _value) public returns (bool success){
		// Exception if account doesn't have enough
		// require is special to solidity that says if the evaluation in () is true then continue execution
		// and if false then stop execution and flag an error
		require(balanceOf[msg.sender] >= _value);
		
		// Transfer the balance
		// deducts from sender account
		balanceOf[msg.sender] -= _value;
		// adds the deducted value from sender acount to the receiving account
		balanceOf[_to] += _value;

		// Transfer event
		emit Transfer(msg.sender, _to, _value); // msg.sender is the account that is calling this function

		// Return a boolean
		return true;
	}	
}
