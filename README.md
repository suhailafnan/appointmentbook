📅 Appointment Book DApp

The Appointment Book DApp is a full-stack decentralized application that allows users to create and manage appointment records directly on the Ethereum blockchain. This project serves as a practical, gas-efficient demonstration of connecting a modern web frontend to a Solidity smart contract via a Web3 wallet (like MetaMask).

This application demonstrates the core principles of decentralized data storage and state management using smart contracts.

✨ Project Highlights

Web3 Integration: Seamless connection and interaction with the Ethereum network using Ethers.js.

Smart Contract Interaction: Sending transactions and reading state from a deployed Solidity contract.

Simple UI: A clear interface for essential blockchain interactions.

Gas-Efficient Storage: The smart contract is intentionally minimal to keep transaction costs low.

Decentralized Tracking: Appointment data is permanently and publicly recorded on the blockchain.

🛠️ Tech Stack

Component

Technology

Role

Smart Contract

Solidity

Core business logic and data storage.

Development

Hardhat

Compilation, testing, and deployment framework.

Frontend

React / Next.js / HTML (Choose yours)

User interface and application structure.

Web3 Library

Ethers.js or Web3.js

Facilitates communication between the frontend and the blockchain.

Wallet

MetaMask

User's identity and transaction signing provider.

📦 Features

Connect Wallet: Authenticate the user and access their address using MetaMask.

View Appointments: Fetch and display a list of all stored appointments from the blockchain.

Add Appointment: Send a transaction to the contract to persist a new appointment entry.

Total Count: Retrieve and display the total number of appointments stored.

📜 Smart Contract (AppointmentBook.sol)

The contract's role is intentionally focused on minimizing gas costs and ensuring secure data persistence.

Data Storage: Stores appointment descriptions (strings) in a public array.

addAppointment(string calldata appointmentText): Allows any connected wallet to add a new appointment.

getAppointmentCount(): Returns the total number of appointments currently stored.

🖥️ Frontend

The application UI provides a streamlined experience for decentralized interaction:

A prominent "Connect Wallet" button.

An input field and submit button to add a new appointment.

A section that displays the list/table of stored appointments by calling the contract's read functions.

Real-time feedback on transaction status (pending, success, error).

🚀 How to Run the Project

Follow these steps to set up the contract, deploy it, and start the frontend application.

1. Project Setup

# Install required dependencies
npm install


2. Smart Contract

# Compile the Solidity contract
npx hardhat compile

# Deploy the contract to your chosen network (e.g., Goerli, Sepolia, Localhost)
# NOTE: Replace `<your_network>` with the configured network name in hardhat.config.js
npx hardhat run scripts/deploy.js --network <your_network>


3. Frontend

# Start the frontend application
npm run dev


🔑 Environment Variables

Create a file named .env in the project root to configure the deployment process and frontend connection:

# Private key for the wallet used to deploy the contract (for deployment scripts only)
PRIVATE_KEY="YOUR_DEPLOYER_PRIVATE_KEY" 

# RPC URL for the network you are targeting (e.g., Alchemy or Infura URL)
RPC_URL="YOUR_NETWORK_RPC_URL"

# The address of the deployed AppointmentBook contract (MANDATORY for frontend)
CONTRACT_ADDRESS="0x..." 


🔒 Security Notes

Public Data: All data stored on the blockchain is inherently public. Do not store sensitive, private information in the appointment descriptions.

Gas: Transaction fees (gas) are required for adding new appointments, as this changes the blockchain's state.

📄 License

This project is licensed under the MIT License. Feel free to use and modify it.
