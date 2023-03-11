import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  QuerySnapshot,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBSE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBSE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBSE_APP_ID,
  measurementId: process.envNEXT_PUBLIC_FIREBSE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();

//sign in with Google or create account with Google
googleProvider.setCustomParameters({ promt: "select_account" });

//create Firebase Auth object
export const auth = getAuth();
//create db link
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  const loginTime = new Date();

  if (!userSnapshot.exists()) {
    const { displayName, email, providerData } = userAuth;

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt: loginTime,
        lastLogin: loginTime,
        provider: providerData[0]?.providerId,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message, "color: #bada55");
    }
  }

  // const userData = userSnapshot.data();
  // setCurrentUser(userData)

  try {
    await updateDoc(userDocRef, {
      lastLogin: loginTime,
    });
  } catch (error) {
    console.log("error updating user", error.message, "color: #bada55");
  }
  return userDocRef;
};

export const getUserDocument = async (uid) => {
  const userRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    try {
      await setDoc(userRef, {
        // set some default user data if the user document doesn't exist yet
        createdAt: new Date(),
      });
      const newUserSnapshot = await getDoc(userRef);
      return newUserSnapshot.data();
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGooglePopup = async () => {
  const { user } = await signInWithPopup(auth, googleProvider);
  createUserDocumentFromAuth(user);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

//Pieces Collection

export async function getPiecesCollection() {
  const allPiecesSnapshot = await getDocs(collection(db, "pieces"));

  const pieces = allPiecesSnapshot.docs.map((piece) => ({
    id: piece.id,
    ...piece.data(),
  }));

  return pieces;
}

export async function updatePiece(pieceUpdated) {
  const pieceRef = doc(db, "pieces", pieceUpdated.id);
  await updateDoc(pieceRef, { ...pieceUpdated });
}

export async function placeBid(user, piece, amount) {
  console.log(user);

  const userRef = doc(db, "users", user.uid);
  const pieceRef = doc(db, "pieces", piece.id);

  const timestamp = new Date();
  console.log(timestamp);

  const userBid = {
    pieceId: piece.id,
    pieceName: piece.name,
    bidAmount: amount,
    bidTime: timestamp,
  };
  const pieceBid = {
    userId: user.uid,
    userName: user.displayName,
    bidAmount: amount,
    bidTime: timestamp,
  };
  try {
    await updateDoc(userRef, { bids: arrayUnion(userBid) });
    await updateDoc(pieceRef, {
      currentBid: amount,
      highestBidder: user.displayName,
      bids: arrayUnion(pieceBid),
    });
    console.log("Bid added Successfully");
  } catch (error) {
    console.error("Error adding bid", error);
  }
}

//image storage
const storage = getStorage();

export function imageUpload(image) {
  const imageRef = ref(storage, image);
}
