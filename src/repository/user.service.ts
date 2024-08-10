import { db } from "@/firebaseConfig";
import { DocumentResponse, Post, ProfileResponse, UserProfile } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "user";

export const createUser = async (user: UserProfile) => {
  try {
    return await addDoc(collection(db, COLLECTION_NAME), user);
  } catch (error) {
    console.log(error);
  }
};

export const getProfileByUserId = async (userId: string) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId)
    );

    const querySnapshots = await getDocs(q);

    let tempdata: ProfileResponse = {};

    if (querySnapshots.size > 0) {
      querySnapshots.forEach((doc) => {
        let userData = doc.data() as UserProfile;

        tempdata = {
          id: doc.id,
          ...userData,
        };
      });

      return tempdata;
    } else {
      return tempdata;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id: string, user: UserProfile) => {
  try {
    console.log("userId", id);
    return await updateDoc(doc(db, COLLECTION_NAME, id), { ...user });
  } catch (error) {
    console.log(error);
  }
};
