import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token", function () {
  let Token;
  let hardhatToken: any;
  let owner: any;
  let addr1: any;
  let addr2: any;
  let addrs: any;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  it("Should return the name of token", async function () {
    expect(await hardhatToken.name()).to.equal("SquadTrade");
    expect(await hardhatToken.symbol()).equal("SQT");
  });

  it("Testing for transfer", async function () {
    await hardhatToken.transfer(addr1.address, 100);
    const initialOwnerBalance = await hardhatToken.balanceOf(addr1.address);
    expect(initialOwnerBalance).to.equal(100);
  });
});
