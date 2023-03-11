import { useContext } from "react";

import { UserContext } from "../../contexts/userContext";
import useUSDate from "../../hooks/useUSDate";

import ProfileComponent from "../../components/profile.component";

export default function Profile() {
  const { currentUser } = useContext(UserContext);

  const signedUpTime = useUSDate(currentUser.createdAt.toDate());

  if (!currentUser) {
    return (
      <div>
        <p>Please Sign In to access your profile</p>
      </div>
    );
  }
  return (
    <>
      <ProfileComponent />
    </>
  );
}
