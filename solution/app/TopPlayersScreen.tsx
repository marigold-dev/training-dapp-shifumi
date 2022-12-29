import { Button, View } from "react-native";

export function TopPlayersScreen({ navigation }: { navigation: any }) {
  /* 2. Get the param */
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
