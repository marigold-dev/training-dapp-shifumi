import { NetworkType } from "@airgap/beacon-types";
import { REACT_APP_CONTRACT_ADDRESS } from "@env";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { HomeScreen } from "./HomeScreen";
import { MainWalletType, Storage } from "./main.types";
import { SessionScreen } from "./SessionScreen";
import { TopPlayersScreen } from "./TopPlayersScreen";
import { address, bytes, MMap, nat, timestamp, unit } from "./type-aliases";

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

export default function App() {
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

  const Stack = createNativeStackNavigator();

  return (
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
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name={PAGES.HOME} component={HomeScreen} />
          <Stack.Screen name={PAGES.SESSION} component={SessionScreen} />
          <Stack.Screen name={PAGES.TOPPLAYERS} component={TopPlayersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

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
<<<<<<< HEAD:solution/appREACTNATIVEEXPO/App.tsx
  buttons: {},
=======
  ranking:{
    height:"150px",
    width:"75px",
    objectFit: "contain",
  }
>>>>>>> Add Ranking page and images:solution/app/App.tsx
});
