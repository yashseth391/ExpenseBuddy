import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { useEffect, useState } from "react";

const loadDatabase = async () => {
  const dbName = "users.db";
  const dbAsset = require("./assets/users.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function App() {
  const [dbLoaded, setDbloaded] = useState<boolean>(false);

  useEffect(() => {
    loadDatabase()
      .then(() => {
        setDbloaded(true);
      })
      .catch((e) => console.log(e));
  }, []);

  if (dbLoaded)
    return (
      <View>
        <ActivityIndicator size={"large"} />
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
