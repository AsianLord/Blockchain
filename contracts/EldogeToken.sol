pragma solidity ^0.5.16;

contract EldogeToken {
	// Constructor
	// Sets the total number of tokens
	// Read the total number of tokens

	// state variable that writes to storage(blockchain)
	// so will be publicly visible
	// uint256 is unsigned integer
	// solidity provides getter function already because of
	// public declaration of state variable
	uint256 public totalSupply;
	
	// constructor() public {
	// 	totalSupply = 100000000;
	// }


	// Constructor
	constructor (uint256 _initialSupply) public {
		// state variable that writes to storage(blockchain)
		totalSupply = _initialSupply;
	}
}
