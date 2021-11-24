import { expect, should } from "chai";
import { ethers } from "hardhat";

describe("Token Contract", function () {
  let Token: any;
  let hardhatToken: any;
  let owner: any;
  let addr1: any;
  let addr2: any;
  let result: any;
  const amount: any = 100;
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });

  it("Should return the name of token", async function () {
    expect(await hardhatToken.name()).to.equal("SquadTrade");
    expect(await hardhatToken.symbol()).equal("SQT");
  });

  describe("Transfer Token", function () {
    it("Testing for transfer", async function () {
      await hardhatToken.transfer(addr1.address, 100);
      const initialOwnerBalance = await hardhatToken.balanceOf(addr1.address);
      expect(initialOwnerBalance).to.equal(100);
    });

    it("Testing for transfe with another address", async function () {
      await hardhatToken.transfer(addr2.address, 10000);
      const initialOwnerBalance = await hardhatToken.balanceOf(addr2.address);
      expect(initialOwnerBalance).to.equal(10000);
    });
  });

  describe("Approving Token", function () {
    beforeEach(async function () {
      result = await hardhatToken.approve(addr2.address, amount, {
        from: owner.address,
      });
    });

    describe("success", () => {
      it("allocate an allowance for delegated token", async function () {
        const allowance = await hardhatToken.allowance(
          owner.address,
          addr2.address
        );
        expect(allowance.toString()).to.equal(amount.toString());
      });

      it("emit approval ", async () => {
        expect(result.from.toString()).to.equal(
          owner.address,
          "owner is correct"
        );
      });
    });

    describe("Failure", () => {
      it("allocate an allowance for delegated token", async function () {
        const allowance = await hardhatToken.allowance(
          owner.address,
          addr2.address
        );
        expect(allowance.toString()).to.not.equal(1000);
      });
    });
  });
});
