import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { power } from "ionicons/icons";
import { Dispatch, SetStateAction } from "react";

interface ButtonProps {
  wallet: BeaconWallet;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
}

const DisconnectButton = ({
  wallet,
  setUserAddress,
  setUserBalance,
}: ButtonProps): JSX.Element => {
  const disconnectWallet = async (): Promise<void> => {
    setUserAddress("");
    setUserBalance(0);
    console.log("disconnecting wallet");
    await wallet.clearActiveAccount();
  };

  return (
    <IonFab slot="fixed" vertical="top" horizontal="end">
      <IonFabButton>
        <IonIcon icon={power} onClick={disconnectWallet} />
      </IonFabButton>
    </IonFab>
  );
};

export default DisconnectButton;
