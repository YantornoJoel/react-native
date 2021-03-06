import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };
  const [user, setUser] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({
      ...user,
      id: doc.id,
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const deleteUser = async () => {
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate("UsersList");
  };

  const updateUser = async () => {
    const dbRef = firebase.db.collection("users").doc(user.id);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setUser(initialState);
    props.navigation.navigate('UsersList')
  };

  const openConfirmationAlert = () => {
    Alert.alert("Eliminar usuario", "Estas seguro?", [
      { text: "Si", onPress: () => deleteUser() },
      { text: "No", onPress: () => console.log(false) },
    ]);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.name}
          placeholder="Nombre de usuario"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.email}
          placeholder="Email"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.phone}
          placeholder="Celular"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button
          color="green"
          title="Actualizar usuario"
          onPress={() => updateUser()}
        />
      </View>
      <View>
        <Button
          color="red"
          title="Borrar usuario"
          onPress={() => openConfirmationAlert()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default UserDetailScreen;
