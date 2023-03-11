import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import FlashMessage from "react-flash-message";
import AccountCreationMessage from "./accountCreationMessage";

export default function Message(props) {
  const { text } = props;

  if (text === "ACCOUNT_CREATION_SUCCESS") {
    return (
      <FlashMessage duration={3000}>
        <AccountCreationMessage />
      </FlashMessage>
    );
  } else {
    return <FlashMessage duration={3000}>{text}</FlashMessage>;
  }
}
