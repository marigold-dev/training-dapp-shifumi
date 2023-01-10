import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext, UserContextType } from "../App";
import { nat } from "../type-aliases";

export const TopPlayersScreen: React.FC = () => {
  const history = useHistory();

  const { storage } = React.useContext(UserContext) as UserContextType;

  const [ranking, setRanking] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    (async () => {
      if (storage) {
        Array.from(storage.sessions.keys()).forEach((key: nat) => {
          let result = storage.sessions.get(key).result;
          console.log("result", result);
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
          <IonTitle>Top Players</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonImg
          src={process.env.PUBLIC_URL + "/assets/ranking.png"}
          className="ranking"
        />

        <IonLabel style={{ color: "white", fontSize: "2em" }}>Ranking</IonLabel>

        <IonGrid style={{ color: "white", padding: "30px" }}>
          <IonRow
            style={{
              backgroundColor: "#d8464e",
              border: "1px solid #ddd",
              padding: "40px",
            }}
          >
            <IonCol
              style={{
                padding: "10px",
              }}
            >
              Address
            </IonCol>
            <IonCol
              style={{
                padding: "10px",
              }}
            >
              Won
            </IonCol>
          </IonRow>

          {ranking && ranking.size > 0
            ? Array.from(ranking).map(([address, count]) => (
                <IonRow
                  style={{
                    backgroundColor: "#2b2a2e",
                    border: "1px solid #ddd",
                    padding: "40px",
                  }}
                >
                  <IonCol
                    style={{
                      padding: "20px",
                      fontSize: "12px",
                    }}
                  >
                    {address}
                  </IonCol>
                  <IonCol
                    style={{
                      padding: "20px",
                    }}
                  >
                    {count}
                  </IonCol>
                </IonRow>
              ))
            : []}
        </IonGrid>

        <IonButton onClick={() => history.goBack()}>Go back</IonButton>
      </IonContent>
    </IonPage>
  );
};
