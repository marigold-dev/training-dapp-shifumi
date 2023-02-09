## :round_pushpin: [See Github version and full code here](https://github.com/marigold-dev/training-dapp-shifumi)

# Training Shifumi (:iphone: version)

# :fist: :hand: :v: Shifumi :mount_fuji: :page_facing_up: :scissors:

//TODO IMAGE HERE

Rock paper scissors (also known by other orderings of the three items, with "rock" sometimes being called "stone," or as Rochambeau, roshambo, or ro-sham-bo) is a hand game originating from China, usually played between two people, in which each player simultaneously forms one of three shapes with an outstretched hand. These shapes are "rock" (a closed fist), "paper" (a flat hand), and "scissors" (a fist with the index finger and middle finger extended, forming a V). "Scissors" is identical to the two-fingered V sign (also indicating "victory" or "peace") except that it is pointed horizontally instead of being held upright in the air.

[Wikipedia link](https://en.wikipedia.org/wiki/Rock_paper_scissors)

# :memo: Prerequisites

Please install this software first on your machine or use online alternative :

- [ ] [VS Code](https://code.visualstudio.com/download) : as text editor
- [ ] [npm](https://nodejs.org/en/download/) : we will use a typescript React client app
- [ ] [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) : because yet another package manager (https://www.geeksforgeeks.org/difference-between-npm-and-yarn/)
- [ ] [taqueria v0.28.0](https://github.com/ecadlabs/taqueria) : Tezos Dapp project tooling
- [ ] [taqueria VS Code extension](https://marketplace.visualstudio.com/items?itemName=ecadlabs.taqueria-vscode) : visualize your project and execute tasks
- [ ] [ligo VS Code extension](https://marketplace.visualstudio.com/items?itemName=ligolang-publish.ligo-vscode) : for smart contract highlighting, completion, etc ..
- [ ] [Temple wallet](https://templewallet.com/) : an easy to use Tezos wallet in your browser
- [ ] [Docker](https://docs.docker.com/engine/install/) you cannot do anything without containers today ...

> :warning: :whale: About Taqueria : taqueria is using software images from Docker to run Ligo, etc ... Docker should be running on your machine :whale2:

# :scroll: Smart contract

## Step 1 : Create folder & file

> Note : We will use CLI here but you can also use GUI from the IDE or Taqueria plugin

```bash
taq init shifumi
cd shifumi
taq install @taqueria/plugin-ligo
```

> :warning: HACK note : create a dummy esy.json file with `{}` content on it. I will be used by the ligo package installer to not override the default package.json file of taqueria

```bash
echo "{}" > esy.json
```

Clone the ligo template locally, we will take only the source for our training

```bash
taq ligo --command "init contract --template shifumi-jsligo shifumiTemplate"
cp -r shifumiTemplate/src/* contracts/
```

## Step 2 : Add initial storage and compile

Compile the contract once to create the default file `main.storageList.jsligo` for deployment

```bash
taq compile main.jsligo
```

Edit `main.storageList.jsligo`

```ligolang
#include "main.jsligo"

const default_storage = {
    metadata: Big_map.literal(list([["",bytes `tezos-storage:contents`],
    ["contents", bytes `
    {
    "name": "Shifumi Example",
    "description": "An Example Shifumi Contract",
    "version": "beta",
    "license": {
        "name": "MIT"
    },
    "authors": [
        "smart-chain <tezos@smart-chain.fr>"
    ],
    "homepage": "https://github.com/ligolang/shifumi-jsligo",
    "source": {
        "tools": "jsligo",
        "location": "https://github.com/ligolang/shifumi-jsligo/contracts"
    },
    "interfaces": [
        "TZIP-016"
    ]
    }
    `]
    ]))   as big_map<string, bytes>,
    next_session: 0 as nat,
    sessions: Map.empty as  map<nat, Session.t>,
  }
```

Compile again

```bash
taq compile main.jsligo
```

## Step 3 : Deploy to Ghostnet

```bash
taq install @taqueria/plugin-taquito
taq deploy main.tz -e "testing"
```

> Note : if it is the first time you use taqueria, I recommend to look at this training first [https://github.com/marigold-dev/training-dapp-1#ghostnet-testnet-wallet](https://github.com/marigold-dev/training-dapp-1#ghostnet-testnet-wallet)
> For advanced users, just go to `.taq/config.local.testing.json` and change the default account on path `/accounts` to alice settings (publicKey,publicKeyHash,privateKey) and then redeploy
>
> ```json
> "accounts": {
>                "taqOperatorAccount": {
>                    "publicKey": "edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn",
>                    "publicKeyHash": "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",
>                    "privateKey": "edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq"
>                }
>            }
> ```

HOORAY :confetti_ball: your smart contract is ready on the Ghostnet !

```logs
┌──────────┬──────────────────────────────────────┬───────┬──────────────────┬────────────────────────────────┐
│ Contract │ Address                              │ Alias │ Balance In Mutez │ Destination                    │
├──────────┼──────────────────────────────────────┼───────┼──────────────────┼────────────────────────────────┤
│ main.tz  │ KT1B72K7dwo9m4qVYtfBofNHQVGak5h7Nemp │ main  │ 0                │ https://ghostnet.ecadinfra.com │
└──────────┴──────────────────────────────────────┴───────┴──────────────────┴────────────────────────────────┘
```

# Mobile app

## Step 1 : Install IONIC

install

```
npm install -g @ionic/cli
ionic start app blank --type react
```

Generate Smart contract types from taqueria plugin

```bash
taq install @taqueria/plugin-contract-types
taq generate types ./app/src
```

install deps

```
cd app
npm install -S add @taquito/taquito @taquito/beacon-wallet @airgap/beacon-sdk  @dipdup/tzkt-api
npm install -S -D @airgap/beacon-types
npm i --save-dev @types/react
```

> :warning: :warning: :warning: Last React version uses `react-script 5.x` , follow these steps to rewire webpack for all encountered missing libraries : https://github.com/ChainSafe/web3.js#troubleshooting-and-known-issues

> For example, in my case, I installed this :
>
> ```bash
> yarn add --dev react-app-rewired process crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url path-browserify
> ```
>
> and my `config-overrides.js` file was :
>
> ```js
> const webpack = require("webpack");
>
> module.exports = function override(config) {
>   const fallback = config.resolve.fallback || {};
>   Object.assign(fallback, {
>     crypto: require.resolve("crypto-browserify"),
>     stream: require.resolve("stream-browserify"),
>     assert: require.resolve("assert"),
>     http: require.resolve("stream-http"),
>     https: require.resolve("https-browserify"),
>     os: require.resolve("os-browserify"),
>     url: require.resolve("url"),
>     path: require.resolve("path-browserify"),
>   });
>   config.ignoreWarnings = [/Failed to parse source map/];
>   config.resolve.fallback = fallback;
>   config.plugins = (config.plugins || []).concat([
>     new webpack.ProvidePlugin({
>       process: "process/browser",
>       Buffer: ["buffer", "Buffer"],
>     }),
>   ]);
>   return config;
> };
> ```
>
> :warning:

This was painful :/, but it was the worst so far

Modify the default package.json default scripts (to fix an issue between ionic and react-rewired)

```
  "scripts": {
    "postinstall": "cd ./node_modules && ln -s crypto-browserify crypto && cd .bin && mv react-scripts react-scripts-real && ln -s ../react-app-rewired/bin/index.js react-scripts",
    "start": "jq -r '\"REACT_APP_CONTRACT_ADDRESS=\" + last(.tasks[]).output[0].address' ../.taq/testing-state.json > .env && react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --transformIgnorePatterns 'node_modules/(?!(@ionic/react|@ionic/react-router|@ionic/core|@stencil/core|ionicons)/)'",
    "eject": "react-scripts eject"
  },
```

Run web version for development

```
npm run postinstall
npm run start
```

## Step 2 : Connect / disconnect the wallet

We will declare 2 React Button components and a display of address and balance while connected

Edit src/App.tsx file

```typescript
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
import { PollingSubscribeProvider, TezosToolkit } from "@taquito/taquito";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MainWalletType, Storage } from "./main.types";
import { HomeScreen } from "./pages/HomeScreen";
import { RulesScreen } from "./pages/Rules";
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
  refreshStorage: (event?: CustomEvent<RefresherEventDetail>) => Promise<void>;
};
export let UserContext = React.createContext<UserContextType | null>(null);

const App: React.FC = () => {
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

  const refreshStorage = async (
    event?: CustomEvent<RefresherEventDetail>
  ): Promise<void> => {
    if (wallet) {
      const activeAccount = await wallet.client.getActiveAccount();
      var userAddress: string;
      if (activeAccount) {
        userAddress = activeAccount.address;
        setUserAddress(userAddress);
        const balance = await Tezos.tz.getBalance(userAddress);
        setUserBalance(balance.toNumber());
      }

      console.log(
        "REACT_APP_CONTRACT_ADDRESS:",
        process.env.REACT_APP_CONTRACT_ADDRESS!
      );
      const mainWalletType: MainWalletType =
        await Tezos.wallet.at<MainWalletType>(
          process.env.REACT_APP_CONTRACT_ADDRESS!
        );
      const storage: Storage = await mainWalletType.storage();
      setMainWalletType(mainWalletType);
      setStorage(storage);
      console.log("Storage refreshed");
    } else {
      console.log("Not yet a wallet");
    }
    event?.detail.complete();
  };

  useEffect(() => {
    Tezos.setWalletProvider(wallet);
    Tezos.setStreamProvider(
      Tezos.getFactory(PollingSubscribeProvider)({
        shouldObservableSubscriptionRetry: true,
        pollingIntervalMilliseconds: 1500,
      })
    );
    try {
      const sub = Tezos.stream.subscribeEvent({
        tag: "gameStatus",
        address: process.env.REACT_APP_CONTRACT_ADDRESS!,
      });

      sub.on("data", (e) => {
        console.log("on gameStatus event :", e);
        refreshStorage();
      });
    } catch (e) {
      console.log("Error with Smart contract event pooling", e);
    }
    (async () => await refreshStorage())();
  }, [wallet]);

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
```

Let's create the 2 missing src component files and put code in it. On src folder, create these files.

```bash
touch src/ConnectWallet.tsx
touch src/DisconnectWallet.tsx
```

ConnectWallet button will create an instance wallet, get user permissions via a popup and then retrieve account information

Edit ConnectWallet.tsx

```typescript
import { NetworkType } from "@airgap/beacon-types";
import { IonButton } from "@ionic/react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { Dispatch, SetStateAction } from "react";

type ButtonProps = {
  Tezos: TezosToolkit;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
  wallet: BeaconWallet;
};

const ConnectButton = ({
  Tezos,
  setUserAddress,
  setUserBalance,
  wallet,
}: ButtonProps): JSX.Element => {
  const connectWallet = async (): Promise<void> => {
    try {
      console.log("before requestPermissions");

      await wallet.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl: "https://ghostnet.tezos.marigold.dev",
        },
      });
      console.log("after requestPermissions");

      // gets user's address
      const userAddress = await wallet.getPKH();
      const balance = await Tezos.tz.getBalance(userAddress);
      setUserBalance(balance.toNumber());
      setUserAddress(userAddress);
    } catch (error) {
      console.log("error connectWallet", error);
    }
  };

  return (
    <IonButton expand="full" onClick={connectWallet}>
      Connect Wallet
    </IonButton>
  );
};

export default ConnectButton;
```

DisconnectWallet button will clean wallet instance and all linked objects

```typescript
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { power } from "ionicons/icons";
import { Dispatch, SetStateAction } from "react";

interface ButtonProps {
  wallet: BeaconWallet;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
}

const DisconnectButton = ({
  wallet,
  setUserAddress,
  setUserBalance,
}: ButtonProps): JSX.Element => {
  const disconnectWallet = async (): Promise<void> => {
    setUserAddress("");
    setUserBalance(0);
    console.log("disconnecting wallet");
    await wallet.clearActiveAccount();
  };

  return (
    <IonFab slot="fixed" vertical="top" horizontal="end">
      <IonFabButton>
        <IonIcon icon={power} onClick={disconnectWallet} />
      </IonFabButton>
    </IonFab>
  );
};

export default DisconnectButton;
```

Save both file, the dev server should refresh the page

Let's add missing pages and error utility class

```bash
touch src/pages/HomeScreen.tsx
touch src/pages/SessionScreen.tsx
touch src/pages/Rules.tsx
touch src/pages/TopPlayersScreen.tsx
touch src/TransactionInvalidBeaconError.ts
```

Edit all files

HomeScreen.tsx

```typescript
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { bytes2Char } from "@taquito/utils";
import { BigNumber } from "bignumber.js";
import { person } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { PAGES, Session, UserContext, UserContextType } from "../App";
import ConnectButton from "../ConnectWallet";
import DisconnectButton from "../DisconnectWallet";
import { TransactionInvalidBeaconError } from "../TransactionInvalidBeaconError";
import { address, nat } from "../type-aliases";

export const HomeScreen: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  const createGameModal = useRef<HTMLIonModalElement>(null);
  const selectGameModal = useRef<HTMLIonModalElement>(null);
  function dismissCreateGameModal() {
    console.log("dismissCreateGameModal");
    createGameModal.current?.dismiss();
  }
  function dismissSelectGameModal() {
    selectGameModal.current?.dismiss();
    const element = document.getElementById("home");
    setTimeout(() => {
      return element && element.remove();
    }, 1000); // Give a little time to properly unmount your previous page before removing the old one
  }

  const {
    Tezos,
    wallet,
    userAddress,
    userBalance,
    storage,
    mainWalletType,
    setStorage,
    setUserAddress,
    setUserBalance,
    setLoading,
    loading,
    refreshStorage,
  } = React.useContext(UserContext) as UserContextType;

  const [description, setDescription] = useState<string>("");

  const [newPlayer, setNewPlayer] = useState<address>("" as address);
  const [total_rounds, setTotal_rounds] = useState<nat>(
    new BigNumber(1) as nat
  );
  const [myGames, setMyGames] = useState<Map<nat, Session>>();

  useEffect(() => {
    (async () => {
      if (storage) {
        const metadata: any = await storage.metadata.get("contents");
        const myGames = new Map(); //filtering our games
        Array.from(storage.sessions.keys()).forEach((key) => {
          const session = storage.sessions.get(key);

          if (
            session.players.indexOf(userAddress as address) >= 0 &&
            "inplay" in session.result
          ) {
            myGames.set(key, session);
          }
        });
        setMyGames(myGames);
        setDescription(JSON.parse(bytes2Char(metadata)).description);
      } else {
        console.log("storage is not ready yet");
      }
    })();
  }, [storage]);

  const createSession = async (
    e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
  ) => {
    console.log("createSession");
    e.preventDefault();
    dismissCreateGameModal();

    try {
      setLoading(true);
      const op = await mainWalletType!.methods
        .createSession([userAddress as address, newPlayer], total_rounds)
        .send();
      await op?.confirmation();
      const newStorage = await mainWalletType!.storage();
      setStorage(newStorage);
      setLoading(false);
      history.push(PAGES.SESSION + "/" + storage?.next_session.toString()); //it was the id created
      dismissCreateGameModal();
      console.log("newStorage", newStorage);
    } catch (error) {
      console.table(`Error: ${JSON.stringify(error, null, 2)}`);
      let tibe: TransactionInvalidBeaconError =
        new TransactionInvalidBeaconError(error);
      presentAlert({
        header: "Error",
        message: tibe.data_message,
        buttons: ["Close"],
      });
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <IonPage className="container">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shifumi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refreshStorage}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {loading ? (
          <div className="loading">
            <IonItem>
              <IonLabel>Refreshing ...</IonLabel>
              <IonSpinner className="spinner"></IonSpinner>
            </IonItem>
          </div>
        ) : (
          <IonList inset={true}>
            {!userAddress ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: "4em",
                    justifyContent: "space-around",
                  }}
                >
                  <IonImg
                    src={process.env.PUBLIC_URL + "/assets/stone-logo.png"}
                    className="logo"
                  />
                  <IonImg
                    src={process.env.PUBLIC_URL + "/assets/paper-logo.png"}
                    className="logo"
                  />
                  <IonImg
                    src={process.env.PUBLIC_URL + "/assets/scissor-logo.png"}
                    className="logo"
                  />
                </div>
                <IonList inset={true}>
                  <ConnectButton
                    Tezos={Tezos}
                    setUserAddress={setUserAddress}
                    setUserBalance={setUserBalance}
                    wallet={wallet}
                  />
                </IonList>
              </>
            ) : (
              <IonList>
                <IonItem style={{ padding: 0, margin: 0 }}>
                  <IonIcon icon={person} />
                  <IonLabel style={{ fontSize: "0.8em", direction: "rtl" }}>
                    {userAddress}
                  </IonLabel>
                </IonItem>
                <IonItem style={{ padding: 0, margin: 0 }}>
                  <IonImg
                    style={{ height: 24, width: 24 }}
                    src={process.env.PUBLIC_URL + "/assets/xtz.png"}
                  />
                  <IonLabel style={{ direction: "rtl" }}>
                    {userBalance / 1000000}
                  </IonLabel>
                </IonItem>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingTop: "10vh",
                    paddingBottom: "10vh",
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                >
                  <IonImg
                    src={process.env.PUBLIC_URL + "/assets/stone-logo.png"}
                    className="logo"
                  />
                  <IonImg
                    src={process.env.PUBLIC_URL + "/assets/paper-logo.png"}
                    className="logo"
                  />
                  <IonImg
                    src={process.env.PUBLIC_URL + "/assets/scissor-logo.png"}
                    className="logo"
                  />
                </div>

                <IonButton id="createGameModalVisible" expand="full">
                  New game
                </IonButton>
                <IonModal
                  ref={createGameModal}
                  trigger="createGameModalVisible"
                >
                  <IonHeader>
                    <IonToolbar>
                      <IonButtons slot="start">
                        <IonButton onClick={() => dismissCreateGameModal()}>
                          Cancel
                        </IonButton>
                      </IonButtons>
                      <IonTitle>New Game</IonTitle>
                      <IonButtons slot="end">
                        <IonButton
                          strong={true}
                          onClick={(e) => createSession(e)}
                          id="createGameModal"
                        >
                          Create
                        </IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>
                  <IonContent>
                    <IonItem key="total_rounds">
                      <IonLabel position="stacked" className="text">
                        total rounds
                      </IonLabel>
                      <IonInput
                        onIonChange={(str) => {
                          if (str.detail.value === undefined) return;
                          setTotal_rounds(
                            new BigNumber(str.target.value!) as nat
                          );
                        }}
                        value={total_rounds.toString()}
                        placeholder="total_rounds"
                        type="number"
                      />
                    </IonItem>
                    <IonItem key="newPlayer">
                      <IonLabel position="stacked" className="text">
                        Opponent player
                      </IonLabel>
                      <IonInput
                        onIonChange={(str) => {
                          if (str.detail.value === undefined) return;
                          setNewPlayer(str.detail.value as address);
                        }}
                        value={newPlayer}
                        placeholder="tz1..."
                        type="text"
                      />
                    </IonItem>
                  </IonContent>
                </IonModal>

                <IonButton id="selectGameModalVisible" expand="full">
                  Join game
                </IonButton>
                <IonModal
                  ref={selectGameModal}
                  trigger="selectGameModalVisible"
                >
                  <IonHeader>
                    <IonToolbar>
                      <IonButtons slot="start">
                        <IonButton onClick={() => dismissSelectGameModal()}>
                          Cancel
                        </IonButton>
                      </IonButtons>
                      <IonTitle>Select Game</IonTitle>
                    </IonToolbar>
                  </IonHeader>
                  <IonContent>
                    <IonList inset={true}>
                      {myGames
                        ? Array.from(myGames.entries()).map(([key, Value]) => (
                            <IonButton
                              key={"Game-" + key.toString()}
                              expand="full"
                              routerLink={PAGES.SESSION + "/" + key.toString()}
                              onClick={dismissSelectGameModal}
                            >
                              {"Game n°" + key.toString()}
                            </IonButton>
                          ))
                        : []}
                    </IonList>
                  </IonContent>
                </IonModal>

                <IonButton routerLink={PAGES.TOPPLAYERS} expand="full">
                  Top Players
                </IonButton>
              </IonList>
            )}
          </IonList>
        )}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle>
            <IonButton color="primary" routerLink={PAGES.RULES} expand="full">
              Rules
            </IonButton>
          </IonTitle>
        </IonToolbar>
      </IonFooter>

      {userAddress ? (
        <DisconnectButton
          wallet={wallet}
          setUserAddress={setUserAddress}
          setUserBalance={setUserBalance}
        />
      ) : (
        <></>
      )}
    </IonPage>
  );
};
```

SessionScreen.tsx

```typescript
import { IonPage } from "@ionic/react";
import React from "react";

export const SessionScreen: React.FC = () => {
  return <IonPage className="container"></IonPage>;
};
```

TopPlayersScreen.tsx

```typescript
import { IonPage } from "@ionic/react";
import React from "react";

export const TopPlayersScreen: React.FC = () => {
  return <IonPage className="container"></IonPage>;
};
```

Rules.tsx

```typescript
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";

export const RulesScreen: React.FC = () => {
  const history = useHistory();
  /* 2. Get the param */
  return (
    <IonPage className="container">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>Back</IonButton>
          </IonButtons>
          <IonTitle>Rules</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ textAlign: "left" }}>
          <IonList>
            <IonItem className="nopm">
              <IonImg
                src={process.env.PUBLIC_URL + "/assets/stone-logo.png"}
                className="logo"
              />
              Stone (Clenched Fist). Rock beats the scissors by hitting it
            </IonItem>
            <IonItem className="nopm">
              <IonImg
                src={process.env.PUBLIC_URL + "/assets/paper-logo.png"}
                className="logo"
              />
              Paper (open and extended hand) . Paper wins over stone by enveloping
              it
            </IonItem>
            <IonItem className="nopm">
              <IonImg
                src={process.env.PUBLIC_URL + "/assets/scissor-logo.png"}
                className="logo"
              />
              Scissors (closed hand with the two fingers) . Scissors wins paper cutting
              it
            </IonItem>

            <IonItem className="nopm">
              <IonImg
                src={process.env.PUBLIC_URL + "/assets/clock.png"}
                className="logo"
              />
              If you are inactive for more than 10 minutes your opponent can claim
              the victory
            </IonItem>

            <IonItem className="nopm">
              <IonImg
                src={process.env.PUBLIC_URL + "/assets/legend.png"}
                className="logo"
              />
              <ul style={{ listStyle: "none" }}>
                <li className="win">Won round</li>
                <li className="lose">Lost round</li>
                <li className="draw">Draw</li>
                <li className="current">Current Round</li>
                <li className="missing">Missing Rounds</li>
              </ul>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};
```

TransactionInvalidBeaconError.ts

```typescript
const errorMap: Map<string, string> = new Map([
  ["0", "Enter a positive and not null amount"],
  ["1", "Operation not allowed, you need to be administrator"],
  ["2", "You cannot sell more than your current balance"],
  ["3", "Cannot find the offer you entered for buying"],
  ["4", "You entered a quantity to buy than is more than the offer quantity"],
  [
    "5",
    "Not enough funds, you need to pay at least quantity * bif price to get the tokens",
  ],
  ["6", "Cannot find the contract relative to implicit address"],
]);

export class TransactionInvalidBeaconError {
  name: string;
  title: string;
  message: string;
  description: string;
  data_contract_handle: string;
  data_with_string: string;
  data_expected_form: string;
  data_message: string;

  /**
      * 
      * @param transactionInvalidBeaconError  {
      "name": "UnknownBeaconError",
      "title": "Aborted",
      "message": "[ABORTED_ERROR]:The action was aborted by the user.",
      "description": "The action was aborted by the user."
  }
  */

  constructor(transactionInvalidBeaconError: any) {
    this.name = transactionInvalidBeaconError.name;
    this.title = transactionInvalidBeaconError.title;
    this.message = transactionInvalidBeaconError.message;
    this.description = transactionInvalidBeaconError.description;
    this.data_contract_handle = "";
    this.data_with_string = "";
    this.data_expected_form = "";
    this.data_message = this.message;
    if (transactionInvalidBeaconError.data !== undefined) {
      let dataArray = Array.from<any>(
        new Map(
          Object.entries<any>(transactionInvalidBeaconError.data)
        ).values()
      );
      let contract_handle = dataArray.find(
        (obj) => obj.contract_handle !== undefined
      );
      this.data_contract_handle =
        contract_handle !== undefined ? contract_handle.contract_handle : "";
      let withString = dataArray.find((obj) => obj.with !== undefined);
      this.data_with_string =
        withString !== undefined ? withString.with.string : "";
      let expected_form = dataArray.find(
        (obj) => obj.expected_form !== undefined
      );
      this.data_expected_form =
        expected_form !== undefined
          ? expected_form.expected_form +
            ":" +
            expected_form.wrong_expression.string
          : "";
      this.data_message =
        (this.data_contract_handle
          ? "Error on contract : " + this.data_contract_handle + " "
          : "") +
        (this.data_with_string
          ? "error : " + errorMap.get(this.data_with_string) + " "
          : "") +
        (this.data_expected_form
          ? "error : " + this.data_expected_form + " "
          : "");
    }
  }
}
```

As Temple is configured well, Click on Connect button

On the popup, select your Temple wallet, then your account and connect. :warning: Do not forget to stay on the "ghostnet" testnet

:confetti_ball: your are "logged"

Click on the Disconnect button to logout to test it

## Step 3 : Access to contract storage and display the state

### Display About metadata

### List sessions

## Step 4 : Create a session

## Step 5 : Play on a session

## Step 6 : Reveal your choice

## Step 7 : Close session

## Now let's try Android version (or iOS if you have this OS instead)

> Note : you need to install [Android SDK](https://developer.android.com/about/versions/13/setup-sdk) or [iOS]() stack first

Prepare android release

```
ionic capacitor add android
```

For Capacitor, open the capacitor.config.json file and modify the appId property.

```
ionic capacitor copy android

npm install -g cordova-res
cordova-res android --skip-config --copy
```

Note : in case of broken gradle : ionic capacitor sync android, ionic capacitor update and click on sync on Android studio > build
Note on .gitignore on android folder and git uncommitted fields : git add android/app/src/main/assets/\* -f , git add capacitor-cordova-android-plugins -f

# :palm_tree: Conclusion :sun_with_face:

Play with your friends and follow other Marigold trainings [here](https://www.marigold.dev/learn)
