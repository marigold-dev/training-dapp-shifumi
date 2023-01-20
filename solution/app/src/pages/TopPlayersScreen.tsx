import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

export const TopPlayersScreen: React.FC = () => {
  const history = useHistory();

  /* 2. Get the param */
  return (
    <IonPage className="container">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Top Players</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={() => history.goBack()}>Go back</IonButton>
      </IonContent>
    </IonPage>
  );
};
