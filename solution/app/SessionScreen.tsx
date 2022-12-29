import { Button, Text, View } from "react-native";

export function SessionScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  /* 2. Get the param */
  const { id } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{id}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
