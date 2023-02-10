import { useState } from "react";

const useInputEmailModal = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");

  const inputEmailModal = {
    open: () => {
      setVisible(true);
    },
    close: () => {
      setVisible(false);
    },
  };

  return {
    visible,
    email,
    inputEmailModal,
  };
};

export default useInputEmailModal;
