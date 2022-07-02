import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { validateEmail } from "../utils/validations";
import firebase from "../utils/firebase";

const LoginForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  const login = () => {
    let error = {};

    if (!formData.email || !formData.password) {
      if (!formData.email) error.email = true;
      if (!formData.password) error.password = true;
    } else if (!validateEmail(formData.email)) {
      error.email = true;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
        });
    }

    setFormError(error);
  };

  const onChange = (e, type) => {
    // console.log("Data: ", e.nativeEvent.text);
    // console.log("Type: ", type);

    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Correo"
        placeholderTextColor="#969696"
        onChange={(e) => onChange(e, "email")}
      />

      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) => onChange(e, "password")}
      />

      <TouchableOpacity onPress={login}>
        <Text style={styles.btnText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <View style={styles.register}>
        <TouchableOpacity onPress={() => toggleForm()}>
          <Text style={styles.btnText}>Registrate</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

function defaultValue() {
  return {
    email: "",
    password: "",
  };
}

export default LoginForm;

const styles = StyleSheet.create({
  btnText: {
    color: "#fff",
    fontSize: 18,
  },

  input: {
    height: 50,
    color: "#FFF",
    width: "80%",
    marginBottom: 25,
    backgroundColor: "#1e3040",
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#1e3040",
  },
  register: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  error: {
    borderColor: "#940c0c",
  },
});
