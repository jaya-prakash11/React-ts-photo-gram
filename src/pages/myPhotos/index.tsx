import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userAuthContext";
import { getPostByUserId } from "@/repository/post.service";
import { DocumentResponse, Post } from "@/types";
import React, { useEffect, useState } from "react";

type Props = {};
type IAppProps = {};
const MyPhotos: React.FunctionComponent<IAppProps> = ({}: Props) => {
  const { user } = useUserAuth();
  const [data, setData] = useState<DocumentResponse[]>([]);

  const getAllPost = async (id: string) => {
    try {
      console.log("id", id);
      const querySnapshot = await getPostByUserId(id);
      console.log("querySnapshot", querySnapshot);
      const tempArray: DocumentResponse[] = [];

      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObject: DocumentResponse = {
            id: doc.id,
            ...data,
          };

          tempArray.push(responseObject);
        });
        setData(tempArray);
      } else {
        console.log("no  datas in post ");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user != null) {
      getAllPost(user.uid);
    }
  }, []);
  console.log("data", data);
  return (
    <Layout>
      <div>My Photos</div>
    </Layout>
  );
};
export default MyPhotos;
