import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext, UserContextType } from "../App";
import { nat } from "../type-aliases";
import Ranking from "../assets/ranking.webp";

export const TopPlayersScreen: React.FC = () => {
  const history = useHistory();
  const { storage, refreshStorage } = React.useContext(
    UserContext
  ) as UserContextType;

  const [ranking, setRanking] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    (async () => {
      if (storage) {
        const ranking = new Map(); //force refresh
        Array.from(storage.sessions.keys()).forEach((key: nat) => {
          const result = storage.sessions.get(key).result;
          if ("winner" in result) {
            const winner = result.winner;
            let score = ranking.get(winner);
            if (score) score++;
            else score = 1;
            ranking.set(winner, score);
          }
        });

        setRanking(ranking);
      } else {
        console.log("storage is not ready yet");
      }
    })();
  }, [storage]);

  /* 2. Get the param */
  return (
    <IonPage className="container">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>Back</IonButton>
          </IonButtons>
          <IonTitle>Top Players</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refreshStorage}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div style={{ marginLeft: "40vw" }}>
          <IonImg
            src={Ranking}
            className="ranking"
            style={{ height: "10em", width: "5em" }}
          />
        </div>

        <IonGrid fixed={true} style={{ color: "white", padding: "2vh" }}>
          <IonRow
            style={{
              backgroundColor: "var(--ion-color-primary)",
            }}
          >
            <IonCol className="col">Address</IonCol>
            <IonCol size="2" className="col">
              Won
            </IonCol>
          </IonRow>

          {ranking && ranking.size > 0
            ? Array.from(ranking).map(([address, count]) => (
                <IonRow
                  style={{
                    backgroundColor: "var(--ion-color-secondary)",
                  }}
                >
                  <IonCol className="col tiny">{address}</IonCol>
                  <IonCol size="2" className="col">
                    {count}
                  </IonCol>
                </IonRow>
              ))
            : []}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
