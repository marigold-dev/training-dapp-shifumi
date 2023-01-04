import { BeaconWallet } from "@taquito/beacon-wallet";
<<<<<<< HEAD:solution/appREACTNATIVEEXPO/DisconnectWallet.tsx
import React, { Dispatch, SetStateAction } from "react";
=======
import { Dispatch, SetStateAction } from "react";
>>>>>>> main changes:solution/app/DisconnectWallet.tsx
import { Button, View } from "react-native";

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
    <View style={{ padding: 20 }}>
      <Button
        onPress={disconnectWallet}
        color="#2B2A2E"
        title="Disconnect wallet"
      />
    </View>
  );
};

export default DisconnectButton;
