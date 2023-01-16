import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { styles } from "../App";

export function TopPlayersScreen() {
  /* 2. Get the param */
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
        <IonButton
          color="#d8464e"
          title="Go back"
          onClick={() => history.back()}
        />
      </IonContent>
    </IonPage>
  );
}
