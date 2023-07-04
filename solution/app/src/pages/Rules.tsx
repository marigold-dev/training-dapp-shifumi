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
import Scissor from "../assets/scissor-logo.webp";
import Stone from "../assets/stone-logo.webp";
import Paper from "../assets/paper-logo.webp";
import Clock from "../assets/clock.webp";
import Legend from "../assets/legend.webp";

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
              <IonImg src={Stone} className="logo" />
              Stone (Clenched Fist). Rock beats the scissors by hitting it
            </IonItem>
            <IonItem className="nopm">
              <IonImg src={Paper} className="logo" />
              Paper (open and extended hand) . Paper wins over stone by
              enveloping it
            </IonItem>
            <IonItem className="nopm">
              <IonImg src={Scissor} className="logo" />
              Scissors (closed hand with the two fingers) . Scissors wins paper
              cutting it
            </IonItem>

            <IonItem className="nopm">
              <IonImg src={Clock} className="logo" />
              If you are inactive for more than 10 minutes your opponent can
              claim the victory
            </IonItem>

            <IonItem className="nopm">
              <IonImg src={Legend} className="logo" />
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
