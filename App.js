import React, { useState, useEffect } from "react";
import { decode,encode } from "base-64";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,

} from "react-native";
import firebase from "./src/utils/firebase";
import "firebase/auth";
import Auth from "./src/components/Auth";
import Listbirtday from "./src/components/Listbirtday";


if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;

const App = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        {user ? <Listbirtday user={user}/> : <Auth />}
      </SafeAreaView>
    </>
  );
};



export default App;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#15212b",
    height: "100%",
  },
});
