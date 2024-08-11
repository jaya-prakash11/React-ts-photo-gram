import { db } from "@/firebaseConfig";
import { DocumentResponse, Post, ProfileInfo, UserProfile } from "@/types";
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

const COLLECTION_NAME = "post";

export const createPost = (post: Post) => {
  return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getPosts = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
    const querySnapshots = await getDocs(q);
    let tempArray: DocumentResponse[] = [];

    if (querySnapshots.size > 0) {
      querySnapshots.forEach((res) => {
        const data = res.data() as Post;

        const response = {
          id: res.id,
          ...data,
        };
        tempArray.push(response);
      });

      return tempArray;
    } else {
      console.log("there is no data");
    }
  } catch (error) {
    console.log(error);
  }
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

export const updateLikesOnPost = (
  id: string,
  userLikes: string[],
  likes: number
) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return updateDoc(docRef, { likes, userLikes });
};

export const updateUserInfoOnPosts = async (ProfileInfo: ProfileInfo) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", ProfileInfo.user?.uid)
    );

    const querySnapshots = await getDocs(q);

    if (querySnapshots.size > 0) {
      querySnapshots.forEach((res) => {
        const docRef = doc(db, COLLECTION_NAME, res.id);

        console.log("kiokio", res);

        updateDoc(docRef, {
          username: ProfileInfo.displayName,
          photoURL: ProfileInfo.photoUrl,
        });
      });
    } else {
      console.log("dont have any posts");
    }
  } catch (err) {
    console.log(err);
  }
};
