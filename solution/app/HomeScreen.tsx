import { bytes2Char } from "@taquito/utils";
import { BigNumber } from "bignumber.js";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  ImageBackground,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  View
} from "react-native";
import { PAGES, Session, styles, UserContext, UserContextType } from "./App";
import ConnectButton from "./ConnectWallet";
import DisconnectButton from "./DisconnectWallet";
import { TransactionInvalidBeaconError } from "./TransactionInvalidBeaconError";
import { address, nat } from "./type-aliases";
export function HomeScreen({ navigation }: { navigation: any }) {
  const {
    Tezos,
    wallet,
    userAddress,
    userBalance,
    storage,
    mainWalletType,
    setStorage,
    setUserAddress,
    setUserBalance,
    setLoading,
    loading,
  } = React.useContext(UserContext) as UserContextType;

  const [description, setDescription] = useState<string>("");

  const [createGameModalVisible, setCreateGameModalVisible] = useState(false);
  const [selectGameModalVisible, setSelectGameModalVisible] = useState(false);

  const [newPlayer, setNewPlayer] = useState<address>("" as address);
  const [total_rounds, setTotal_rounds] = useState<nat>(
    new BigNumber(1) as nat
  );
  const [myGames, setMyGames] = useState<Map<nat, Session>>();

  useEffect(() => {
    (async () => {
      if (storage) {
        const metadata: any = await storage.metadata.get("contents");
        const myGames = new Map(); //filtering our games
        Array.from(storage.sessions.keys()).forEach((key) => {
          const session = storage.sessions.get(key);

          if (
            session.players.indexOf(userAddress as address) >= 0 &&
            "inplay" in session.result
          ) {
            myGames.set(key, session);
          }
        });
        setMyGames(myGames);
        setDescription(JSON.parse(bytes2Char(metadata)).description);
      } else {
        console.log("storage is not ready yet");
      }
    })();
  }, [storage]);

  const createSession = async () => {
    try {
      setLoading(true);
      setCreateGameModalVisible(!createGameModalVisible);
      const op = await mainWalletType!.methods
        .createSession([userAddress as address, newPlayer], total_rounds)
        .send();
      await op?.confirmation();
      const newStorage = await mainWalletType!.storage();
      setStorage(newStorage);
      setCreateGameModalVisible(false);
      setLoading(false);
      navigation.navigate(PAGES.SESSION, {
        id: storage?.next_session.toString(),
      }); //it was the id created
      console.log("newStorage", newStorage);
    } catch (error) {
      console.table(`Error: ${JSON.stringify(error, null, 2)}`);
      let tibe: TransactionInvalidBeaconError =
        new TransactionInvalidBeaconError(error);
      Alert.alert("Error", tibe.data_message, [{ text: "Close" }]);
      setCreateGameModalVisible(true);
      setLoading(false);
    }
    setLoading(false);
  };

  const renderGameItem = ({ item }: { item: string }) => (
    <View style={styles.item}>
      <Button
        color="#d8464e"
        title={"Game n°" + item}
        onPress={() => {
          setSelectGameModalVisible(false);
          navigation.navigate(PAGES.SESSION, { id: item });
        }}
      ></Button>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={createGameModalVisible}
            onRequestClose={() => {
              setCreateGameModalVisible(!createGameModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <SafeAreaView>
                  <Text style={styles.text}>total rounds</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(str) => {
                      setTotal_rounds(new BigNumber(str) as nat);
                    }}
                    value={total_rounds.toString()}
                    placeholder="total_rounds"
                    keyboardType="numeric"
                  />

                  <Text style={styles.text}>Opponent player</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={(str) => setNewPlayer(str as address)}
                    value={newPlayer}
                    placeholder="tz1..."
                    keyboardType="ascii-capable"
                  />
                </SafeAreaView>
                <View style={{ paddingTop: "20px", margin: "20px" }}>
                  <Button
                    color="#d8464e"
                    onPress={createSession}
                    title="Create"
                  />
                </View>
                <Button
                  color="#d8464e"
                  onPress={() =>
                    setCreateGameModalVisible(!createGameModalVisible)
                  }
                  title="Cancel"
                />
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={selectGameModalVisible}
            onRequestClose={() => {
              setSelectGameModalVisible(!selectGameModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <SafeAreaView>
                  <FlatList
                    data={
                      myGames
                        ? Array.from(myGames.entries()).map(([key, Value]) =>
                            key.toString()
                          )
                        : []
                    }
                    renderItem={renderGameItem}
                    keyExtractor={(item) => item}
                  />
                </SafeAreaView>
                <Button
                  color="#d8464e"
                  onPress={() =>
                    setSelectGameModalVisible(!selectGameModalVisible)
                  }
                  title="Cancel"
                />
              </View>
            </View>
          </Modal>

          {!userAddress ? (
            <>
              <Text style={styles.title}>Shifumi</Text>
              <Text style={styles.text}> Tezos</Text>
              <View
                style={{
                  flexDirection: "row",
                  padding: "4em",
                  justifyContent: "space-around",
                }}
              >
                <ImageBackground
                  source={require("./assets/stone-logo.png")}
                  resizeMode="contain"
                  style={styles.logo}
                />
                <ImageBackground
                  source={require("./assets/paper-logo.png")}
                  resizeMode="cover"
                  style={styles.logo}
                />
                <ImageBackground
                  source={require("./assets/scissor-logo.png")}
                  resizeMode="cover"
                  style={styles.logo}
                />
              </View>
              <View>
                <ConnectButton
                  Tezos={Tezos}
                  setUserAddress={setUserAddress}
                  setUserBalance={setUserBalance}
                  wallet={wallet}
                />
                <View style={{ paddingTop: "20px" }}>
                  <Button color="#d8464e" title="Rules" />
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row-reverse",
                  padding: "5.5em",
                  justifyContent: "space-around",
                }}
              >
                 <ImageBackground
                  source={require("./assets/scissor-logo.png")}
                  resizeMode="cover"
                  style={styles.logo}
                />
                <ImageBackground
                  source={require("./assets/paper-logo.png")}
                  resizeMode="cover"
                  style={styles.logo}
                />
                 <ImageBackground
                  source={require("./assets/stone-logo.png")}
                  resizeMode="contain"
                  style={styles.logo}
                />
              </View>
              <View style={{ padding: 20 }}>
                <DisconnectButton
                  wallet={wallet}
                  setUserAddress={setUserAddress}
                  setUserBalance={setUserBalance}
                />
                <Text style={{ padding: 20, color: "white" }}>
                  I am {userAddress} with {userBalance} mutez
                </Text>
                <View style={{ padding: "20px" }}>
                  <Button
                    color="#d8464e"
                    title="New game"
                    onPress={() => {
                      setCreateGameModalVisible(true);
                    }}
                  />
                </View>

                <View style={{ padding: "20px" }}>
                  <Button
                    color="#d8464e"
                    title="Join game"
                    onPress={() => {
                      setSelectGameModalVisible(true);
                    }}
                  />
                </View>
                <View style={{ padding: "20px" }}>
                  <Button
                    color="#d8464e"
                    title="Top Players"
                    onPress={() => {
                      navigation.navigate(PAGES.TOPPLAYERS);
                    }}
                  />
                </View>
              </View>
            </>
          )}

          <Text style={styles.text}>{description}</Text>
        </View>
      )}
      <StatusBar style="dark" />
    </View>
  );
}
