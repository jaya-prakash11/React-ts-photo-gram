import { db } from "@/firebaseConfig";
import { Post } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "post";

export const createPost = (post: Post) => {
  return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getPosts = () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
  return getDocs(q);
};

export const getPostByUserId = (id: string) => {
  const q = query(collection(db, COLLECTION_NAME), where("userId", "==", id));

  getDocs(q).then((res) => console.log("goo", res.docs));

  return getDocs(q);
};

export const getPost = (id: string) => {
  const q = doc(db, COLLECTION_NAME, id);
  return getDoc(q);
};

export const deletePost = (id: string) => {
  return deleteDoc(doc(db, COLLECTION_NAME, id));
};
