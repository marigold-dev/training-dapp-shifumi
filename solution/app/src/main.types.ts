
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import { address, BigMap, bytes, MMap, mutez, nat, timestamp, unit } from './type-aliases';

export type Storage = {
    metadata: BigMap<string, bytes>;
    next_session: nat;
    sessions: MMap<nat, {
        total_rounds: nat;
        players: Array<address>;
        current_round: nat;
        rounds: MMap<nat, Array<{
            player: address;
            action: bytes;
        }>>;
        decoded_rounds: MMap<nat, Array<{
            player: address;
            action: (
                { stone: unit }
                | { paper: unit }
                | { cisor: unit }
            );
        }>>;
        board: MMap<nat, {Some: address} | null>;
        result: (
            { inplay: unit }
            | { draw: unit }
            | { winner: address }
        );
        asleep: timestamp;
        pool: mutez;
    }>;
};

type Methods = {
    revealPlay: (
        sessionId: nat,
        roundId: nat,
        player_key: bytes,
        player_secret: nat,
    ) => Promise<void>;
    play: (
        sessionId: nat,
        roundId: nat,
        action: bytes,
    ) => Promise<void>;
    stopSession: (param: nat) => Promise<void>;
    createSession: (
        total_rounds: nat,
        players: Array<address>,
    ) => Promise<void>;
};

type MethodsObject = {
    revealPlay: (params: {
        sessionId: nat,
        roundId: nat,
        player_key: bytes,
        player_secret: nat,
    }) => Promise<void>;
    play: (params: {
        sessionId: nat,
        roundId: nat,
        action: bytes,
    }) => Promise<void>;
    stopSession: (param: nat) => Promise<void>;
    createSession: (params: {
        total_rounds: nat,
        players: Array<address>,
    }) => Promise<void>;
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'MainCode', protocol: string, code: object[] } };
export type MainContractType = ContractAbstractionFromContractType<contractTypes>;
export type MainWalletType = WalletContractAbstractionFromContractType<contractTypes>;
