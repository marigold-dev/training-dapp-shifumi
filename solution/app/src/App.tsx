import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";

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
import { REACT_APP_CONTRACT_ADDRESS } from "@env";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MainWalletType, Storage } from "./main.types";
import { HomeScreen } from "./pages/HomeScreen";
import { SessionScreen } from "./pages/SessionScreen";
import { TopPlayersScreen } from "./pages/TopPlayersScreen";
import { address, bytes, MMap, nat, timestamp, unit } from "./type-aliases";

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
  board: MMap<nat, address>;
  current_round: nat;
  decoded_rounds: MMap<
    nat,
    Array<{
      action: { cisor: unit } | { paper: unit } | { stone: unit };
      player: address;
    }>
  >;
  players: Array<address>;
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
};
export let UserContext = React.createContext<UserContextType | null>(null);

const [Tezos, setTezos] = useState<TezosToolkit>(
  new TezosToolkit("https://ghostnet.tezos.marigold.dev")
);
const [wallet, setWallet] = useState<BeaconWallet>(
  new BeaconWallet({
    name: "Training",
    preferredNetwork: NetworkType.GHOSTNET,
  })
);
const [userAddress, setUserAddress] = useState<string>("");
const [userBalance, setUserBalance] = useState<number>(0);
const [storage, setStorage] = useState<Storage | null>(null);
const [mainWalletType, setMainWalletType] = useState<MainWalletType | null>(
  null
);
const [loading, setLoading] = useState<boolean>(false);

const refreshStorage = async () => {
  if (wallet) {
    const activeAccount = await wallet.client.getActiveAccount();
    var userAddress: string;
    if (activeAccount) {
      userAddress = activeAccount.address;
      setUserAddress(userAddress);
      const balance = await Tezos.tz.getBalance(userAddress);
      setUserBalance(balance.toNumber());
    }

    const mainWalletType: MainWalletType =
      await Tezos.wallet.at<MainWalletType>(REACT_APP_CONTRACT_ADDRESS);
    const storage: Storage = await mainWalletType.storage();
    setMainWalletType(mainWalletType);
    setStorage(storage);
    console.log("Storage refreshed");
  } else {
    console.log("Not yet a wallet");
  }
};

useEffect(() => {
  Tezos.setWalletProvider(wallet);
  (async () => await refreshStorage())();
}, [wallet]);

const App: React.FC = () => (
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
      }}
    >
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path={PAGES.HOME}>
            <HomeScreen />
          </Route>
          <Route exact path={PAGES.SESSION}>
            <SessionScreen />
          </Route>
          <Route exact path={PAGES.TOPPLAYERS}>
            <TopPlayersScreen />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </UserContext.Provider>
  </IonApp>
);

export enum PAGES {
  HOME = "Home",
  SESSION = "Session",
  TOPPLAYERS = "Top Players",
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1D22",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: "Roboto",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
  },
  logo: {
    height: 70,
    width: 50,
    objectFit: "contain",
    margin: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#2B2A2E",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    backgroundColor: "#1C1D22",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    padding: 1,
  },
  title: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  buttons: {},
});

export default App;
