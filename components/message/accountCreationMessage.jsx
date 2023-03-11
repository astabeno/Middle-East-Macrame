import { useContext } from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../../contexts/userContext";

export default function AccountCreationMessage() {
  const { currentUser } = useContext(UserContext);
  let displayName = "guest";

  if (currentUser.displayName) {
    displayName = currentUser.displayName;
  }

  return (
    <div
      className="fixed top-24 z-50 left-0 w-full h-full 
                    flex justify-center shadow-md"
    >
      <div className="w-80 h-80 bg-white rounded">
        <div className="w-full p-4">
          <ShieldCheckIcon className="text-green-500 h-20 w-20 mx-auto my-2" />
          <div className="text-center">
            <h2 className="text-green-500 text-[28px] mb-5">
              Greetings {currentUser.displayName}
            </h2>
            <p>
              Thank you for signing up! You can now start bidding on pieces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
