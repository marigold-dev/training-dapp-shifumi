import {
  IonButton,
  IonImg,
  IonItem,
  IonLabel,
  IonSpinner,
  useIonAlert,
} from "@ionic/react";
import { PackDataParams } from "@taquito/rpc";
import { MichelCodecPacker } from "@taquito/taquito";
import { BigNumber } from "bignumber.js";
import * as crypto from "crypto";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Action, UserContext, UserContextType } from "../App";
import { TransactionInvalidBeaconError } from "../TransactionInvalidBeaconError";
import { bytes, nat, unit } from "../type-aliases";

export enum STATUS {
  PLAY = "Play !",
  WAIT_YOUR_OPPONENT_PLAY = "Wait for your opponent move",
  REVEAL = "Reveal your choice now",
  WAIT_YOUR_OPPONENT_REVEAL = "Wait for your opponent to reveal his choice",
  FINISHED = "Game ended",
}

export function SessionScreen() {
  const [presentAlert] = useIonAlert();
  const history = useHistory();
  const params = useParams();
  console.log("Calling SessionScreen with state history", params);
  const id: string = params as string;

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

  const [status, setStatus] = useState<STATUS>();
  const [remainingTime, setRemainingTime] = useState<number>(10 * 60);
  const [action, setAction] = useState<Action>();

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
        actionStr == "cisor"
          ? new Action(true as unit, undefined, undefined)
          : actionStr == "paper"
          ? new Action(undefined, true as unit, undefined)
          : new Action(undefined, undefined, true as unit),
    };
  };

  useEffect(() => {
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
        session.decoded_rounds.get(session.current_round).length == 1 &&
        session.decoded_rounds.get(session.current_round)[0].player ==
          userAddress
      ) {
        setStatus(STATUS.WAIT_YOUR_OPPONENT_REVEAL);
      } else if (
        session.rounds &&
        session.rounds.get(session.current_round) &&
        session.rounds.get(session.current_round).length == 2
      ) {
        setStatus(STATUS.REVEAL);
      } else if (
        session.rounds &&
        session.rounds.get(session.current_round) &&
        session.rounds.get(session.current_round).length == 1 &&
        session.rounds.get(session.current_round)[0].player == userAddress
      ) {
        setStatus(STATUS.WAIT_YOUR_OPPONENT_PLAY);
      } else {
        setStatus(STATUS.PLAY);
      }
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
      if (diff <= 0) setRemainingTime(0);
      else setRemainingTime(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const play = async (action: Action) => {
    const session_id = new BigNumber(id) as nat;
    const current_session = storage?.sessions.get(session_id);
    setAction(action);
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
      const op = await mainWalletType!.methods
        .play(encryptedAction, current_session!.current_round, session_id)
        .send();
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

      const op = await mainWalletType!.methods
        .revealPlay(
          encryptedAction as bytes,
          new BigNumber(secretAction.secret) as nat,
          current_session!.current_round,
          session_id
        )
        .send();
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
      history.goBack();
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

  return (
    <div
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1C1D22",
      }}
    >
      {loading ? (
        <div className="loading">
          <IonItem>
            <IonLabel>Refreshing ...</IonLabel>
            <IonSpinner></IonSpinner>
          </IonItem>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: "6em",
              paddingRight: "6em",
              paddingBottom: "4em",
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
            <IonLabel className="text">Session : {id}</IonLabel>
            <IonLabel className="text">
              Round :{" "}
              {"" +
                storage?.sessions.get(new BigNumber(id) as nat).current_round +
                "/" +
                storage?.sessions.get(new BigNumber(id) as nat).total_rounds}
            </IonLabel>
            <IonLabel className="text">Status : {status}</IonLabel>
            <IonLabel className="text">
              {"Remaining time :" + remainingTime + " s"}
            </IonLabel>
            <div style={{ padding: "7px" }}>
              <IonButton
                color="secondary"
                disabled={status !== STATUS.PLAY}
                onClick={() =>
                  play(new Action(true as unit, undefined, undefined))
                }
              >
                Scissor
              </IonButton>
            </div>

            <div style={{ padding: "7px" }}>
              <IonButton
                color="secondary"
                disabled={status !== STATUS.PLAY}
                onClick={() =>
                  play(new Action(undefined, true as unit, undefined))
                }
              >
                Paper
              </IonButton>
            </div>

            <div style={{ padding: "7px" }}>
              <IonButton
                color="secondary"
                disabled={status !== STATUS.PLAY}
                onClick={() =>
                  play(new Action(undefined, undefined, true as unit))
                }
              >
                Stone
              </IonButton>
            </div>

            <div style={{ padding: "7px", paddingTop: "30px" }}>
              <IonButton
                disabled={status !== STATUS.REVEAL}
                onClick={() => revealPlay()}
              >
                Reveal
              </IonButton>
            </div>

            <div style={{ padding: "7px" }}>
              <IonButton
                disabled={remainingTime != 0}
                onClick={() => stopSession()}
              >
                Stop session
              </IonButton>
            </div>
            <div style={{ padding: "7px" }}>
              <IonButton onClick={() => history.goBack()}>Go back</IonButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
