/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface BountyStorageV1Interface extends utils.Interface {
  functions: {
    "bountyClosedTime()": FunctionFragment;
    "bountyCreatedTime()": FunctionFragment;
    "bountyId()": FunctionFragment;
    "closer()": FunctionFragment;
    "closerData()": FunctionFragment;
    "depositTime(bytes32)": FunctionFragment;
    "deposits(uint256)": FunctionFragment;
    "expiration(bytes32)": FunctionFragment;
    "funder(bytes32)": FunctionFragment;
    "getPayoutSchedule()": FunctionFragment;
    "isNFT(bytes32)": FunctionFragment;
    "issuer()": FunctionFragment;
    "nftDepositLimit()": FunctionFragment;
    "nftDeposits(uint256)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "ongoing()": FunctionFragment;
    "openQ()": FunctionFragment;
    "organization()": FunctionFragment;
    "payoutAddress(bytes32)": FunctionFragment;
    "payoutSchedule(uint256)": FunctionFragment;
    "payoutTokenAddress()": FunctionFragment;
    "payoutVolume()": FunctionFragment;
    "refunded(bytes32)": FunctionFragment;
    "status()": FunctionFragment;
    "tiered()": FunctionFragment;
    "tokenAddress(bytes32)": FunctionFragment;
    "tokenId(bytes32)": FunctionFragment;
    "volume(bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "bountyClosedTime"
      | "bountyCreatedTime"
      | "bountyId"
      | "closer"
      | "closerData"
      | "depositTime"
      | "deposits"
      | "expiration"
      | "funder"
      | "getPayoutSchedule"
      | "isNFT"
      | "issuer"
      | "nftDepositLimit"
      | "nftDeposits"
      | "onERC721Received"
      | "ongoing"
      | "openQ"
      | "organization"
      | "payoutAddress"
      | "payoutSchedule"
      | "payoutTokenAddress"
      | "payoutVolume"
      | "refunded"
      | "status"
      | "tiered"
      | "tokenAddress"
      | "tokenId"
      | "volume"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "bountyClosedTime",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "bountyCreatedTime",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "bountyId", values?: undefined): string;
  encodeFunctionData(functionFragment: "closer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "closerData",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositTime",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "deposits",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "expiration",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "funder",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getPayoutSchedule",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isNFT",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "issuer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nftDepositLimit",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nftDeposits",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(functionFragment: "ongoing", values?: undefined): string;
  encodeFunctionData(functionFragment: "openQ", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "organization",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "payoutAddress",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "payoutSchedule",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "payoutTokenAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "payoutVolume",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "refunded",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "status", values?: undefined): string;
  encodeFunctionData(functionFragment: "tiered", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenAddress",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenId",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "volume",
    values: [PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "bountyClosedTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "bountyCreatedTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "bountyId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "closer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "closerData", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositTime",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposits", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "expiration", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "funder", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPayoutSchedule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isNFT", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "issuer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nftDepositLimit",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nftDeposits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ongoing", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "openQ", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "organization",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "payoutAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "payoutSchedule",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "payoutTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "payoutVolume",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "refunded", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "status", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tiered", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "volume", data: BytesLike): Result;

  events: {
    "Initialized(uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface BountyStorageV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BountyStorageV1Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    bountyClosedTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    bountyCreatedTime(overrides?: CallOverrides): Promise<[BigNumber]>;

    bountyId(overrides?: CallOverrides): Promise<[string]>;

    closer(overrides?: CallOverrides): Promise<[string]>;

    closerData(overrides?: CallOverrides): Promise<[string]>;

    depositTime(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    deposits(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    expiration(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    funder(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getPayoutSchedule(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    isNFT(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    issuer(overrides?: CallOverrides): Promise<[string]>;

    nftDepositLimit(overrides?: CallOverrides): Promise<[BigNumber]>;

    nftDeposits(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    onERC721Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    ongoing(overrides?: CallOverrides): Promise<[boolean]>;

    openQ(overrides?: CallOverrides): Promise<[string]>;

    organization(overrides?: CallOverrides): Promise<[string]>;

    payoutAddress(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    payoutSchedule(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    payoutTokenAddress(overrides?: CallOverrides): Promise<[string]>;

    payoutVolume(overrides?: CallOverrides): Promise<[BigNumber]>;

    refunded(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    status(overrides?: CallOverrides): Promise<[BigNumber]>;

    tiered(overrides?: CallOverrides): Promise<[boolean]>;

    tokenAddress(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    tokenId(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    volume(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  bountyClosedTime(overrides?: CallOverrides): Promise<BigNumber>;

  bountyCreatedTime(overrides?: CallOverrides): Promise<BigNumber>;

  bountyId(overrides?: CallOverrides): Promise<string>;

  closer(overrides?: CallOverrides): Promise<string>;

  closerData(overrides?: CallOverrides): Promise<string>;

  depositTime(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  deposits(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  expiration(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  funder(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getPayoutSchedule(overrides?: CallOverrides): Promise<BigNumber[]>;

  isNFT(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  issuer(overrides?: CallOverrides): Promise<string>;

  nftDepositLimit(overrides?: CallOverrides): Promise<BigNumber>;

  nftDeposits(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  onERC721Received(
    operator: PromiseOrValue<string>,
    from: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    data: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  ongoing(overrides?: CallOverrides): Promise<boolean>;

  openQ(overrides?: CallOverrides): Promise<string>;

  organization(overrides?: CallOverrides): Promise<string>;

  payoutAddress(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  payoutSchedule(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  payoutTokenAddress(overrides?: CallOverrides): Promise<string>;

  payoutVolume(overrides?: CallOverrides): Promise<BigNumber>;

  refunded(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  status(overrides?: CallOverrides): Promise<BigNumber>;

  tiered(overrides?: CallOverrides): Promise<boolean>;

  tokenAddress(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  tokenId(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  volume(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    bountyClosedTime(overrides?: CallOverrides): Promise<BigNumber>;

    bountyCreatedTime(overrides?: CallOverrides): Promise<BigNumber>;

    bountyId(overrides?: CallOverrides): Promise<string>;

    closer(overrides?: CallOverrides): Promise<string>;

    closerData(overrides?: CallOverrides): Promise<string>;

    depositTime(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deposits(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    expiration(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    funder(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getPayoutSchedule(overrides?: CallOverrides): Promise<BigNumber[]>;

    isNFT(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    issuer(overrides?: CallOverrides): Promise<string>;

    nftDepositLimit(overrides?: CallOverrides): Promise<BigNumber>;

    nftDeposits(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC721Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    ongoing(overrides?: CallOverrides): Promise<boolean>;

    openQ(overrides?: CallOverrides): Promise<string>;

    organization(overrides?: CallOverrides): Promise<string>;

    payoutAddress(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    payoutSchedule(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    payoutTokenAddress(overrides?: CallOverrides): Promise<string>;

    payoutVolume(overrides?: CallOverrides): Promise<BigNumber>;

    refunded(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    status(overrides?: CallOverrides): Promise<BigNumber>;

    tiered(overrides?: CallOverrides): Promise<boolean>;

    tokenAddress(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    tokenId(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    volume(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;
  };

  estimateGas: {
    bountyClosedTime(overrides?: CallOverrides): Promise<BigNumber>;

    bountyCreatedTime(overrides?: CallOverrides): Promise<BigNumber>;

    bountyId(overrides?: CallOverrides): Promise<BigNumber>;

    closer(overrides?: CallOverrides): Promise<BigNumber>;

    closerData(overrides?: CallOverrides): Promise<BigNumber>;

    depositTime(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deposits(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    expiration(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    funder(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPayoutSchedule(overrides?: CallOverrides): Promise<BigNumber>;

    isNFT(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    issuer(overrides?: CallOverrides): Promise<BigNumber>;

    nftDepositLimit(overrides?: CallOverrides): Promise<BigNumber>;

    nftDeposits(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onERC721Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    ongoing(overrides?: CallOverrides): Promise<BigNumber>;

    openQ(overrides?: CallOverrides): Promise<BigNumber>;

    organization(overrides?: CallOverrides): Promise<BigNumber>;

    payoutAddress(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    payoutSchedule(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    payoutTokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    payoutVolume(overrides?: CallOverrides): Promise<BigNumber>;

    refunded(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    status(overrides?: CallOverrides): Promise<BigNumber>;

    tiered(overrides?: CallOverrides): Promise<BigNumber>;

    tokenAddress(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenId(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    volume(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bountyClosedTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bountyCreatedTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bountyId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    closer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    closerData(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    depositTime(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deposits(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    expiration(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    funder(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPayoutSchedule(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isNFT(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    issuer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nftDepositLimit(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nftDeposits(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      operator: PromiseOrValue<string>,
      from: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      data: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    ongoing(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    openQ(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    organization(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    payoutAddress(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    payoutSchedule(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    payoutTokenAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    payoutVolume(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    refunded(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    status(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tiered(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenAddress(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenId(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    volume(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
