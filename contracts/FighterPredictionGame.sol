// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract FighterPredictionGame {
    struct Bet {
        address better;
        uint256 amount;
        uint8 fighter; // Fighter ID (1 or 2)
    }

    address public owner;
    uint256 public totalBetsFighter1;
    uint256 public totalBetsFighter2;
    bool public bettingOpen = true;
    mapping(address => Bet) public bets;
    address[] public participants;

    event BetPlaced(address indexed better, uint8 fighter, uint256 amount);
    event MatchResult(uint8 winner);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this.");
        _;
    }

    function placeBet(uint8 _fighter) public payable {
        require(bettingOpen, "Betting is closed.");
        require(msg.value > 0, "You must bet a positive amount.");
        require(_fighter == 1 || _fighter == 2, "Invalid fighter.");
        require(bets[msg.sender].amount == 0, "You have already placed a bet.");

        bets[msg.sender] = Bet(msg.sender, msg.value, _fighter);
        participants.push(msg.sender);

        if (_fighter == 1) {
            totalBetsFighter1 += msg.value;
        } else {
            totalBetsFighter2 += msg.value;
        }

        emit BetPlaced(msg.sender, _fighter, msg.value);
    }

    function closeBetting() public onlyOwner {
        bettingOpen = false;
    }

    function finalizeMatch(uint8 _winner) public onlyOwner {
        require(!bettingOpen, "Betting is still open.");
        require(_winner == 1 || _winner == 2, "Invalid winner.");

        emit MatchResult(_winner);

        uint256 rewardPool = address(this).balance;
        uint256 totalBets = _winner == 1 ? totalBetsFighter1 : totalBetsFighter2;

        for (uint256 i = 0; i < participants.length; i++) {
            address participant = participants[i];
            Bet memory bet = bets[participant];

            if (bet.fighter == _winner) {
                uint256 reward = (bet.amount * rewardPool) / totalBets;
                payable(participant).transfer(reward);
            }
        }

        delete participants;
    }
}
