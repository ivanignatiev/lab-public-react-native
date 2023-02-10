/* eslint-disable quotes */
/**
 * @format
 * @flow strict-local
 */

import React from "react";

import {
  View,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";

import { useState } from "react";

const InputEmailModal = ({ visible, onSubmit, onCancel }) => {
  const [email, setEmail] = useState("");

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.inputEmailModalCotainer}
      >
        <View>
          <TextInput
            autoFocus={true}
            placeholder="E-mail"
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <View style={{ paddingBottom: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#AAAAAA",
              paddingVertical: 10,
              borderRadius: 10,
            }}
            onPress={() => (email !== "" ? onSubmit(email) : null)}
          >
            <Text style={{
              alignSelf: "center",
              fontSize: 20,
            }}>Update</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingBottom: 20 }}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={{ alignSelf: "center" }}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputEmailModalCotainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    backgroundColor: "#FFFFFF",
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 20,
    paddingHorizontal: 30,
  },
});

export default InputEmailModal;
