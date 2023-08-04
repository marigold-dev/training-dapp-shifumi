import {
  IonApp,
  IonRouterOutlet,
  RefresherEventDetail,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/variables.css";

import { NetworkType } from "@airgap/beacon-types";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { InternalOperationResult } from "@taquito/rpc";
import {
  PollingSubscribeProvider,
  Subscription,
  TezosToolkit,
} from "@taquito/taquito";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MainWalletType, Storage } from "./main.types";
import { HomeScreen } from "./pages/HomeScreen";
import { RulesScreen } from "./pages/Rules";
import { SessionScreen } from "./pages/SessionScreen";
import { TopPlayersScreen } from "./pages/TopPlayersScreen";
import {
  MMap,
  address,
  bytes,
  mutez,
  nat,
  timestamp,
  unit,
} from "./type-aliases";

setupIonicReact();

export class Action implements ActionCisor, ActionPaper, ActionStone {
  cisor?: unit;
  paper?: unit;
  stone?: unit;
  constructor(cisor?: unit, paper?: unit, stone?: unit) {
    this.cisor = cisor;
    this.paper = paper;
    this.stone = stone;
  }
}
export type ActionCisor = { cisor?: unit };
export type ActionPaper = { paper?: unit };
export type ActionStone = { stone?: unit };

export type Session = {
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
};

export type UserContextType = {
  storage: Storage | null;
  setStorage: Dispatch<SetStateAction<Storage | null>>;
  userAddress: string;
  setUserAddress: Dispatch<SetStateAction<string>>;
  userBalance: number;
  setUserBalance: Dispatch<SetStateAction<number>>;
  Tezos: TezosToolkit;
  wallet: BeaconWallet;
  mainWalletType: MainWalletType | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  refreshStorage: (event?: CustomEvent<RefresherEventDetail>) => Promise<void>;
  subReveal: Subscription<InternalOperationResult> | undefined;
  subNewRound: Subscription<InternalOperationResult> | undefined;
};
export const UserContext = React.createContext<UserContextType | null>(null);

const App: React.FC = () => {
  const Tezos = new TezosToolkit("https://ghostnet.tezos.marigold.dev");

  const wallet = new BeaconWallet({
    name: "Training",
    preferredNetwork: NetworkType.GHOSTNET,
  });

  Tezos.setWalletProvider(wallet);
  Tezos.setStreamProvider(
    Tezos.getFactory(PollingSubscribeProvider)({
      shouldObservableSubscriptionRetry: true,
      pollingIntervalMilliseconds: 1500,
    })
  );

  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [storage, setStorage] = useState<Storage | null>(null);
  const [mainWalletType, setMainWalletType] = useState<MainWalletType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const [subscriptionsDone, setSubscriptionsDone] = useState<boolean>(false);
  const [subReveal, setSubReveal] =
    useState<Subscription<InternalOperationResult>>();
  const [subNewRound, setSubNewRound] =
    useState<Subscription<InternalOperationResult>>();

  const refreshStorage = async (
    event?: CustomEvent<RefresherEventDetail>
  ): Promise<void> => {
    try {
      if (!userAddress) {
        const activeAccount = await wallet.client.getActiveAccount();
        let userAddress: string;
        if (activeAccount) {
          userAddress = activeAccount.address;
          setUserAddress(userAddress);
          const balance = await Tezos.tz.getBalance(userAddress);
          setUserBalance(balance.toNumber());
        }
      }

      console.log(
        "REACT_APP_CONTRACT_ADDRESS:",
        import.meta.env.VITE_CONTRACT_ADDRESS
      );
      const mainWalletType: MainWalletType =
        await Tezos.wallet.at<MainWalletType>(
          import.meta.env.VITE_CONTRACT_ADDRESS
        );
      const storage: Storage = await mainWalletType.storage();
      setMainWalletType(mainWalletType);
      setStorage(storage);
      console.log("Storage refreshed");

      event?.detail.complete();
    } catch (error) {
      console.log("error refreshing storage", error);
    }
  };

  useEffect(() => {
    try {
      if (!subscriptionsDone) {
        const sub = Tezos.stream.subscribeEvent({
          tag: "gameStatus",
          address: import.meta.env.VITE_CONTRACT_ADDRESS!,
        });

        sub.on("data", (e) => {
          console.log("on gameStatus event :", e);
          refreshStorage();
        });

        setSubReveal(
          Tezos.stream.subscribeEvent({
            tag: "reveal",
            address: import.meta.env.VITE_CONTRACT_ADDRESS,
          })
        );

        setSubNewRound(
          Tezos.stream.subscribeEvent({
            tag: "newRound",
            address: import.meta.env.VITE_CONTRACT_ADDRESS,
          })
        );
      } else {
        console.warn("Tezos.stream.subscribeEvent already done ... ignoring");
      }
    } catch (e) {
      console.log("Error with Smart contract event pooling", e);
    }

    console.log("Tezos.stream.subscribeEvent DONE");
    setSubscriptionsDone(true);
  }, []);

  useEffect(() => {
    if (userAddress) {
      console.warn("userAddress changed", wallet);
      (async () => await refreshStorage())();
    }
  }, [userAddress]);

  return (
    <IonApp>
      <UserContext.Provider
        value={{
          userAddress,
          userBalance,
          Tezos,
          wallet,
          storage,
          mainWalletType,
          setUserAddress,
          setUserBalance,
          setStorage,
          loading,
          setLoading,
          refreshStorage,
          subReveal,
          subNewRound,
        }}
      >
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path={PAGES.HOME} component={HomeScreen} />
            <Route path={`${PAGES.SESSION}/:id`} component={SessionScreen} />
            <Route path={PAGES.TOPPLAYERS} component={TopPlayersScreen} />
            <Route path={PAGES.RULES} component={RulesScreen} />
            <Redirect exact from="/" to={PAGES.HOME} />
          </IonRouterOutlet>
        </IonReactRouter>
      </UserContext.Provider>
    </IonApp>
  );
};

export enum PAGES {
  HOME = "/home",
  SESSION = "/session",
  TOPPLAYERS = "/topplayers",
  RULES = "/rules",
}

export default App;
