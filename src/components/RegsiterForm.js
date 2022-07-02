import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import firebase from "../utils/firebase";
import React, { useState } from "react";
import { validateEmail } from "../utils/validations";

const RegsiterForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState(defaultValue());
  const [formError, setFormError] = useState({});

  const register = () => {
    let errors = {};
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
      if (!formData.repeatPassword) errors.repeatPassword = true;
    }
    if (!validateEmail(formData.email)) {
      errors.email = true;
    }
    if (formData.password !== formData.repeatPassword) {
      errors.password = true;
      errors.repeatPassword = true;
    }
    if (formData.password.length < 6) {
      errors.password = true;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .catch(() => {
          setFormError({
            email: true,
            password: true,
            repeatPassword: true,
          });
        });
    }

    setFormError(errors);
  };
  console.log(formError);
  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Correo"
        placeholderTextColor="#969696"
        onChange={(e) =>
          setFormData({ ...formData, email: e.nativeEvent.text })
        }
      />

      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({ ...formData, password: e.nativeEvent.text })
        }
      />

      <TextInput
        style={[styles.input, formError.repeatPassword && styles.error]}
        placeholder="Repetir Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({ ...formData, repeatPassword: e.nativeEvent.text })
        }
      />

      <TouchableOpacity onPress={() => register()}>
        <Text style={styles.btnText}>Registrate</Text>
      </TouchableOpacity>

      <View style={styles.login}>
        <TouchableOpacity onPress={() => toggleForm()}>
          <Text style={styles.btnText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

function defaultValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

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

  login: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },

  error: {
    borderColor: "#940c0c",
  },
});

export default RegsiterForm;
