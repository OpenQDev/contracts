/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BytesLike,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  BeaconProxy,
  BeaconProxyInterface,
} from "../../../../../@openzeppelin/contracts/proxy/beacon/BeaconProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "beacon",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405260405161098a38038061098a8339810160408190526100229161048b565b61004d60017fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d5161054b565b6000805160206109438339815191521461006957610069610570565b6100758282600061007c565b50506105f0565b61008583610147565b6040516001600160a01b038416907f1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e90600090a26000825111806100c65750805b1561014257610140836001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561010c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101309190610586565b836102d860201b6100291760201c565b505b505050565b61015a8161030460201b6100551760201c565b6101b95760405162461bcd60e51b815260206004820152602560248201527f455243313936373a206e657720626561636f6e206973206e6f74206120636f6e6044820152641d1c9858dd60da1b60648201526084015b60405180910390fd5b61022d816001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021e9190610586565b61030460201b6100551760201c565b6102925760405162461bcd60e51b815260206004820152603060248201527f455243313936373a20626561636f6e20696d706c656d656e746174696f6e206960448201526f1cc81b9bdd08184818dbdb9d1c9858dd60821b60648201526084016101b0565b806102b760008051602061094383398151915260001b61031360201b6100641760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606102fd838360405180606001604052806027815260200161096360279139610316565b9392505050565b6001600160a01b03163b151590565b90565b60606001600160a01b0384163b61037e5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016101b0565b600080856001600160a01b03168560405161039991906105a1565b600060405180830381855af49150503d80600081146103d4576040519150601f19603f3d011682016040523d82523d6000602084013e6103d9565b606091505b5090925090506103ea8282866103f4565b9695505050505050565b606083156104035750816102fd565b8251156104135782518084602001fd5b8160405162461bcd60e51b81526004016101b091906105bd565b80516001600160a01b038116811461044457600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561047a578181015183820152602001610462565b838111156101405750506000910152565b6000806040838503121561049e57600080fd5b6104a78361042d565b60208401519092506001600160401b03808211156104c457600080fd5b818501915085601f8301126104d857600080fd5b8151818111156104ea576104ea610449565b604051601f8201601f19908116603f0116810190838211818310171561051257610512610449565b8160405282815288602084870101111561052b57600080fd5b61053c83602083016020880161045f565b80955050505050509250929050565b60008282101561056b57634e487b7160e01b600052601160045260246000fd5b500390565b634e487b7160e01b600052600160045260246000fd5b60006020828403121561059857600080fd5b6102fd8261042d565b600082516105b381846020870161045f565b9190910192915050565b60208152600082518060208401526105dc81604085016020870161045f565b601f01601f19169190910160400192915050565b610344806105ff6000396000f3fe60806040523661001357610011610017565b005b6100115b610027610022610067565b610100565b565b606061004e83836040518060600160405280602781526020016102e860279139610124565b9392505050565b6001600160a01b03163b151590565b90565b600061009a7fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50546001600160a01b031690565b6001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156100d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100fb919061023f565b905090565b3660008037600080366000845af43d6000803e80801561011f573d6000f35b3d6000fd5b60606001600160a01b0384163b6101915760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084015b60405180910390fd5b600080856001600160a01b0316856040516101ac9190610298565b600060405180830381855af49150503d80600081146101e7576040519150601f19603f3d011682016040523d82523d6000602084013e6101ec565b606091505b50915091506101fc828286610206565b9695505050505050565b6060831561021557508161004e565b8251156102255782518084602001fd5b8160405162461bcd60e51b815260040161018891906102b4565b60006020828403121561025157600080fd5b81516001600160a01b038116811461004e57600080fd5b60005b8381101561028357818101518382015260200161026b565b83811115610292576000848401525b50505050565b600082516102aa818460208701610268565b9190910192915050565b60208152600082518060208401526102d3816040850160208701610268565b601f01601f1916919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212200a8784ef78317407f2c7b1745bf5ef3b6cdac210deca4e00fb85be3ed6617d9d64736f6c634300080d0033a3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564";

type BeaconProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BeaconProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BeaconProxy__factory extends ContractFactory {
  constructor(...args: BeaconProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    beacon: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<BeaconProxy> {
    return super.deploy(beacon, data, overrides || {}) as Promise<BeaconProxy>;
  }
  override getDeployTransaction(
    beacon: PromiseOrValue<string>,
    data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(beacon, data, overrides || {});
  }
  override attach(address: string): BeaconProxy {
    return super.attach(address) as BeaconProxy;
  }
  override connect(signer: Signer): BeaconProxy__factory {
    return super.connect(signer) as BeaconProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BeaconProxyInterface {
    return new utils.Interface(_abi) as BeaconProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BeaconProxy {
    return new Contract(address, _abi, signerOrProvider) as BeaconProxy;
  }
}
