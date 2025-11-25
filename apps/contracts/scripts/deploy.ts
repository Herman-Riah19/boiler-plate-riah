import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();
  const [deployer] = await ethers.getSigners();

  if (!deployer) {
    console.error("No deployer account found");
    return;
  }
  const Manager = await ethers.deployContract("ContractManager", [deployer.address]);
  console.log("Deploying ContractManager with account:", deployer.address);

  console.log("Contract deployed at:", Manager.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
