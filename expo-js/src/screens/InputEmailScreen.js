import * as React from "react";
import { Touchable, TouchableOpacity, View, Text } from "react-native";

import useInputEmailModal from "../hooks/useInputEmailModal";
import InputEmailModal from "../modals/InputEmailModal";

const InputEmailScreen = () => {
  const { visible, inputEmailModal } = useInputEmailModal();
  const [email, setEmail] = React.useState("");

  return (
    <View>
      <Text>E-mail:</Text>
      <Text>{email}</Text>
      <TouchableOpacity onPress={inputEmailModal.open}>
        <Text
          style={{
            textDecorationLine: "underline",
          }}
        >
          Edit
        </Text>
      </TouchableOpacity>
      <InputEmailModal
        visible={visible}
        onCancel={inputEmailModal.close}
        onSubmit={(email) => {
          setEmail(email);
          inputEmailModal.close();
        }}
      />
    </View>
  );
};

export default InputEmailScreen;
