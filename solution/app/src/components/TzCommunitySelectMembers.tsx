import { IonIcon, IonSelect, IonSelectOption, IonToggle } from "@ionic/react";
import { TezosToolkit } from "@taquito/taquito";
import * as api from "@tzkt/sdk-api";
import { BigNumber } from "bignumber.js";
import { globeOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { BigMap, address, unit } from "../type-aliases";
import { UserProfile, UserProfileChip } from "./TzCommunityUserProfileChip";
import { MainWalletType, Storage } from "./tzcommunity.types";

const TZCOMMUNITY_CONTRACT_ADDRESS = "KT1KpqE5kfor9fmoDTNMAjoKeLpKRv4ooEZw";

export type Organization = {
  admins: Array<address>;
  autoRegistration: boolean;
  business: string;
  fundingAddress: { Some: address } | null;
  ipfsNftUrl: string;
  logoUrl: string;
  memberRequests: Array<{
    joinRequest: {
      orgName: string;
      reason: string;
    };
    user: address;
  }>;
  members: BigMap<address, unit>;
  name: string;
  siteUrl: string;
  status: { active: unit } | { frozen: unit } | { pendingApproval: unit };
};

type SelectMembersProps = {
  member: address;
  setMember: React.Dispatch<React.SetStateAction<address>>;
  Tezos: TezosToolkit;
};

export const SelectMembers = ({
  member,
  setMember,
  Tezos,
}: SelectMembersProps) => {
  api.defaults.baseUrl = "https://api.ghostnet.tzkt.io";

  const [storage, setStorage] = useState<Storage>();

  useEffect(() => {
    (async () => {
      const mainWalletType: MainWalletType =
        await Tezos.wallet.at<MainWalletType>(TZCOMMUNITY_CONTRACT_ADDRESS);
      const storage = await mainWalletType!.storage();
      setStorage(storage);

      await Promise.all(
        storage!.organizations.map(async (orgItem: Organization) => {
          const membersBigMapId = (
            orgItem.members as unknown as { id: BigNumber }
          ).id.toNumber();

          const keys = await api.bigMapsGetKeys(membersBigMapId, {
            micheline: "Json",
            active: true,
          });
          (
            orgItem as Organization & { membersMap: Map<address, unit> }
          ).membersMap = new Map<address, unit>();
          if (keys) {
            //cache userprofiles
            for (const key of keys) {
              (
                orgItem as Organization & { membersMap: Map<address, unit> }
              ).membersMap.set(key.key, true as unit);
            }
          }
        })
      );
    })();
  }, []);

  const [organizationName, setOrganizationName] = useState<String>();
  const [organization, setOrganization] = useState<Organization>();
  const [userProfiles, setUserProfiles] = useState<Map<address, UserProfile>>(
    new Map()
  );

  const [useTzCommunity, setUseTzCommunity] = useState<boolean>(false);

  return (
    <div style={{ width: "100%" }}>
      <IonToggle
        checked={useTzCommunity}
        enableOnOffLabels={true}
        labelPlacement="start"
        onIonChange={() => {
          setUseTzCommunity(!useTzCommunity);
        }}
      >
        Use TzCommunity groups ?<br />
      </IonToggle>

      {useTzCommunity ? (
        <div
          style={{
            borderStyle: "groove",
            marginTop: "1em",
            padding: "0.5em",
            backgroundColor: "var(--ion-color-secondary)",
          }}
        >
          <a
            href={"https://tezos-community.gcp-npr.marigold.dev"}
            target="_blank"
          >
            <IonIcon icon={globeOutline} />
            Manage groups on TzCommunity
          </a>

          <IonSelect
            label="Select group"
            labelPlacement="floating"
            value={organizationName}
            onIonChange={(str) => {
              if (
                !(
                  str.detail.value === undefined ||
                  !str.target.value ||
                  str.target.value === ""
                )
              ) {
                setOrganization(
                  storage?.organizations.filter(
                    (org) => org.name === str.target.value
                  )[0]
                );
                setOrganizationName(str.target.value);
              }
            }}
          >
            {" "}
            {storage?.organizations.map((org) => (
              <IonSelectOption key={org.name} value={org.name}>
                {org.name}
              </IonSelectOption>
            ))}
          </IonSelect>

          {organizationName ? (
            <IonSelect
              class="select-text"
              label="Select member"
              labelPlacement="floating"
              value={member}
              onIonChange={(str) => {
                if (
                  !(
                    str.detail.value === undefined ||
                    !str.target.value ||
                    str.target.value === ""
                  )
                ) {
                  setMember(str.target.value);
                }
              }}
            >
              {[
                ...(
                  organization! as Organization & {
                    membersMap: Map<address, unit>;
                  }
                ).membersMap.keys(),
              ].map((address) => (
                <IonSelectOption key={address} value={address}>
                  <UserProfileChip
                    address={address}
                    key={address}
                    userProfiles={userProfiles}
                  />
                </IonSelectOption>
              ))}
            </IonSelect>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
