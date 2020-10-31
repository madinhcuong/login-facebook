import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleProp,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Facebook from "expo-facebook";

function App() {
  const [userData, setUserData] = useState(null);

  const logIn = async () => {
  
    try {
      await Facebook.initializeAsync({
        appId: "1514635618728353",
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });

      console.log("token", token);

      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            setUserData(data);
          })
          .catch((e) => console.log(e));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

 const logout = () => {
    setUserData(null);
  }

  return userData ? (
    <View style={styles.myClass}>
      <Image
        style={{ width: 200, height: 200, borderRadius: 50 }}
        source={{ uri: userData.picture.data.url }}
      />
      <Text style={{ fontSize: 22, marginVertical: 10 }}>
        Hi {userData.name}!
      </Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={{ color: "#fff" }}>Logout</Text>
          </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.myClass}>
      <TouchableOpacity onPress={logIn} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  myClass: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  myOtherClass: {
    color: "#000",
  },
  loginBtn: {
    width: "50%",
    height: 40,
    backgroundColor: "#ff890a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 0,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
  logoutBtn: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: "absolute",
    bottom: 0
  },
});
