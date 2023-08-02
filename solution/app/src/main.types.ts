import {
  BigMap,
  MMap,
  address,
  bytes,
  mutez,
  nat,
  timestamp,
  unit,
} from "./type-aliases";
import {
  ContractAbstractionFromContractType,
  WalletContractAbstractionFromContractType,
} from "./type-utils";

export type Storage = {
  metadata: BigMap<string, bytes>;
  next_session: nat;
  sessions: MMap<
    nat,
    {
      asleep: timestamp;
      board: MMap<nat, { Some: address } | null>;
      current_round: nat;
      decoded_rounds: MMap<
        nat,
        Array<{
          action: { cisor: unit } | { paper: unit } | { stone: unit };
          player: address;
        }>
      >;
      players: Array<address>;
      pool: mutez;
      result: { draw: unit } | { inplay: unit } | { winner: address };
      rounds: MMap<
        nat,
        Array<{
          action: bytes;
          player: address;
        }>
      >;
      total_rounds: nat;
    }
  >;
};

type Methods = {
  createSession: (players: Array<address>, total_rounds: nat) => Promise<void>;
  play: (action: bytes, roundId: nat, sessionId: nat) => Promise<void>;
  revealPlay: (
    player_key: bytes,
    player_secret: nat,
    roundId: nat,
    sessionId: nat
  ) => Promise<void>;
  stopSession: (param: nat) => Promise<void>;
};

type MethodsObject = {
  createSession: (params: {
    players: Array<address>;
    total_rounds: nat;
  }) => Promise<void>;
  play: (params: {
    action: bytes;
    roundId: nat;
    sessionId: nat;
  }) => Promise<void>;
  revealPlay: (params: {
    player_key: bytes;
    player_secret: nat;
    roundId: nat;
    sessionId: nat;
  }) => Promise<void>;
  stopSession: (param: nat) => Promise<void>;
};

type contractTypes = {
  methods: Methods;
  methodsObject: MethodsObject;
  storage: Storage;
  code: { __type: "MainCode"; protocol: string; code: object[] };
};
export type MainContractType =
  ContractAbstractionFromContractType<contractTypes>;
export type MainWalletType =
  WalletContractAbstractionFromContractType<contractTypes>;
