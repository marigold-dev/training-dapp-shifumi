import { IonAvatar, IonChip, IonImg, IonLabel } from "@ionic/react";
import { address } from "../type-aliases";

export enum SOCIAL_ACCOUNT_TYPE {
  google = "google",
  twitter = "twitter",
  // facebook = "facebook",
  github = "github",
  gitlab = "gitlab",
  // microsoft = "microsoft",
  slack = "slack",
  //reddit = "reddit",
  //telegram = "telegram",
}

export type UserProfile = {
  displayName: string;
  socialAccountType: SOCIAL_ACCOUNT_TYPE;
  socialAccountAlias: string;
  photo: string;
};

type UserProfileChipProps = {
  userProfiles: Map<address, UserProfile>;
  address: address;
};

export const UserProfileChip = ({
  userProfiles,
  address,
}: UserProfileChipProps) => {
  return (
    <>
      {userProfiles.get(address) ? (
        <IonChip>
          <IonAvatar>
            <img
              alt="o"
              style={{ objectFit: "contain", padding: "0.2em" }}
              src={userProfiles.get(address)?.photo}
            />
          </IonAvatar>
          <IonLabel>
            {userProfiles.get(address)?.displayName +
              " (" +
              userProfiles.get(address)?.socialAccountAlias +
              ") "}
          </IonLabel>
          <IonAvatar>
            <IonImg
              alt="social network"
              style={{ objectFit: "contain", padding: "0.2em" }}
              src={
                process.env.PUBLIC_URL +
                "/assets/" +
                userProfiles.get(address)?.socialAccountType +
                ".png"
              }
            />
          </IonAvatar>
        </IonChip>
      ) : (
        <IonChip className="address">{address}</IonChip>
      )}
    </>
  );
};
