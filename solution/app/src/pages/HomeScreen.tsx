import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNavLink,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { bytes2Char } from "@taquito/utils";
import { BigNumber } from "bignumber.js";
import React, { useEffect, useRef, useState } from "react";
import { PAGES, Session, styles, UserContext, UserContextType } from "../App";
import ConnectButton from "../ConnectWallet";
import DisconnectButton from "../DisconnectWallet";
import { TransactionInvalidBeaconError } from "../TransactionInvalidBeaconError";
import { address, nat } from "../type-aliases";
import { TopPlayersScreen } from "./TopPlayersScreen";

export function HomeScreen() {
  const [presentAlert] = useIonAlert();

  const createGameModal = useRef<HTMLIonModalElement>(null);
  const selectGameModal = useRef<HTMLIonModalElement>(null);
  function dismissCreateGameModal() {
    createGameModal.current?.dismiss();
  }
  function dismissSelectGameModal() {
    selectGameModal.current?.dismiss();
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

  const createSession = async () => {
    try {
      setLoading(true);
      const op = await mainWalletType!.methods
        .createSession([userAddress as address, newPlayer], total_rounds)
        .send();
      await op?.confirmation();
      const newStorage = await mainWalletType!.storage();
      setStorage(newStorage);
      setLoading(false);
      history.pushState(
        {
          id: storage?.next_session.toString(),
        },
        "",
        PAGES.SESSION
      ); //it was the id created
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
    <IonPage style={styles.container}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shifumi</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading ? (
          <div style={styles.loading}>
            <IonItem>
              <IonLabel>Refreshing ...</IonLabel>
              <IonSpinner></IonSpinner>
            </IonItem>
          </div>
        ) : (
          <div>
            <IonModal ref={createGameModal} trigger="createGameModalVisible">
              <div style={styles.centeredView}>
                <div style={styles.modalView}>
                  <div>
                    <IonLabel style={styles.text}>total rounds</IonLabel>
                    <IonInput
                      style={styles.input}
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

                    <IonLabel style={styles.text}>Opponent player</IonLabel>
                    <IonInput
                      style={styles.input}
                      onIonChange={(str) => {
                        if (str.detail.value === undefined) return;
                        setNewPlayer(str.detail.value as address);
                      }}
                      value={newPlayer}
                      placeholder="tz1..."
                      type="text"
                    />
                  </div>
                  <div style={{ paddingTop: 20, margin: 20 }}>
                    <IonButton
                      color="#d8464e"
                      onClick={createSession}
                      title="Create"
                      id="createGameModal"
                    />
                  </div>
                  <IonButton
                    color="#d8464e"
                    onClick={() => dismissCreateGameModal()}
                    title="Cancel"
                  />
                </div>
              </div>
            </IonModal>

            <IonModal ref={selectGameModal} trigger="selectGameModalVisible">
              <div style={styles.centeredView}>
                <div style={styles.modalView}>
                  <div>
                    <IonList inset={true}>
                      {myGames
                        ? Array.from(myGames.entries()).map(([key, Value]) => (
                            <IonItem>
                              <div style={styles.item}>
                                <IonButton
                                  color="#d8464e"
                                  title={"Game n°" + key.toString()}
                                  onClick={() => {
                                    history.pushState(
                                      {
                                        id: key.toString(),
                                      },
                                      "",
                                      PAGES.SESSION
                                    );
                                  }}
                                ></IonButton>
                              </div>
                            </IonItem>
                          ))
                        : []}
                    </IonList>
                  </div>
                  <IonButton
                    color="#d8464e"
                    onClick={() => dismissSelectGameModal()}
                    title="Cancel"
                  />
                </div>
              </div>
            </IonModal>

            {!userAddress ? (
              <>
                <IonLabel style={styles.title}>Shifumi</IonLabel>
                <IonLabel style={styles.text}> Tezos</IonLabel>
                <div
                  style={{
                    flexDirection: "row",
                    padding: 4,
                    justifyContent: "space-around",
                  }}
                >
                  <IonImg
                    src={require("./assets/stone-logo.png")}
                    resizeMode="contain"
                    style={styles.logo}
                  />
                  <IonImg
                    src={require("./assets/paper-logo.png")}
                    resizeMode="cover"
                    style={styles.logo}
                  />
                  <IonImg
                    src={require("./assets/scissor-logo.png")}
                    resizeMode="cover"
                    style={styles.logo}
                  />
                </div>
                <div>
                  <ConnectButton
                    Tezos={Tezos}
                    setUserAddress={setUserAddress}
                    setUserBalance={setUserBalance}
                    wallet={wallet}
                  />
                  <div style={{ paddingTop: 20 }}>
                    <IonButton color="#d8464e" title="Rules" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    flexDirection: "row",
                    padding: 5.5,
                    justifyContent: "space-around",
                  }}
                >
                  <IonImg
                    src={require("./assets/stone-logo.png")}
                    style={styles.logo}
                  />
                  <IonImg
                    src={require("./assets/paper-logo.png")}
                    style={styles.logo}
                  />
                  <IonImg
                    src={require("./assets/scissor-logo.png")}
                    style={styles.logo}
                  />
                </div>
                <div style={{ padding: 20 }}>
                  <DisconnectButton
                    wallet={wallet}
                    setUserAddress={setUserAddress}
                    setUserBalance={setUserBalance}
                  />
                  <IonLabel style={{ padding: 20, color: "white" }}>
                    I am {userAddress} with {userBalance} mutez
                  </IonLabel>
                  <div style={{ padding: 20 }}>
                    <IonButton
                      color="#d8464e"
                      title="New game"
                      id="createGameModalVisible"
                    />
                  </div>

                  <div style={{ padding: 20 }}>
                    <IonButton
                      color="#d8464e"
                      title="Join game"
                      id="selectGameModalVisible"
                    />
                  </div>
                  <IonNavLink
                    style={{ padding: 20 }}
                    routerDirection="forward"
                    component={() => <TopPlayersScreen />}
                  >
                    <IonButton color="#d8464e" title="Top Players" />
                  </IonNavLink>
                </div>
              </>
            )}

            <IonLabel style={styles.text}>{description}</IonLabel>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
