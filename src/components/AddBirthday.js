import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import firebase from "../utils/firebase";
import "firebase/firestore";

// firebase.firestore().settings({
//   experimentalForceLongPolling: true,
// });
const db = firebase.firestore(firebase);

const AddBirthday = ({ user, setShowList, setReloadData }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    const dateBrith = date;
    dateBrith.setHours(0);
    dateBrith.setMinutes(0);
    dateBrith.setSeconds(0);
    setFormData({
      ...formData,
      dateBrith,
    });
    hideDatePicker();
  };


  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  const onSubmit = () => {
    let error = {};
    if (!formData.name || !formData.lastname || formData.dateBrith) {
      if (!formData.name) error.name = true;
      if (!formData.lastname) error.lastname = true;
      if (!formData.dateBrith) error.dateBrith = true;
    }
    if (formData.name && formData.lastname && formData.dateBrith) {
      const date = formData;
      date.dateBrith.setYear(0);
      db.collection(user.uid)
        .add(date)
        .then(() => {
          setReloadData(true);
          setShowList(true)
        })
        .catch(() =>
          setFormError({ name: true, lastname: true, dateBrith: true })
        );
    }
    console.log(error);
    setFormError(error);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  }; 
  return (
    <>
      <View style={styles.container}>
        <TextInput
          placeholder="Nombre"
          placeholderTextColor="#969696"
          style={[styles.input, formError.name && { borderColor: "#f00" }]}
          onChange={(e) => onChange(e, "name")}
        />

        <TextInput
          placeholder="Apellidos"
          placeholderTextColor="#969696"
          style={[styles.input, formError.lastname && { borderColor: "#f00" }]}
          onChange={(e) => onChange(e, "lastname")}
        />

        <View
          style={[
            styles.input,
            styles.datePicker,
            formError.dateBrith && { borderColor: "#f00" },
          ]}
        >
          <Text
            onPress={showDatePicker}
            style={{
              color: formData.dateBrith ? "#FFF" : "#969696",
              fontSize: 18,
            }}
          >
            {formData.dateBrith
              ? moment(formData.dateBrith).format("LL")
              : "Fecha de nacimiento"}
          </Text>
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <Text style={styles.addButton}>Crear cumpleaños</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: 50,
    color: "#FFF",
    width: "80%",
    marginBottom: 25,
    backgroundColor: "#1e3040",
    paddingHorizontal: 20,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#1e3040",
    borderRadius: 50,
  },

  datePicker: {
    justifyContent: "center",
  },
  textDate: {
    color: "#969696",
    fontSize: 18,
  },
  addButton: {
    fontSize: 18,
    color: "#FFF",
  },
});

export default AddBirthday;
