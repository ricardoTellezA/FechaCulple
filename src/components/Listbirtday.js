import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import moment from "moment";
import AddBirthday from "./AddBirthday";
import ActionBar from "./ActionBar";
import Birthday from "./Birthday";
import firebase from "../utils/firebase";
import "firebase/firestore";

const db = firebase.firestore(firebase);

const Listbirtday = ({ user }) => {
  const [showList, setShowList] = useState(true);
  const [birthdays, setBirthdays] = useState([]);
  const [pasatBirthdays, setPasatBirthdays] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    setBirthdays([]);
    setPasatBirthdays([]);
    db.collection(user.uid)
      .orderBy("dateBrith", "asc")
      .get()
      .then((response) => {
        const itemsArray = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          itemsArray.push(data);
        });
        formatData(itemsArray);
      });
    setReloadData(false);
  }, [reloadData]);

  const formatData = (items) => {
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const birthdayTempArray = [];
    const pasatBirthdayTempArray = [];

    items.forEach((item) => {
      const dateBrith = new Date(item.dateBrith.seconds * 1000);
      const dateBirthday = moment(dateBrith);
      const currentYear = moment().get("year");
      dateBirthday.set({ year: currentYear });

      const diffDate = currentDate.diff(dateBirthday, "days");
      const itemTemp = item;
      itemTemp.dateBrith = dateBirthday;
      itemTemp.days = diffDate;

      if (diffDate <= 0) {
        birthdayTempArray.push(itemTemp);
      } else {
        pasatBirthdayTempArray.push(itemTemp);
      }
    });

    setBirthdays(birthdayTempArray);
    setPasatBirthdays(pasatBirthdayTempArray);
  };

  const deleteBirthday = (birtday) => {
    console.log(birtday);
    Alert.alert(
      "Eliminar cumpleaños",
      `¿Estas seguro de que quieres eliminar el cumpleaños de ${birtday.name} ${birtday.lastname}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
           db.collection(user.uid).doc(birtday.id).delete().then(() => {
            setReloadData(true);
           }).catch(() => {});
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      {showList ? (
        <ScrollView style={styles.scrollView}>
          {birthdays.map((item, index) => (
            <Birthday deleteBirthday={deleteBirthday} key={index} item={item} />
          ))}
          {pasatBirthdays.map((item, index) => (
            <Birthday deleteBirthday={deleteBirthday} key={index} item={item} />
          ))}
        </ScrollView>
      ) : (
        <AddBirthday
          setReloadData={setReloadData}
          user={user}
          setShowList={setShowList}
        />
      )}

      <ActionBar setShowList={setShowList} showList={showList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
  },
  scrollView: {
    marginBottom: 50,
    width: "100%",
  },
});

export default Listbirtday;
