# 🚀 Krypto Exchange Web3.0

<div align="center">

**A modern decentralized cryptocurrency exchange built with React, Tailwind, Solidity, and Web3.0**

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)](https://react.dev/) [![Solidity](https://img.shields.io/badge/Solidity-0.8+-363636?style=for-the-badge\&logo=solidity\&logoColor=white)](https://soliditylang.org/) [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3+-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)](https://tailwindcss.com/) [![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge\&logo=ethereum\&logoColor=white)](https://ethereum.org/)

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
* [🌟 Show Your Support](#-show-your-support)

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

* **React.js (v18+)**
* **Tailwind CSS**
* **Vite**
* **Heroicons & Lucide-react**

### ⛓️ Blockchain

* **Solidity (0.8+)**
* **Ethereum (Sepolia/Testnet)**
* **Hardhat**
* **Web3.js**

### 🛠️ Tools

* **MetaMask**
* **Git/GitHub**
* **VS Code**

---

## 🚀 Installation

### 📋 Prerequisites

* Node.js (v16+)
* npm or yarn
* MetaMask extension

### ⚡ Setup Steps

```bash
git clone https://github.com/pradeepselakoti/krypto-exchange-web3.0.git
cd krypto-exchange-web3.0
```

Install smart contract dependencies:

```bash
cd smart_contract
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

Compile and deploy smart contracts:

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

Run the frontend:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
krypto-exchange-web3.0/
├── client/ (frontend)
├── smart_contract/ (contracts)
└── README.md
```

---

## 📱 Usage Guide

* Connect MetaMask to Sepolia testnet.
* Enter recipient address, amount, and message.
* Confirm and send transactions.
* Track transactions visually.

---

## 🛠️ Development

```bash
npm run dev        # Vite dev server
npm run build      # Production build
npx hardhat compile # Compile contracts
npx hardhat test    # Run tests
```

---

## 🚀 Deployment

Deploy frontend using **Vercel** or **Netlify** after building:

```bash
npm run build
```

Upload the `dist` folder for production deployment.

---

## 🔍 Testing

### Smart Contracts

```bash
cd smart_contract
npx hardhat test
```

### Frontend

Add unit and integration tests as needed.

---

## 🤝 Contributing

1. Fork this repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your fork.
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🌟 Show Your Support

If this project helped you, please consider giving it a ⭐ on GitHub!

---

## 📞 Connect With Us

[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge\&logo=twitter\&logoColor=white)](https://x.com/pradeepselakoti) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge\&logo=linkedin\&logoColor=white)](https://www.linkedin.com/in/pradeep-selakoti-346a57269) [![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge\&logo=discord\&logoColor=white)](https://discord.gg)

---

## 💝 Support the Project

If you find this project valuable, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge\&logo=buy-me-a-coffee\&logoColor=black)](https://buymeacoffee.com) [![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge\&logo=ethereum\&logoColor=white)](https://ethereum.org/)

**ETH Address:** `8Q8PpJe12Kc4frSASteGmGrZLsu9M8WoddYsm2trbzxH`

---

<div align="center">

**Made with ❤️ by [Pradeep Selakoti](https://github.com/pradeepselakoti)**

</div>
