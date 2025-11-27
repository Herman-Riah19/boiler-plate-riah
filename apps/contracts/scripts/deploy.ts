import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();
  const [deployer] = await ethers.getSigners();

  if (!deployer) {
    console.error("No deployer account found");
    return;
  }
  console.log("Deploying ContractManager with account:", deployer.address);

  // UTILISE LA NOUVELLE API ETHERS V6 SUPPORTÉE PAR HARDHAT V3
  const contract = await ethers.deployContract("ContractManager", [
    deployer.address,
  ]);

  await contract.waitForDeployment();

  console.log("Contract deployed at:", contract.target);
  console.log("Deploying ContractManager with account:", deployer.address)
  const Manager = await ethers.deployContract("ContractManager", [deployer.address]);
  console.log("Deploying ContractManager with account:", deployer.address);

  await Manager.waitForDeployment();

  console.log("Contract deployed at:", Manager.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
