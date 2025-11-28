

📘 Appointment Book DApp — README 📌 Overview

The Appointment Book DApp is a full-stack decentralized application that allows users to create and manage appointments on the blockchain. It uses a Solidity smart contract, a web front-end, and a wallet (like MetaMask) to interact with the Ethereum network.

This project demonstrates:

Web3 integration

Smart contract interaction

A simple UI for storing appointment data

Gas-efficient blockchain storage

🛠️ Tech Stack

Solidity (Smart Contract)

JavaScript / TypeScript

React / Next.js / HTML frontend (choose yours)

Ethers.js or Web3.js

Hardhat / Truffle for contract deployment

MetaMask for wallet connection

📦 Features

Add new appointments stored on the blockchain

View all stored appointments

Interact with wallet (connect, send transaction)

Gas-optimized contract

Fully decentralized appointment tracking

📜 Smart Contract

The contract is responsible for:

Storing appointment text in an array

Adding new appointments

Returning the total number of appointments

It is intentionally kept minimal to reduce gas cost.

🖥️ Frontend

The frontend includes:

Connect Wallet button

Input field to add a new appointment

List or table showing stored appointments

Buttons that call contract functions using Ethers.js/Web3.js

🚀 How to Run the Project

Install dependencies npm install

Compile Smart Contract npx hardhat compile

Deploy Smart Contract npx hardhat run scripts/deploy.js --network <your_network>

Start Frontend npm run dev

🔑 Environment Variables

Create a .env file to store:

PRIVATE_KEY= RPC_URL= CONTRACT_ADDRESS=

🔒 Security Notes

Users must connect their wallet to perform blockchain actions

Gas cost depends on the network

All appointment data is public on the blockchain

📄 License

MIT License Free to use and modify. newww