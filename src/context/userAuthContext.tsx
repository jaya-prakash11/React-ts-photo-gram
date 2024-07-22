import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { createContext, useEffect, useState } from "react";

type authType = {
  user: User | null;
  logIn: typeof logIn;
  signUp: typeof signUp;
  logOut: typeof logOut;
  googleSignIn: typeof googleSignIn;
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

const authContext = createContext<authType>({
  user: null,
  logIn,
  signUp,
  logOut,
  googleSignIn,
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
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useUserAuth = () => {
  return createContext(authContext);
};
