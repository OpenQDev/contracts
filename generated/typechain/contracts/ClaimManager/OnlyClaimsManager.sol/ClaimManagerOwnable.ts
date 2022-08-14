/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
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

export interface ClaimManagerOwnableInterface extends utils.Interface {
  functions: {
    "claimManager()": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "claimManager"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "claimManager",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "claimManager",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "OracleTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OracleTransferred"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OracleTransferredEventObject {
  previousClaimManager: string;
  newClaimManager: string;
}
export type OracleTransferredEvent = TypedEvent<
  [string, string],
  OracleTransferredEventObject
>;

export type OracleTransferredEventFilter =
  TypedEventFilter<OracleTransferredEvent>;

export interface ClaimManagerOwnable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ClaimManagerOwnableInterface;

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
    claimManager(overrides?: CallOverrides): Promise<[string]>;
  };

  claimManager(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    claimManager(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "OracleTransferred(address,address)"(
      previousClaimManager?: PromiseOrValue<string> | null,
      newClaimManager?: PromiseOrValue<string> | null
    ): OracleTransferredEventFilter;
    OracleTransferred(
      previousClaimManager?: PromiseOrValue<string> | null,
      newClaimManager?: PromiseOrValue<string> | null
    ): OracleTransferredEventFilter;
  };

  estimateGas: {
    claimManager(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    claimManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
