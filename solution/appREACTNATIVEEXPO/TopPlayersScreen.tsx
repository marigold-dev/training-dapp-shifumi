import React, { useEffect, useState } from "react";
import { Button, ImageBackground, Text, View } from "react-native";
import { styles, UserContext, UserContextType } from "./App";

export function TopPlayersScreen({ navigation }: { navigation: any }) {
  const { storage } = React.useContext(UserContext) as UserContextType;

  const [ranking, setRanking] = useState();

  useEffect(() => {
    (async () => {
      if (storage) {
        let winners: any = [];
        Array.from(storage.sessions.keys()).forEach((key) => {
          winners.push(storage.sessions.get(key).result.winner);
        });
        let ranking = winners.reduce(
          (prev: { [x: string]: number }, cur: string | number) => (
            (prev[cur] = prev[cur] + 1 || 1), prev
          ),
          {}
        );
        delete ranking.undefined;
        setRanking(ranking);
      } else {
        console.log("storage is not ready yet");
      }
    })();
  }, [storage]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#1C1D22",
        padding: "3.5em"
      }}
    >
      <>
      <ImageBackground
              source={require("./assets/ranking.png")}
              resizeMode="contain"
              style={styles.ranking}
            />
      <Text style={{color:"white",fontSize:"2em"}} >Ranking</Text>

              <table style={{ color: "white", padding: "30px" }}>
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#d8464e",
                      border: "1px solid #ddd",
                      padding: "40px",
                    }}
                  >
                    <th
                      style={{
                        padding: "10px",
                      }}
                    >
                      Address
                    </th>
                    <th
                      style={{
                        padding: "10px",
                      }}
                    >
                      Won
                    </th>
                  </tr>
                </thead>
                <tbody>
                {ranking
          ? Object.entries(ranking).map(([key, Value]) => (
                  <tr
                    style={{
                      backgroundColor: "#2b2a2e",
                      border: "1px solid #ddd",
                      padding: "40px",
                    }}
                  >
                    <th
                      style={{
                        padding: "20px",
                        fontSize: "12px",
                      }}
                    >
                      {key}
                    </th>
                    <th
                      style={{
                        padding: "20px",
                      }}
                    >
                      {Value}
                    </th>
                  </tr>
               
            ))
          : []}
           </tbody>
              </table>
        <Button
          color="#d8464e"
          title="Go back"
          onPress={() => navigation.goBack()}
        />
      </>
    </View>
  );
}
