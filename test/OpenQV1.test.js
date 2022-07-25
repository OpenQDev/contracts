/* eslint-disable */
require('@nomiclabs/hardhat-waffle');
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { BigNumber } = require('@ethersproject/bignumber');
const { expect } = require('chai');
const truffleAssert = require('truffle-assertions');
const { ethers } = require("hardhat");
const { generateDepositId } = require('./utils');
const { messagePrefix } = require('@ethersproject/hash');

describe.only('OpenQV1.sol', () => {
	let openQProxy;
	let openQImplementation;
	let owner;
	let mockLink;
	let mockDai;
	let blacklistedMockDai;
	let mockNft;
	let openQTokenWhitelist;
	let bountyId = 'mockIssueId';
	let mockOrg = 'mock-org';
	let abiEncodedCloserUrl;
	let oracle;

	let bountyInitOperation;
	let ongoingBountyInitOperation;
	let tieredBountyInitOperation;
	let fundingGoalBountyInitOperation;

	let abiCoder;

	beforeEach(async () => {
		const OpenQImplementation = await ethers.getContractFactory('OpenQV1');
		const OpenQProxy = await ethers.getContractFactory('OpenQProxy');
		const MockLink = await ethers.getContractFactory('MockLink');
		const MockDai = await ethers.getContractFactory('MockDai');
		const MockNft = await ethers.getContractFactory('MockNft');
		const OpenQTokenWhitelist = await ethers.getContractFactory('OpenQTokenWhitelist');

		const BountyFactory = await ethers.getContractFactory('BountyFactory');
		const BountyBeacon = await ethers.getContractFactory('BountyBeacon');
		const BountyV1 = await ethers.getContractFactory('BountyV1');

		[owner, , oracle] = await ethers.getSigners();

		openQImplementation = await OpenQImplementation.deploy();
		await openQImplementation.deployed();

		openQProxy = await OpenQProxy.deploy(openQImplementation.address, []);
		await openQProxy.deployed();

		// Attach the OpenQV1 ABI to the OpenQProxy address to send method calls to the delegatecall
		openQProxy = await OpenQImplementation.attach(openQProxy.address);

		await openQProxy.initialize(oracle.address);

		mockLink = await MockLink.deploy();
		await mockLink.deployed();

		mockDai = await MockDai.deploy();
		await mockDai.deployed();

		blacklistedMockDai = await MockDai.deploy();
		await blacklistedMockDai.deployed();

		mockNft = await MockNft.deploy();
		await mockNft.deployed();

		openQTokenWhitelist = await OpenQTokenWhitelist.deploy(5);
		await openQTokenWhitelist.deployed();

		await openQTokenWhitelist.addToken(mockLink.address);
		await openQTokenWhitelist.addToken(mockDai.address);
		await openQTokenWhitelist.addToken(ethers.constants.AddressZero);
		await openQTokenWhitelist.addToken(mockNft.address);

		await mockNft.safeMint(owner.address);
		await mockNft.safeMint(owner.address);
		await mockNft.safeMint(owner.address);

		const bountyV1 = await BountyV1.deploy();
		await bountyV1.deployed();

		const beacon = await BountyBeacon.deploy(bountyV1.address);
		await beacon.deployed();

		bountyFactory = await BountyFactory.deploy(openQProxy.address, beacon.address);
		await bountyFactory.deployed();

		await openQProxy.setBountyFactory(bountyFactory.address);
		await openQProxy.transferOracle(oracle.address);
		await openQProxy.setTokenWhitelist(openQTokenWhitelist.address);

		bountyInitOperation = [0, []];

		abiCoder = new ethers.utils.AbiCoder;

		const abiEncodedParams = abiCoder.encode(["address", "uint256"], [mockLink.address, '100']);
		ongoingBountyInitOperation = [1, abiEncodedParams];

		const tieredAbiEncodedParams = abiCoder.encode(["uint256[]"], [[60, 30, 10]]);
		tieredBountyInitOperation = [2, tieredAbiEncodedParams];

		const fundingGoalBountyParams = abiCoder.encode(["address", "uint256"], [mockLink.address, 1000]);
		fundingGoalBountyInitOperation = [3, fundingGoalBountyParams];

		abiEncodedCloserUrl = abiCoder.encode(["string"], ["https://github.com/OpenQDev/OpenQ-Frontend/pull/398"]);
	});

	describe('initialization', () => {
		it('should initialize with correct fields', async () => {
			expect(await openQProxy.owner()).equals('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
			expect(await openQProxy.oracle()).equals('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
		});

		it('should only be initialized once', async () => {
			await expect(openQProxy.initialize(oracle.address)).to.be.revertedWith('Initializable: contract is already initialized');
		});
	});

	describe('mintBounty', () => {
		it('should deploy a new bounty contract with expected initial metadata', async () => {
			// ARRANGE
			const expectedTimestamp = await setNextBlockTimestamp();

			// ACT
			await openQProxy.mintBounty(bountyId, mockOrg, ongoingBountyInitOperation);

			const bountyIsOpen = await openQProxy.bountyIsOpen(bountyId);
			const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

			const Bounty = await ethers.getContractFactory('BountyV1');

			const newBounty = await Bounty.attach(
				bountyAddress
			);

			const newBountyId = await newBounty.bountyId();
			const bountyCreatedTime = (await newBounty.bountyCreatedTime()).toNumber();
			const bountyClosedTime = await newBounty.bountyClosedTime();
			const issuer = await newBounty.issuer();
			const closer = await newBounty.closer();
			const status = await newBounty.status();
			const bountyType = await newBounty.class();
			const payoutVolume = await newBounty.payoutVolume();
			const payoutTokenAddress = await newBounty.payoutTokenAddress();

			// ASSERT
			expect(bountyId).to.equal(newBountyId);
			expect(bountyCreatedTime).to.equal(expectedTimestamp);
			expect(bountyClosedTime).to.equal(0);
			expect(issuer).to.equal(owner.address);
			expect(closer).to.equal(ethers.constants.AddressZero);
			expect(status).to.equal(0);
			expect(bountyType).to.equal(1);
			expect(payoutVolume).to.equal(100);
			expect(payoutTokenAddress).to.equal(mockLink.address);
		});

		describe('ONGOING', () => {
			it('should correctly init class', async () => {
				// ARRANGE
				const expectedTimestamp = await setNextBlockTimestamp();

				// ACT
				await openQProxy.mintBounty(bountyId, mockOrg, ongoingBountyInitOperation);

				const bountyIsOpen = await openQProxy.bountyIsOpen(bountyId);
				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

				const Bounty = await ethers.getContractFactory('BountyV1');

				const newBounty = await Bounty.attach(
					bountyAddress
				);

				const newBountyId = await newBounty.bountyId();
				const bountyCreatedTime = (await newBounty.bountyCreatedTime()).toNumber();
				const bountyClosedTime = await newBounty.bountyClosedTime();
				const issuer = await newBounty.issuer();
				const closer = await newBounty.closer();
				const status = await newBounty.status();
				const bountyType = await newBounty.class();
				const payoutVolume = await newBounty.payoutVolume();
				const payoutTokenAddress = await newBounty.payoutTokenAddress();

				// ASSERT
				expect(bountyId).to.equal(newBountyId);
				expect(bountyCreatedTime).to.equal(expectedTimestamp);
				expect(bountyClosedTime).to.equal(0);
				expect(issuer).to.equal(owner.address);
				expect(closer).to.equal(ethers.constants.AddressZero);
				expect(status).to.equal(0);
				expect(bountyType).to.equal(1);
				expect(payoutVolume).to.equal(100);
				expect(payoutTokenAddress).to.equal(mockLink.address);
			});
		});

		it('should revert if bounty already exists', async () => {
			// ARRANGE
			// ACT
			await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

			// ASSERT
			await expect(openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation)).to.be.revertedWith('BOUNTY_ALREADY_EXISTS');
		});

		// it('should mint and fund if initial deposit is wanted', async () => {
		// 	// ARRANGE
		// 	// ACT
		// 	const abiEncodedParamsWithDeposit = abiCoder.encode(["address", "uint256", "uint256"], [mockLink.address, 100, 1]);
		// 	const bountyInitOperationWithDeposit = [4, abiEncodedParamsWithDeposit];
		// 	await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperationWithDeposit);

		// 	const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

		// 	// ASSERT
		// 	const initialFunderMockLinkBalance = (await mockLink.balanceOf(bountyAddress.address)).toString();
		// 	expect(initialFunderMockLinkBalance).to.equal('100');
		// });

		it('should store bountyId to bountyAddress', async () => {
			// ACT
			await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

			const bountyIsOpen = await openQProxy.bountyIsOpen(bountyId);
			const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

			const Bounty = await ethers.getContractFactory('BountyV1');

			const newBounty = await Bounty.attach(
				bountyAddress
			);

			const newBountyId = await newBounty.bountyId();

			const bountyIdFromAddress = await openQProxy.bountyAddressToBountyId(bountyAddress);
			expect(bountyIdFromAddress).to.equal(newBountyId);

			const bountyAddressFromId = await openQProxy.bountyIdToAddress(newBountyId);
			expect(bountyAddressFromId).to.equal(bountyAddress);
		});

		it.only('should emit a BountyCreated event with expected bounty id, issuer address, bounty address, bountyMintTime, class, and data', async () => {
			// ARRANGE
			const mockOrg = "OpenQDev";
			const expectedBountyAddress = await openQProxy.bountyIdToAddress(bountyId);

			let expectedTimestamp = await setNextBlockTimestamp();

			// ACT
			// ASSERT

			// SINGLE
			let txnSingle;
			await expect(txnSingle = await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation))
				.to.emit(openQProxy, 'BountyCreated')
				.withArgs(bountyId, mockOrg, owner.address, anyValue, expectedTimestamp, 0, []);
			txnReceipt = await txnSingle.wait(); // 0ms, as tx is already confirmed
			event = txnReceipt.events.find(event => event.event === 'BountyCreated');
			[bountyAddress] = event.args;
			expect(bountyAddress).to.not.equal(ethers.constants.AddressZero);

			// // ONGOING
			let txnOngoing;
			expectedTimestamp = await setNextBlockTimestamp();
			await expect(txnOngoing = await openQProxy.mintBounty('ongoingBountyId', mockOrg, ongoingBountyInitOperation))
				.to.emit(openQProxy, 'BountyCreated')
				.withArgs('ongoingBountyId', mockOrg, owner.address, anyValue, expectedTimestamp, 1, []);
			txnReceipt = await txnOngoing.wait(); // 0ms, as tx is already confirmed
			event = txnReceipt.events.find(event => event.event === 'BountyCreated');
			[bountyAddress] = event.args;
			expect(bountyAddress).to.not.equal(ethers.constants.AddressZero);

			// // TIERED
			let txnTiered;
			expectedTimestamp = await setNextBlockTimestamp();
			await expect(txnTiered = await openQProxy.mintBounty('tieredBountyId', mockOrg, tieredBountyInitOperation))
				.to.emit(openQProxy, 'BountyCreated')
				.withArgs('tieredBountyId', mockOrg, owner.address, anyValue, expectedTimestamp, 2, []);
			txnReceipt = await txnTiered.wait(); // 0ms, as tx is already confirmed
			event = txnReceipt.events.find(event => event.event === 'BountyCreated');
			[bountyAddress] = event.args;
			expect(bountyAddress).to.not.equal(ethers.constants.AddressZero);

			// FUNDRAISING GOAL
			let txnFundingGoal;
			expectedTimestamp = await setNextBlockTimestamp();
			await expect(openQProxy.mintBounty('fundingGoalId', mockOrg, fundingGoalBountyInitOperation))
				.to.emit(openQProxy, 'BountyCreated')
				.withArgs('fundingGoalId', mockOrg, owner.address, anyValue, expectedTimestamp, 3, fundingGoalBountyInitOperation[1]);
		});
	});

	describe('fundBounty', () => {
		it('should revert if bounty is already closed', async () => {
			// ARRANGE
			await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

			const oracleContract = openQProxy.connect(oracle);
			await oracleContract.claimBounty(bountyId, owner.address, abiEncodedCloserUrl);

			const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

			await mockLink.approve(bountyAddress, 10000000);
			await mockDai.approve(bountyAddress, 10000000);

			// ACT + ASSERT
			await expect(openQProxy.fundBountyToken(bountyId, mockLink.address, 10000000, 1)).to.be.revertedWith('FUNDING_CLOSED_BOUNTY');
		});

		it('should revert if funded with a non-whitelisted token and bounty is at funded token address capacity', async () => {
			// ARRANGE
			await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

			const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

			await blacklistedMockDai.approve(bountyAddress, 10000000);
			await mockLink.approve(bountyAddress, 10000000);

			// set lower capacity for token
			await openQTokenWhitelist.setTokenAddressLimit(1);

			await openQProxy.fundBountyToken(bountyId, mockLink.address, 10000000, 1);

			// ACT + ASSERT
			await expect(openQProxy.fundBountyToken(bountyId, blacklistedMockDai.address, 10000000, 1)).to.be.revertedWith('TOO_MANY_TOKEN_ADDRESSES');
		});

		it('should ALLOW funding with whitelisted token EVEN IF bounty is at funded token address capacity', async () => {
			// ARRANGE
			await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

			const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

			await mockDai.approve(bountyAddress, 10000000);
			await mockLink.approve(bountyAddress, 10000000);

			// set lower capacity for token
			await openQTokenWhitelist.setTokenAddressLimit(1);

			await openQProxy.fundBountyToken(bountyId, mockLink.address, 10000000, 1);

			// ACT + ASSERT
			await expect(openQProxy.fundBountyToken(bountyId, mockDai.address, 10000000, 1)).to.not.be.revertedWith('TOO_MANY_TOKEN_ADDRESSES');
		});

		it('should set funder to msg.sender', async () => {
			// ARRANGE
			await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
			const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);
			const Bounty = await ethers.getContractFactory('BountyV1');
			const bounty = await Bounty.attach(bountyAddress);

			// ACT
			await mockLink.approve(bountyAddress, 10000000);
			openQProxy.fundBountyToken(bountyId, mockLink.address, 100, 1);

			const depositId = generateDepositId(bountyId, 0);

			// ASSERT
			expect(await bounty.funder(depositId)).to.equal(owner.address);
		});

		it('should deposit the correct amount from sender to bounty', async () => {
			// ARRANGE
			await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
			const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);
			const Bounty = await ethers.getContractFactory('BountyV1');
			const bounty = await Bounty.attach(bountyAddress);

			// ASSUME
			const initialFunderMockLinkBalance = (await mockDai.balanceOf(owner.address)).toString();
			const initialFunderMockDaiBalance = (await mockLink.balanceOf(owner.address)).toString();
			expect(initialFunderMockLinkBalance).to.equal('10000000000000000000000');
			expect(initialFunderMockDaiBalance).to.equal('10000000000000000000000');

			const initialIssueMockLinkBalance = (await mockLink.balanceOf(bounty.address)).toString();
			const initialIssueMockDaiBalance = (await mockDai.balanceOf(bounty.address)).toString();
			expect(initialIssueMockLinkBalance).to.equal('0');
			expect(initialIssueMockDaiBalance).to.equal('0');

			// ARRANGE
			await mockLink.approve(bounty.address, 10000000);
			await mockDai.approve(bounty.address, 10000000);

			// ACT
			const value = 100;
			await openQProxy.fundBountyToken(bountyId, mockLink.address, value, 1);
			await openQProxy.fundBountyToken(bountyId, mockDai.address, value, 1);

			// // ASSERT
			const funderMockLinkBalance = (await mockDai.balanceOf(owner.address)).toString();
			const funderFakeTokenBalance = (await mockLink.balanceOf(owner.address)).toString();
			expect(funderMockLinkBalance).to.equal('9999999999999999999900');
			expect(funderFakeTokenBalance).to.equal('9999999999999999999900');

			const bountyMockTokenBalance = (await mockLink.balanceOf(bounty.address)).toString();
			const bountyFakeTokenBalance = (await mockDai.balanceOf(bounty.address)).toString();
			expect(bountyMockTokenBalance).to.equal('100');
			expect(bountyFakeTokenBalance).to.equal('100');
		});

		it('should transfer NFT from sender to bounty', async () => {
			// ARRANGE
			await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
			const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);
			await mockNft.approve(bountyAddress, 1);

			// ASSUME
			expect(await mockNft.ownerOf(1)).to.equal(owner.address);

			// ACT
			await openQProxy.fundBountyNFT(bountyId, mockNft.address, 1, 1);

			// ASSERT
			expect(await mockNft.ownerOf(1)).to.equal(bountyAddress);
		});

		it('should emit a DepositReceived event with expected bountyId, bounty address, token address, funder, volume, timestamp, depositId, tokenStandard, tokenId, class and data', async () => {
			// ARRANGE
			await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

			const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

			await mockLink.approve(bountyAddress, 10000000);

			const Bounty = await ethers.getContractFactory('BountyV1');

			const bounty = await Bounty.attach(
				bountyAddress
			);

			const depositId = generateDepositId(bountyId, 0);
			const expectedTimestamp = await setNextBlockTimestamp();

			// ACT
			// ASSERT
			await expect(openQProxy.fundBountyToken(bountyId, mockLink.address, 100, 1))
				.to.emit(openQProxy, 'TokenDepositReceived')
				.withArgs(depositId, bountyAddress, bountyId, mockOrg, mockLink.address, expectedTimestamp, owner.address, 1, 100, 0, []);
		});
	});

	describe('claimBounty', () => {
		describe('require and revert', () => {
			it('should revert if not called by OpenQ Oracle', async () => {
				// ASSERT
				await expect(openQProxy.claimBounty(bountyId, owner.address, abiEncodedCloserUrl)).to.be.revertedWith('Oraclize: caller is not the current OpenQ Oracle');
			});

			it('should revert if bounty is already closed', async () => {
				// ARRANGE
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
				const oracleContract = openQProxy.connect(oracle);
				await oracleContract.claimBounty(bountyId, owner.address, abiEncodedCloserUrl);
				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

				// ASSERT
				await expect(oracleContract.claimBounty(bountyId, owner.address, abiEncodedCloserUrl)).to.be.revertedWith('CLAIMING_CLOSED_BOUNTY');
			});
		});

		describe('bounty updates after claim', () => {
			it('should close issue after successful claim', async () => {
				// ARRANGE
				// ASSUME
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

				const openBounty = await openQProxy.bountyIsOpen(bountyId);
				expect(openBounty).to.equal(true);

				// ACT
				const oracleContract = openQProxy.connect(oracle);
				await oracleContract.claimBounty(bountyId, owner.address, abiEncodedCloserUrl);

				// ASSERT
				const closedBounty = await openQProxy.bountyIsOpen(bountyId);
				expect(closedBounty).to.equal(false);
			});

			it('should set closer to the claimer address', async () => {
				// ARRANGE
				// ASSUME
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

				const Bounty = await ethers.getContractFactory('BountyV1');

				const newBounty = await Bounty.attach(
					bountyAddress
				);

				const closer = await newBounty.closer();
				expect(closer).to.equal(ethers.constants.AddressZero);

				// ACT
				const oracleContract = openQProxy.connect(oracle);
				await oracleContract.claimBounty(bountyId, owner.address, abiEncodedCloserUrl);

				// ASSERT
				const newCloser = await newBounty.closer();
				expect(newCloser).to.equal(owner.address);
			});

			it('should set close time correctly', async () => {
				// ARRANGE
				// ASSUME
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

				const Bounty = await ethers.getContractFactory('BountyV1');

				const newBounty = await Bounty.attach(
					bountyAddress
				);

				const expectedTimestamp = await setNextBlockTimestamp();

				// ASSUME
				const bountyClosedTime = await newBounty.bountyClosedTime();
				expect(bountyClosedTime).to.equal(0);

				const closer = await newBounty.closer();
				expect(closer).to.equal(ethers.constants.AddressZero);

				// ACT
				const oracleContract = openQProxy.connect(oracle);
				await oracleContract.claimBounty(bountyId, owner.address, abiEncodedCloserUrl);

				// ASSERT
				const newCloser = await newBounty.closer();
				expect(newCloser).to.equal(owner.address);
			});
		});

		describe('transfer', () => {
			describe('SINGLE', () => {
				it('should transfer all assets from bounty contract to claimer', async () => {
					// ARRANGE
					const volume = 100;
					await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

					const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

					await mockLink.approve(bountyAddress, 10000000);
					await mockDai.approve(bountyAddress, 10000000);

					await openQProxy.fundBountyToken(bountyId, mockLink.address, volume, 1);
					await openQProxy.fundBountyToken(bountyId, mockDai.address, volume, 1);
					await openQProxy.fundBountyToken(bountyId, ethers.constants.AddressZero, volume, 1, { value: volume });

					const [, claimer] = await ethers.getSigners();

					// ASSUME
					const bountyMockLinkTokenBalance = (await mockLink.balanceOf(bountyAddress)).toString();
					const bountyDaiTokenBalance = (await mockDai.balanceOf(bountyAddress)).toString();
					const bountyProtcolTokenBalance = (await ethers.provider.getBalance(bountyAddress)).toString();
					expect(bountyMockLinkTokenBalance).to.equal('100');
					expect(bountyDaiTokenBalance).to.equal('100');
					expect(bountyProtcolTokenBalance).to.equal('100');

					const claimerMockTokenBalance = (await mockLink.balanceOf(claimer.address)).toString();
					const claimerFakeTokenBalance = (await mockDai.balanceOf(claimer.address)).toString();
					expect(claimerMockTokenBalance).to.equal('0');
					expect(claimerFakeTokenBalance).to.equal('0');

					// // // ACT
					const oracleContract = openQProxy.connect(oracle);
					await oracleContract.claimBounty(bountyId, claimer.address, abiEncodedCloserUrl);

					// // ASSERT
					const newBountyMockTokenBalance = (await mockLink.balanceOf(bountyAddress)).toString();
					const newBountyFakeTokenBalance = (await mockDai.balanceOf(bountyAddress)).toString();
					const newBountyProtocolTokenBalance = (await ethers.provider.getBalance(bountyAddress)).toString();
					expect(newBountyMockTokenBalance).to.equal('0');
					expect(newBountyFakeTokenBalance).to.equal('0');
					expect(newBountyProtocolTokenBalance).to.equal('0');

					const newClaimerMockTokenBalance = (await mockLink.balanceOf(claimer.address)).toString();
					const newClaimerFakeTokenBalance = (await mockDai.balanceOf(claimer.address)).toString();
					expect(newClaimerMockTokenBalance).to.equal('100');
					expect(newClaimerFakeTokenBalance).to.equal('100');
				});

				it('should transfer all NFT assets from bounty contract to claimer', async () => {
					// ASSUME
					expect(await mockNft.ownerOf(1)).to.equal(owner.address);

					// ARRANGE
					await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
					const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

					// ACT
					const oracleContract = openQProxy.connect(oracle);
					await oracleContract.claimBounty(bountyId, owner.address, abiEncodedCloserUrl);

					// ASSERT
					expect(await mockNft.ownerOf(1)).to.equal(owner.address);
				});
			});

			describe('ONGOING claim', () => {
				it('should transfer payoutAmount from bounty pool to claimant', async () => {
					// ARRANGE
					const volume = 1000;
					const expectedTimestamp = await setNextBlockTimestamp();

					await openQProxy.mintBounty(bountyId, mockOrg, ongoingBountyInitOperation);

					const bountyIsOpen = await openQProxy.bountyIsOpen(bountyId);
					const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

					const Bounty = await ethers.getContractFactory('BountyV1');

					const newBounty = await Bounty.attach(
						bountyAddress
					);

					await mockLink.approve(bountyAddress, 10000000);

					await openQProxy.fundBountyToken(bountyId, mockLink.address, volume, 1);

					// ACT
					const oracleContract = openQProxy.connect(oracle);
					await oracleContract.claimBounty(bountyId, owner.address, abiEncodedCloserUrl);

					// ASSERT
					const newBountyMockTokenBalance = (await mockLink.balanceOf(bountyAddress)).toString();
					expect(newBountyMockTokenBalance).to.equal('900');

					const newClaimerMockTokenBalance = (await mockLink.balanceOf(claimer.address)).toString();
					expect(newClaimerMockTokenBalance).to.equal('100');
				});
			});
		});

		describe('Event Emissions', () => {
			it('should emit a BountyClosed event with correct parameters', async () => {
				// ARRANGE
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);
				const expectedTimestamp = await setNextBlockTimestamp();

				// ACT
				// ASSERT
				const oracleContract = openQProxy.connect(oracle);
				await expect(oracleContract.claimBounty(bountyId, owner.address, abiEncodedCloserUrl))
					.to.emit(openQProxy, 'BountyClosed')
					.withArgs(bountyId, bountyAddress, mockOrg, owner.address, expectedTimestamp, 0, abiEncodedCloserUrl);
			});

			it('should emit a TokenBalanceClaimed event with correct parameters', async () => {
				// ARRANGE
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

				const volume = 100;

				await mockLink.approve(bountyAddress, 10000000);
				await mockDai.approve(bountyAddress, 10000000);
				await openQProxy.fundBountyToken(bountyId, mockLink.address, volume, 1);
				await openQProxy.fundBountyToken(bountyId, ethers.constants.AddressZero, volume, 1, { value: volume });

				const expectedTimestamp = await setNextBlockTimestamp();
				// ACT
				// ASSERT
				const oracleContract = openQProxy.connect(oracle);
				await expect(oracleContract.claimBounty(bountyId, owner.address, abiEncodedCloserUrl))
					.to.emit(openQProxy, 'TokenBalanceClaimed')
					.withArgs(bountyId, bountyAddress, mockOrg, owner.address, expectedTimestamp, mockLink.address, volume, 0, abiEncodedCloserUrl)
					.withArgs(bountyId, bountyAddress, mockOrg, owner.address, expectedTimestamp, mockDai.address, volume, 0, abiEncodedCloserUrl)
					.withArgs(bountyId, bountyAddress, mockOrg, owner.address, expectedTimestamp, ethers.constants.AddressZero, volume, 0, abiEncodedCloserUrl);
			});
		});

		describe('Ongoing Bounties', () => {
			it('should transfer payoutVolume of payoutTokenAddress from bounty to claimant', async () => {
				// ARRANGE
				const volume = 100;
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

				await mockLink.approve(bountyAddress, 10000000);

				await openQProxy.fundBountyToken(bountyId, mockLink.address, volume, 1);

				const [, claimer] = await ethers.getSigners();

				// ASSUME
				const bountyMockLinkTokenBalance = (await mockLink.balanceOf(bountyAddress)).toString();
				expect(bountyMockLinkTokenBalance).to.equal('100');

				const claimerMockTokenBalance = (await mockLink.balanceOf(claimer.address)).toString();
				expect(claimerMockTokenBalance).to.equal('0');

				// // // ACT
				const oracleContract = openQProxy.connect(oracle);
				await oracleContract.claimBounty(bountyId, claimer.address, abiEncodedCloserUrl);

				// // ASSERT
				const newBountyMockTokenBalance = (await mockLink.balanceOf(bountyAddress)).toString();
				expect(newBountyMockTokenBalance).to.equal('0');

				const newClaimerMockTokenBalance = (await mockLink.balanceOf(claimer.address)).toString();
				expect(newClaimerMockTokenBalance).to.equal('100');
			});
		});
	});

	describe('refundDeposits', () => {
		describe('Event Emissions', () => {
			it('should emit DepositRefunded event for refunded deposit', async () => {
				// ARRANGE
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);
				const Bounty = await ethers.getContractFactory('BountyV1');
				const bounty = await Bounty.attach(bountyAddress);

				await mockLink.approve(bountyAddress, 10000000);

				const volume = 100;
				const depositedTimestamp = await setNextBlockTimestamp();
				const tokenDepositId = generateDepositId(bountyId, 0);
				await openQProxy.fundBountyToken(bountyId, mockLink.address, volume, 1);

				const protocolDepositId = generateDepositId(bountyId, 1);
				await openQProxy.fundBountyToken(bountyId, ethers.constants.AddressZero, volume, 1, { value: volume });

				const expectedTimestamp = await setNextBlockTimestamp(2764800);

				// ACT
				// ASSERT
				await expect(openQProxy.refundDeposit(bountyId, protocolDepositId))
					.to.emit(openQProxy, 'DepositRefunded')
					.withArgs(protocolDepositId, bountyId, bountyAddress, mockOrg, expectedTimestamp, ethers.constants.AddressZero, volume, 0, []);

				const secondExpectedTimestamp = await setNextBlockTimestamp(2764810);

				await expect(openQProxy.refundDeposit(bountyId, tokenDepositId))
					.to.emit(openQProxy, 'DepositRefunded')
					.withArgs(tokenDepositId, bountyId, bountyAddress, mockOrg, secondExpectedTimestamp, mockLink.address, volume, 0, []);
			});
		});

		describe('requires and reverts', () => {
			it('should revert if attempt to withdraw too early', async () => {
				// Mint Bounty
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

				// Get Escrow Period
				const BountyV1 = await ethers.getContractFactory('BountyV1');
				bounty = await BountyV1.attach(bountyAddress);

				// Fund Bounty
				await mockDai.approve(bountyAddress, 100000);

				const depositId = generateDepositId(bountyId, 0);
				await openQProxy.fundBountyToken(bountyId, mockDai.address, 100000, 276000);

				// ACT / ASSERT
				await expect(openQProxy.refundDeposit(bountyId, depositId)).to.be.revertedWith('PREMATURE_REFUND_REQUEST');
			});

			it('should revert if not funder', async () => {
				// ARRANGE
				// Mint Bounty
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

				// Get Escrow Period
				const BountyV1 = await ethers.getContractFactory('BountyV1');
				bounty = await BountyV1.attach(bountyAddress);

				const expectedTimestamp = await setNextBlockTimestamp();
				const depositId = generateDepositId(bountyId, 0);

				const escrowPeriod = await bounty.expiration(depositId);

				// ADVANCE TIME
				const thirtyTwoDays = 2765000;
				ethers.provider.send("evm_increaseTime", [thirtyTwoDays]);

				// ACT / ASSERT
				await expect(openQProxy.refundDeposit(bountyId, depositId)).to.be.revertedWith('ONLY_FUNDER_CAN_REQUEST_REFUND');
			});

			it('should revert if bounty is closed', async () => {
				// ARRANGE
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
				const oracleContract = openQProxy.connect(oracle);
				await oracleContract.claimBounty(bountyId, owner.address, abiEncodedCloserUrl);

				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);

				const depositId = generateDepositId(bountyId, 0);

				// ACT + ASSERT
				await expect(openQProxy.refundDeposit(bountyId, depositId)).to.be.revertedWith('REFUNDING_CLOSED_BOUNTY');
			});
		});

		describe('transfer', () => {
			it('should transfer refunded deposit volume from bounty contract to funder', async () => {
				// ARRANGE
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);

				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);
				const Bounty = await ethers.getContractFactory('BountyV1');
				const bounty = await Bounty.attach(bountyAddress);

				await mockLink.approve(bountyAddress, 10000000);
				await mockDai.approve(bountyAddress, 10000000);
				const volume = 100;

				const linkDepositId = generateDepositId(bountyId, 0);
				await openQProxy.fundBountyToken(bountyId, mockLink.address, volume, 1);

				const daiDepositId = generateDepositId(bountyId, 1);
				await openQProxy.fundBountyToken(bountyId, mockDai.address, volume, 1);

				const protocolDepositId = generateDepositId(bountyId, 2);
				await openQProxy.fundBountyToken(bountyId, ethers.constants.AddressZero, volume, 1, { value: volume });

				const thirtyTwoDays = 2765000;
				ethers.provider.send("evm_increaseTime", [thirtyTwoDays]);

				// ASSUME
				const bountyMockTokenBalance = (await mockLink.balanceOf(bountyAddress)).toString();
				const bountyFakeTokenBalance = (await mockDai.balanceOf(bountyAddress)).toString();
				const bountyProtocolTokenBalance = (await ethers.provider.getBalance(bountyAddress)).toString();
				expect(bountyMockTokenBalance).to.equal('100');
				expect(bountyFakeTokenBalance).to.equal('100');
				expect(bountyProtocolTokenBalance).to.equal('100');

				const funderMockTokenBalance = (await mockLink.balanceOf(owner.address)).toString();
				const funderFakeTokenBalance = (await mockDai.balanceOf(owner.address)).toString();
				expect(funderMockTokenBalance).to.equal('9999999999999999999900');
				expect(funderFakeTokenBalance).to.equal('9999999999999999999900');

				const newBounty = await Bounty.attach(
					bountyAddress
				);

				// ACT
				await openQProxy.refundDeposit(bountyId, linkDepositId);
				await openQProxy.refundDeposit(bountyId, daiDepositId);
				await openQProxy.refundDeposit(bountyId, protocolDepositId);

				// // ASSERT
				const newBountyMockTokenBalance = (await mockLink.balanceOf(bountyAddress)).toString();
				const newBountyFakeTokenBalance = (await mockDai.balanceOf(bountyAddress)).toString();
				const newBountyProtocolTokenBalance = (await ethers.provider.getBalance(bountyAddress)).toString();
				expect(newBountyMockTokenBalance).to.equal('0');
				expect(newBountyFakeTokenBalance).to.equal('0');
				expect(newBountyProtocolTokenBalance).to.equal('0');

				const newFunderMockTokenBalance = (await mockLink.balanceOf(owner.address)).toString();
				const newFunderFakeTokenBalance = (await mockDai.balanceOf(owner.address)).toString();
				expect(newFunderMockTokenBalance).to.equal('10000000000000000000000');
				expect(newFunderFakeTokenBalance).to.equal('10000000000000000000000');
			});

			it('should transfer NFT from bounty contract to funder', async () => {
				// ASSUME
				expect(await mockNft.ownerOf(1)).to.equal(owner.address);

				// ARRANGE
				await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
				const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);
				const Bounty = await ethers.getContractFactory('BountyV1');
				const bounty = await Bounty.attach(bountyAddress);

				await mockNft.approve(bountyAddress, 1);

				const depositId = generateDepositId(bountyId, 0);
				await openQProxy.fundBountyNFT(bountyId, mockNft.address, 1, 1);

				// ASSUME
				expect(await mockNft.ownerOf(1)).to.equal(bountyAddress);

				// ACT
				await openQProxy.refundDeposit(bountyId, depositId);

				// ASSERT
				expect(await mockNft.ownerOf(1)).to.equal(owner.address);
			});
		});
	});

	describe('extendDeposit', () => {
		it('should extend deposit', async () => {
			// ARRANGE
			await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
			const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);
			const Bounty = await ethers.getContractFactory('BountyV1');
			const bounty = await Bounty.attach(bountyAddress);

			await mockLink.approve(bountyAddress, 10000000);
			await openQProxy.fundBountyToken(bountyId, mockLink.address, 100, 1);

			const depositId = generateDepositId(bountyId, 0);

			// ACT
			await openQProxy.extendDeposit(bountyId, depositId, 1000);

			// ASSERT
			// This will fail to revert without a deposit extension. Cannot test the counter case due to the inability to call refund twice, see DEPOSIT_ALREADY_REFUNDED
			await expect(openQProxy.refundDeposit(bountyId, depositId)).to.be.revertedWith("PREMATURE_REFUND_REQUEST");
		});

		it('should emit DepositExtended event', async () => {
			// ARRANGE
			await openQProxy.mintBounty(bountyId, mockOrg, bountyInitOperation);
			const bountyAddress = await openQProxy.bountyIdToAddress(bountyId);
			const Bounty = await ethers.getContractFactory('BountyV1');
			const bounty = await Bounty.attach(bountyAddress);

			await mockLink.approve(bountyAddress, 10000000);
			await openQProxy.fundBountyToken(bountyId, mockLink.address, 100, 1);

			const depositId = generateDepositId(bountyId, 0);

			// ACT
			await expect(openQProxy.extendDeposit(bountyId, depositId, 1000))
				.to.emit(openQProxy, 'DepositExtended')
				.withArgs(depositId, 1001, 0, []);
		});
	});
});

async function setNextBlockTimestamp(timestamp = 10) {
	return new Promise(async (resolve,) => {
		const blockNumBefore = await ethers.provider.getBlockNumber();
		const blockBefore = await ethers.provider.getBlock(blockNumBefore);
		const timestampBefore = blockBefore.timestamp;
		const expectedTimestamp = timestampBefore + timestamp;
		await network.provider.send("evm_setNextBlockTimestamp", [expectedTimestamp]);
		resolve(expectedTimestamp);
	});
}