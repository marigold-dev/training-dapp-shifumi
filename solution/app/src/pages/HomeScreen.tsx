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
import { useHistory } from "react-router-dom";
import { PAGES, Session, UserContext, UserContextType } from "../App";
import ConnectButton from "../ConnectWallet";
import DisconnectButton from "../DisconnectWallet";
import { TransactionInvalidBeaconError } from "../TransactionInvalidBeaconError";
import { address, nat } from "../type-aliases";
import { TopPlayersScreen } from "./TopPlayersScreen";

export function HomeScreen() {
  const [presentAlert] = useIonAlert();
  const history = useHistory();

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
      history.push(PAGES.SESSION, {
        id: storage?.next_session.toString(),
      }); //it was the id created
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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading ? (
          <div className="loading">
            <IonItem>
              <IonLabel>Refreshing ...</IonLabel>
              <IonSpinner></IonSpinner>
            </IonItem>
          </div>
        ) : (
          <div>
            <IonModal ref={createGameModal} trigger="createGameModalVisible">
              <div className="centeredView">
                <div className="modalView">
                  <div>
                    <IonLabel className="text">total rounds</IonLabel>
                    <IonInput
                      className="input"
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

                    <IonLabel className="text">Opponent player</IonLabel>
                    <IonInput
                      className="input"
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
                    <IonButton onClick={createSession} id="createGameModal">
                      Create
                    </IonButton>
                  </div>
                  <IonButton onClick={() => dismissCreateGameModal()}>
                    Cancel
                  </IonButton>
                </div>
              </div>
            </IonModal>

            <IonModal ref={selectGameModal} trigger="selectGameModalVisible">
              <div className="centeredView">
                <div className="modalView">
                  <div>
                    <IonList inset={true}>
                      {myGames
                        ? Array.from(myGames.entries()).map(([key, Value]) => (
                            <IonItem>
                              <div className="item">
                                <IonButton
                                  onClick={() => {
                                    history.push(PAGES.SESSION, {
                                      id: key.toString(),
                                    });
                                  }}
                                >
                                  {"Game n°" + key.toString()}
                                </IonButton>
                              </div>
                            </IonItem>
                          ))
                        : []}
                    </IonList>
                  </div>
                  <IonButton onClick={() => dismissSelectGameModal()}>
                    Cancel
                  </IonButton>
                </div>
              </div>
            </IonModal>

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
                <div>
                  <ConnectButton
                    Tezos={Tezos}
                    setUserAddress={setUserAddress}
                    setUserBalance={setUserBalance}
                    wallet={wallet}
                  />
                  <div style={{ paddingTop: 20 }}>
                    <IonButton>Rules</IonButton>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 5.5,
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
                    <IonButton id="createGameModalVisible">New game</IonButton>
                  </div>

                  <div style={{ padding: 20 }}>
                    <IonButton id="selectGameModalVisible">Join game</IonButton>
                  </div>
                  <IonNavLink
                    style={{ padding: 20 }}
                    routerDirection="forward"
                    component={() => <TopPlayersScreen />}
                  >
                    <IonButton>Top Players</IonButton>
                  </IonNavLink>
                </div>
              </>
            )}

            <IonLabel className="text">{description}</IonLabel>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
