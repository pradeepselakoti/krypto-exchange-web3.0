const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Use "Transactions" instead of "Greeter"
  const Transactions = await ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();
  
  await transactions.waitForDeployment();
  console.log("Transactions contract deployed to:", await transactions.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});