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
- [ ] [taqueria v0.24.2](https://github.com/ecadlabs/taqueria) : Tezos Dapp project tooling
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
TAQ_LIGO_IMAGE=ligolang/ligo:0.58.0 taq ligo --command "init contract --template shifumi-jsligo shifumiTemplate"
cp -r shifumiTemplate/src/* contracts/
```

## Step 2 : Add initial storage and compile

Compile the contract once to create the default file `main.storageList.jsligo` for deployment

```bash
TAQ_LIGO_IMAGE=ligolang/ligo:0.58.0 taq compile main.jsligo
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
TAQ_LIGO_IMAGE=ligolang/ligo:0.58.0 taq compile main.jsligo
```

## Step 3 : Deploy to Ghostnet

```bash
taq install @taqueria/plugin-taquito
taq deploy main.tz -e "testing"
```

> Note : if it is the first time you use taqueria, I recommend to look at this training first [https://github.com/marigold-dev/training-dapp-1#ghostnet-testnet-wallet](https://github.com/marigold-dev/training-dapp-1#ghostnet-testnet-wallet)
> For advanced users, just go to `.taq/config.json` and change the default account on path `/network/ghostnet/accounts` to alice settings (publicKey,publicKeyHash,privateKey) and then redeploy
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
┌─────────────┬──────────────────────────────────────┬──────────┬──────────────────┬─────────────────────────────────────┐
│ Contract    │ Address                              │ Alias    │ Balance In Mutez │ Destination                         │
├─────────────┼──────────────────────────────────────┼──────────┼──────────────────┼─────────────────────────────────────┤
│ pokeGame.tz │ KT19jEAyrvsMzY6DQ42UsR6KF3duKHJMJyPZ │ pokeGame │ 0                │ https://ghostnet.tezos.marigold.dev │
└─────────────┴──────────────────────────────────────┴──────────┴──────────────────┴─────────────────────────────────────┘
```

## IONIC

install

```
npm install -g @ionic/cli
ionic start app blank --type react
```

Install SC types

```bash
cd ..
taq install @taqueria/plugin-contract-types
taq generate types ./app/src
cd ./app
```

install deps

```
cd app
npm install -S add @taquito/taquito @taquito/beacon-wallet @airgap/beacon-sdk  @dipdup/tzkt-api
npm install -S -D @airgap/beacon-types
npm i --save-dev @types/react


```

run web

```
ionic serve
```

prepare android

```
ionic capacitor add android
```

For Capacitor, open the capacitor.config.json file and modify the appId property.

```
ionic capacitor copy android
```

Note : in case of broken gradle : ionic capacitor sync android, ionic capacitor update and click on sync on Android studio > build

## END IONIC

## Step 1 : Create react app with Expo

```bash
npm i -g expo-cli
npx create-expo-app app -t expo-template-blank-typescript

cd app
```

3 ways to start the server

- npm run android
- npm run ios # you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac
- npm run web

Let's try first the web version

```bash
npx expo install @expo/webpack-config@^0.17.2
npm run web
```

Browser opens on `http://localhost:19006/`

---

Add taquito, tzkt indexer lib

```bash
npm install -S add @taquito/taquito @taquito/beacon-wallet @airgap/beacon-sdk  @dipdup/tzkt-api
npm install -S -D @airgap/beacon-types
npm install -S react-native-dotenv
npm install -S @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npm install -S @react-navigation/native-stack
npx expo install  expo-crypto
npx expo install  @react-native-async-storage/async-storage
npx expo install expo-splash-screen
npx expo install expo-font
```

// steam deps issues

npx expo customize metro.config.js
npm install --save node-libs-react-native

> NOTE TO FIX node_modules\readable-stream\lib\\\_stream_writable.js add line:
> https://github.com/facebook/react-native/issues/30654#issuecomment-753844822

```
/*<replacement>*/
var process = require("process");   // THIS LINE
var pna = require('process-nextick-args');
/*</replacement>*/
```

Generate React Native code for android and ios via codegen, on top root folder of this repo
https://docs.expo.dev/modules/native-module-tutorial/

For android

Install missing C++ lib ICU for cmake to compile (https://github.com/facebook/react-native/issues/34084#issuecomment-1325160463)

```bash
sudo apt-get install libicu-dev
```

Native lib ?
"rn-beacon-sdk": "^0.1.1"

This was painful :/, but it was the worst so far

### Generate Typescript classes from Michelson code

Taqueria is able to generate Typescript classes for our React application. It will take the definition of your smart contract and generate the contract entrypoint functions, type definitions, etc ...

To get typescript classes from taqueria plugin, get back to root folder running :

```bash
cd ..

taq install @taqueria/plugin-contract-types

taq generate types ./app

cd ./app
```

Start the dev server

```bash
npm run web
```

Open your browser at : http://localhost:3000/
Your app should be running

Issue with process.version

```
npm i -g rn-nodeify
rn-nodeify --install stream,process --hack
```

//TODO

## Step 2 : Connect / disconnect the wallet

We will declare 2 React Button components and a display of address and balance while connected

Edit src/App.tsx file

//TODO

Let's create the 2 missing src component files and put code in it. On src folder, create these files.

```bash
touch app/ConnectWallet.tsx
touch app/DisconnectWallet.tsx
```

ConnectWallet button will create an instance wallet, get user permissions via a popup and then retrieve account information

Edit ConnectWallet.tsx

```typescript
import { NetworkType } from "@airgap/beacon-sdk";
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
      await wallet.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl: "https://ghostnet.tezos.marigold.dev",
        },
      });
      // gets user's address
      const userAddress = await wallet.getPKH();
      const balance = await Tezos.tz.getBalance(userAddress);
      setUserBalance(balance.toNumber());
      setUserAddress(userAddress);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="buttons">
      <button className="button" onClick={connectWallet}>
        <span>
          <i className="fas fa-wallet"></i>&nbsp; Connect with wallet
        </span>
      </button>
    </div>
  );
};

export default ConnectButton;
```

DisconnectWallet button will clean wallet instance and all linked objects

```typescript
import { BeaconWallet } from "@taquito/beacon-wallet";
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
    <div className="buttons">
      <button className="button" onClick={disconnectWallet}>
        <i className="fas fa-times"></i>&nbsp; Disconnect wallet
      </button>
    </div>
  );
};

export default DisconnectButton;
```

Save both file, the dev server should refresh the page

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

Install Expo GO on your phone

```bash
https://expo.dev/client
```

> Note : if you use WSL2 on windows , follow this [instructions](https://gist.github.com/bergmannjg/461958db03c6ae41a66d264ae6504ade)
> Use ngrok : npx expo start --tunnel

or

sudo apt install openjdk-11-jdk-headless gradle
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
...

turn off you firewall
On admin powershell :
New-NetFirewallRule -DisplayName "WSL" -Direction Inbound -InterfaceAlias "vEthernet (WSL)" -Action Allow
New-NetFirewallRule -DisplayName "WSL" -Direction Outbound -InterfaceAlias "vEthernet (WSL)" -Action Allow
usbipd wsl list
usbipd wsl attach --busid 6-1

On wsl :
lsusb

# :palm_tree: Conclusion :sun_with_face:

Play with your friends and follow other Marigold trainings [here](https://www.marigold.dev/learn)
