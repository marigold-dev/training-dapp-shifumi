import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { PackDataParams } from "@taquito/rpc";
import { MichelCodecPacker } from "@taquito/taquito";
import { BigNumber } from "bignumber.js";
import * as crypto from "crypto";
import { eye, stopCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Action, PAGES, UserContext, UserContextType } from "../App";
import { TransactionInvalidBeaconError } from "../TransactionInvalidBeaconError";
import { bytes, nat, unit } from "../type-aliases";
import Scissor from "../assets/scissor-logo.webp";
import Stone from "../assets/stone-logo.webp";
import Paper from "../assets/paper-logo.webp";

export enum STATUS {
  PLAY = "Play !",
  WAIT_YOUR_OPPONENT_PLAY = "Wait for your opponent move",
  REVEAL = "Reveal your choice now",
  WAIT_YOUR_OPPONENT_REVEAL = "Wait for your opponent to reveal his choice",
  FINISHED = "Game ended",
}

interface SessionScreenProps
  extends RouteComponentProps<{
    id: string;
  }> {}

export const SessionScreen: React.FC<SessionScreenProps> = ({ match }) => {
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  const id: string = match.params.id;

  const {
    Tezos,
    userAddress,
    storage,
    mainWalletType,
    setStorage,
    setLoading,
    loading,
    refreshStorage,
  } = React.useContext(UserContext) as UserContextType;

  const [status, setStatus] = useState<STATUS>();
  const [remainingTime, setRemainingTime] = useState<number>(10 * 60);

  useEffect(() => {
    try {
      const subReveal = Tezos.stream.subscribeEvent({
        tag: "reveal",
        address: import.meta.env.VITE_CONTRACT_ADDRESS!,
      });

      const subNewRound = Tezos.stream.subscribeEvent({
        tag: "newRound",
        address: import.meta.env.VITE_CONTRACT_ADDRESS!,
      });

      subReveal.on("data", (e) => {
        console.log("on reveal event :", e);
        if (!e.result.errors || e.result.errors.length === 0) revealPlay();
        else
          console.log("Warning : here we ignore a failing transaction event");
      });

      subNewRound.on("data", (e) => {
        console.log("on new round event :", e);
        refreshStorage();
      });
    } catch (e) {
      console.log("Error with Smart contract event pooling", e);
    }
  }, []);

  const buildSessionStorageKey = (
    userAddress: string,
    sessionNumber: number,
    roundNumber: number
  ): string => {
    return userAddress + "-" + sessionNumber + "-" + roundNumber;
  };

  const buildSessionStorageValue = (secret: number, action: Action): string => {
    return (
      secret + "-" + (action.cisor ? "cisor" : action.paper ? "paper" : "stone")
    );
  };

  const extractSessionStorageValue = (
    value: string
  ): { secret: number; action: Action } => {
    const actionStr = value.split("-")[1];
    return {
      secret: Number(value.split("-")[0]),
      action:
        actionStr === "cisor"
          ? new Action(true as unit, undefined, undefined)
          : actionStr === "paper"
          ? new Action(undefined, true as unit, undefined)
          : new Action(undefined, undefined, true as unit),
    };
  };

  useEffect(() => {
    if (storage) {
      const session = storage?.sessions.get(new BigNumber(id) as nat);
      console.log(
        "Session has changed",
        session,
        "round",
        session!.current_round.toNumber(),
        "session.decoded_rounds.get(session.current_round)",
        session!.decoded_rounds.get(session!.current_round)
      );
      if (session && ("winner" in session.result || "draw" in session.result)) {
        setStatus(STATUS.FINISHED);
      } else if (session) {
        if (
          session.decoded_rounds &&
          session.decoded_rounds.get(session.current_round) &&
          session.decoded_rounds.get(session.current_round).length === 1 &&
          session.decoded_rounds.get(session.current_round)[0].player ===
            userAddress
        ) {
          setStatus(STATUS.WAIT_YOUR_OPPONENT_REVEAL);
        } else if (
          session.rounds &&
          session.rounds.get(session.current_round) &&
          session.rounds.get(session.current_round).length === 2
        ) {
          setStatus(STATUS.REVEAL);
        } else if (
          session.rounds &&
          session.rounds.get(session.current_round) &&
          session.rounds.get(session.current_round).length === 1 &&
          session.rounds.get(session.current_round)[0].player === userAddress
        ) {
          setStatus(STATUS.WAIT_YOUR_OPPONENT_PLAY);
        } else {
          setStatus(STATUS.PLAY);
        }
      }
    } else {
      console.log("Wait parent to init storage ...");
    }
  }, [storage?.sessions.get(new BigNumber(id) as nat)]);

  //setRemainingTime
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.round(
        (new Date(
          storage?.sessions.get(new BigNumber(id) as nat).asleep!
        ).getTime() -
          Date.now()) /
          1000
      );

      if (diff <= 0) {
        setRemainingTime(0);
      } else {
        setRemainingTime(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [storage?.sessions.get(new BigNumber(id) as nat)]);

  const play = async (action: Action) => {
    const session_id = new BigNumber(id) as nat;
    const current_session = storage?.sessions.get(session_id);
    try {
      setLoading(true);
      const secret = Math.round(Math.random() * 63); //FIXME it should be 654843, but we limit the size of the output hexa because expo-crypto is buggy
      // see https://forums.expo.dev/t/how-to-hash-buffer-with-expo-for-an-array-reopen/64587 or https://github.com/expo/expo/issues/20706 );
      localStorage.setItem(
        buildSessionStorageKey(
          userAddress,
          Number(id),
          storage!.sessions
            .get(new BigNumber(id) as nat)
            .current_round.toNumber()
        ),
        buildSessionStorageValue(secret, action)
      );
      console.log("PLAY - pushing to session storage ", secret, action);
      const encryptedAction = await create_bytes(action, secret);
      console.log(
        "encryptedAction",
        encryptedAction,
        "session_id",
        session_id,
        "current_round",
        current_session!.current_round
      );

      const preparedCall = mainWalletType!.methods.play(
        encryptedAction,
        current_session!.current_round,
        session_id
      );

      const { gasLimit, storageLimit, suggestedFeeMutez } =
        await Tezos.estimate.transfer({
          ...preparedCall.toTransferParams(),
          amount: 1,
          mutez: false,
        });

      console.log({ gasLimit, storageLimit, suggestedFeeMutez });
      const op = await preparedCall.send({
        gasLimit: gasLimit + 1000, //we take a margin +100 for an eventual event in case of paralell execution
        fee: suggestedFeeMutez,
        storageLimit: storageLimit,
        amount: 1,
        mutez: false,
      });

      await op?.confirmation();
      const newStorage = await mainWalletType!.storage();
      setStorage(newStorage);
      setLoading(false);
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

  const revealPlay = async () => {
    const session_id = new BigNumber(id) as nat;
    const current_session = storage?.sessions.get(session_id);

    //fecth from session storage
    const secretActionStr = localStorage.getItem(
      buildSessionStorageKey(
        userAddress,
        session_id.toNumber(),
        current_session!.current_round.toNumber()
      )
    );

    if (!secretActionStr) {
      presentAlert({
        header: "Internal error",
        message:
          "You lose the session storage, no more possible to retrieve secrets, stop Session please",
        buttons: ["Close"],
      });
      setLoading(false);
      return;
    }

    const secretAction = extractSessionStorageValue(secretActionStr);
    console.log("REVEAL - Fetch from session storage", secretAction);

    try {
      setLoading(true);
      const encryptedAction = await packAction(secretAction.action);

      const preparedCall = await mainWalletType!.methods.revealPlay(
        encryptedAction as bytes,
        new BigNumber(secretAction.secret) as nat,
        current_session!.current_round,
        session_id
      );

      const { gasLimit, storageLimit, suggestedFeeMutez } =
        await Tezos.estimate.transfer(preparedCall.toTransferParams());

      //console.log({ gasLimit, storageLimit, suggestedFeeMutez });
      const op = await preparedCall.send({
        gasLimit: gasLimit * 3,
        fee: suggestedFeeMutez,
        storageLimit: storageLimit * 3, //we take a margin in case of paralell execution
      });
      await op?.confirmation();
      const newStorage = await mainWalletType!.storage();
      setStorage(newStorage);
      setLoading(false);
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

  /** Pack an action variant to bytes. Same is Pack.bytes()  */
  async function packAction(action: Action): Promise<string> {
    const p = new MichelCodecPacker();
    let actionbytes: PackDataParams = {
      data: action.stone
        ? { prim: "Right", args: [{ prim: "Unit" }] }
        : action.cisor
        ? { prim: "Left", args: [{ prim: "Left", args: [{ prim: "Unit" }] }] }
        : { prim: "Left", args: [{ prim: "Right", args: [{ prim: "Unit" }] }] },
      type: {
        prim: "Or",
        annots: ["%action"],
        args: [
          {
            prim: "Or",
            args: [
              { prim: "Unit", annots: ["%cisor"] },
              { prim: "Unit", annots: ["%paper"] },
            ],
          },
          { prim: "Unit", annots: ["%stone"] },
        ],
      },
    };
    return (await p.packData(actionbytes)).packed;
  }

  /** Pack an pair [actionBytes,secret] to bytes. Same is Pack.bytes()  */
  async function packActionBytesSecret(
    actionBytes: bytes,
    secret: number
  ): Promise<string> {
    const p = new MichelCodecPacker();
    let actionBytesSecretbytes: PackDataParams = {
      data: {
        prim: "Pair",
        args: [{ bytes: actionBytes }, { int: secret.toString() }],
      },
      type: {
        prim: "pair",
        args: [
          {
            prim: "bytes",
          },
          { prim: "nat" },
        ],
      },
    };
    return (await p.packData(actionBytesSecretbytes)).packed;
  }

  const stopSession = async () => {
    try {
      setLoading(true);
      const op = await mainWalletType!.methods
        .stopSession(new BigNumber(id) as nat)
        .send();
      await op?.confirmation(2);
      const newStorage = await mainWalletType!.storage();
      setStorage(newStorage);
      setLoading(false);
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

  const create_bytes = async (
    action: Action,
    secret: number
  ): Promise<bytes> => {
    const actionBytes = (await packAction(action)) as bytes;
    console.log("actionBytes", actionBytes);
    const bytes = (await packActionBytesSecret(actionBytes, secret)) as bytes;
    console.log("bytes", bytes);

    /* correct implemetation with a REAL library */
    const encryptedActionSecret = crypto
      .createHash("sha512")
      .update(Buffer.from(bytes, "hex"))
      .digest("hex") as bytes;

    console.log("encryptedActionSecret", encryptedActionSecret);
    return encryptedActionSecret;
  };

  const getFinalResult = (): string | undefined => {
    if (storage) {
      const result = storage.sessions.get(new BigNumber(id) as nat).result;
      if ("winner" in result && result.winner === userAddress) return "win";
      if ("winner" in result && result.winner !== userAddress) return "lose";
      if ("draw" in result) return "draw";
    }
  };

  const isDesktop = () => {
    const { innerWidth } = window;
    if (innerWidth > 800) return true;
    else return false;
  };

  return (
    <IonPage className="container">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>Back</IonButton>
          </IonButtons>
          <IonTitle>Game n°{id}</IonTitle>
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
          <>
            <IonList inset={true} style={{ textAlign: "left" }}>
              {status !== STATUS.FINISHED ? (
                <IonItem className="nopm">Status : {status}</IonItem>
              ) : (
                ""
              )}
              <IonItem className="nopm">
                <span>
                  Opponent :{" "}
                  {storage?.sessions
                    .get(new BigNumber(id) as nat)
                    .players.find((userItem) => userItem !== userAddress)}
                </span>
              </IonItem>

              {status !== STATUS.FINISHED ? (
                <IonItem className="nopm">
                  Round :
                  {Array.from(
                    Array(
                      storage?.sessions
                        .get(new BigNumber(id) as nat)
                        .total_rounds.toNumber()
                    ).keys()
                  ).map((roundId) => {
                    const currentRound: number = storage
                      ? storage?.sessions
                          .get(new BigNumber(id) as nat)!
                          .current_round!.toNumber() - 1
                      : 0;
                    const roundwinner = storage?.sessions
                      .get(new BigNumber(id) as nat)
                      .board.get(new BigNumber(roundId + 1) as nat);

                    return (
                      <div
                        key={roundId + "-" + roundwinner}
                        className={
                          !roundwinner && roundId > currentRound
                            ? "missing"
                            : !roundwinner && roundId === currentRound
                            ? "current"
                            : !roundwinner
                            ? "draw"
                            : roundwinner === userAddress
                            ? "win"
                            : "lose"
                        }
                      ></div>
                    );
                  })}
                </IonItem>
              ) : (
                ""
              )}

              {status !== STATUS.FINISHED ? (
                <IonItem className="nopm">
                  {"Remaining time :" + remainingTime + " s"}
                </IonItem>
              ) : (
                ""
              )}
            </IonList>

            {status === STATUS.FINISHED ? (
              <IonImg
                className={"logo-XXL" + (isDesktop() ? "" : " mobile")}
                src={
                  import.meta.env.VITE_PUBLIC_URL +
                  "/assets/" +
                  getFinalResult() +
                  ".png"
                }
              />
            ) : (
              ""
            )}

            {status === STATUS.PLAY ? (
              <IonList lines="none" style={{ marginLeft: "calc(50vw - 70px)" }}>
                <IonItem style={{ margin: 0, padding: 0 }}>
                  <IonButton
                    style={{ height: "auto" }}
                    onClick={() =>
                      play(new Action(true as unit, undefined, undefined))
                    }
                  >
                    <IonImg src={Scissor} className="logo" />
                  </IonButton>
                </IonItem>
                <IonItem style={{ margin: 0, padding: 0 }}>
                  <IonButton
                    style={{ height: "auto" }}
                    onClick={() =>
                      play(new Action(undefined, true as unit, undefined))
                    }
                  >
                    <IonImg src={Paper} className="logo" />
                  </IonButton>
                </IonItem>
                <IonItem style={{ margin: 0, padding: 0 }}>
                  <IonButton
                    style={{ height: "auto" }}
                    onClick={() =>
                      play(new Action(undefined, undefined, true as unit))
                    }
                  >
                    <IonImg src={Stone} className="logo" />
                  </IonButton>
                </IonItem>
              </IonList>
            ) : (
              ""
            )}

            {status === STATUS.REVEAL ? (
              <IonButton onClick={() => revealPlay()}>
                <IonIcon icon={eye} />
                Reveal
              </IonButton>
            ) : (
              ""
            )}
            {remainingTime === 0 && status !== STATUS.FINISHED ? (
              <IonButton onClick={() => stopSession()}>
                <IonIcon icon={stopCircle} />
                Claim victory
              </IonButton>
            ) : (
              ""
            )}
          </>
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
    </IonPage>
  );
};
