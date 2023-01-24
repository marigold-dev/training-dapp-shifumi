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
                  <IonLabel style={{ fontSize: "0.7em", direction: "rtl" }}>
                    {userAddress}
                  </IonLabel>
                </IonItem>
                <IonItem style={{ padding: 0, margin: 0 }}>
                  <IonImg
                    style={{ height: 24 }}
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
            <IonButton routerLink={PAGES.RULES} expand="full">
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
