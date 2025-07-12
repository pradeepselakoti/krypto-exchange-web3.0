

 # 🚀 Krypto Exchange Web3.0

<div align="center">

**A modern decentralized cryptocurrency exchange built with React, Tailwind, Solidity, and Web3.0**

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)](https://react.dev/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8+-363636?style=for-the-badge\&logo=solidity\&logoColor=white)](https://soliditylang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)](https://tailwindcss.com/)
[![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge\&logo=ethereum\&logoColor=white)](https://ethereum.org/)

[🌐 Live Demo](#) • [📖 Documentation](#) • [🛠️ Installation](#-installation) • [🤝 Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

* [✨ Features](#-features)
* [🏗️ Tech Stack](#️-tech-stack)
* [🚀 Installation](#-installation)
* [📁 Project Structure](#-project-structure)
* [📱 Usage Guide](#-usage-guide)
* [🛠️ Development](#️-development)
* [🚀 Deployment](#-deployment)
* [🔍 Testing](#-testing)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)

---

## ✨ Features

| Feature                       | Description                                       | Status |
| ----------------------------- | ------------------------------------------------- | ------ |
| 💱 **Decentralized Exchange** | Send and receive ETH seamlessly with Web3 wallets | ✅      |
| 🦊 **Wallet Integration**     | Connect using MetaMask for transactions           | ✅      |
| 🔒 **Smart Contracts**        | Secure and transparent transactions on Ethereum   | ✅      |
| 🌐 **Blockchain Interaction** | Interact with contracts using Web3.js             | ✅      |
| 📈 **Transaction History**    | View and track previous transactions              | ✅      |
| 🎨 **Responsive UI**          | Fully responsive modern frontend with Tailwind    | ✅      |
| ⚡ **Fast Development**        | Built with Vite for optimized performance         | ✅      |

---

## 🏗️ Tech Stack

### 🎨 Frontend

* **React.js** (v18+)
* **Tailwind CSS**
* **Vite**
* **Heroicons & Lucide-react**

### ⛓️ Blockchain

* **Solidity (0.8+)**
* **Ethereum (Sepolia/Testnet)**
* **Hardhat**
* **Web3.js**

### 🛠️ Tools

* **MetaMask** for wallet interactions
* **Git/GitHub** for version control
* **VS Code** for development

---

## 🚀 Installation

### 📋 Prerequisites

* Node.js (v16+)
* npm or yarn
* MetaMask extension

### ⚡ Setup Steps

1️⃣ Clone the repository:

```bash
git clone https://github.com/pradeepselakoti/krypto-exchange-web3.0.git
cd krypto-exchange-web3.0
```

2️⃣ Install dependencies for **smart contract**:

```bash
cd smart_contract
npm install
```

3️⃣ Install dependencies for **frontend client**:

```bash
cd ../client
npm install
```

4️⃣ Compile and deploy your smart contract on Hardhat:

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

5️⃣ Start the frontend:

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 📁 Project Structure

```
krypto-exchange-web3.0/
├── client/             # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── public/
│   ├── index.html
│   └── package.json
├── smart_contract/     # Solidity smart contracts
│   ├── contracts/
│   │   └── Transactions.sol
│   ├── scripts/
│   ├── test/
│   └── hardhat.config.js
└── README.md
```

---

## 📱 Usage Guide

1️⃣ **Connect MetaMask**: Ensure MetaMask is connected to Sepolia testnet.

2️⃣ **Send Transactions**: Enter receiver address, amount, and optional message to send ETH using your wallet.

3️⃣ **View History**: Track your transactions in the UI after sending ETH.

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev         # Start Vite dev server
npm run build       # Build for production
npx hardhat compile # Compile smart contracts
npx hardhat test    # Run contract tests
```

---

## 🚀 Deployment

You can deploy the frontend easily on **Vercel** or **Netlify**:

```bash
npm run build
```

Upload the `dist` folder to your preferred hosting service.

---

## 🔍 Testing

### Smart Contracts

```bash
cd smart_contract
npx hardhat test
```

### Frontend Testing

Add your unit and integration tests as needed for components.

---

## 🤝 Contributing

We welcome contributions!

* Fork the repository.
* Create a feature branch: `git checkout -b feature/your-feature`
* Commit your changes.
* Push to your fork.
* Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

## 🌟 Show Your Support

If this project helped you, consider giving it a ⭐ on GitHub!

[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge\&logo=twitter\&logoColor=white)](https://x.com/pradeepselakoti)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/pradeep-selakoti-346a57269)

**Made with ❤️ by [Pradeep Selakoti](https://github.com/pradeepselakoti)**

</div>
