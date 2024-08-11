import { auth } from "@/firebaseConfig";
import { UserProfile } from "@/types";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { ProfileInfo } from "./../types/index";

type authType = {
  user: User | null;
  logIn: typeof logIn;
  signUp: typeof signUp;
  logOut: typeof logOut;
  googleSignIn: typeof googleSignIn;
  updateProfileInfo: typeof updateProfileInfo;
};

const logIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
const logOut = () => {
  signOut(auth);
};

const googleSignIn = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};
const updateProfileInfo = async (ProfileInfo: ProfileInfo) => {
  const response: ProfileInfo = await updateProfile(ProfileInfo.user, {
    displayName: ProfileInfo.displayName,
    photoURL: ProfileInfo.photoUrl,
  });
};

const authContext = createContext<authType>({
  user: null,
  logIn,
  signUp,
  logOut,
  googleSignIn,
  updateProfileInfo,
});

interface IUserAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<IUserAuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is logged in ", user);
        setUser(user);
      }

      return () => unsubscribe();
    });
  });

  const value: authType = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
    updateProfileInfo,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useUserAuth = () => {
  return useContext(authContext);
};
