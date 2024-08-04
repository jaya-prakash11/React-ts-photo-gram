import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userAuthContext";
import { getPostByUserId } from "@/repository/post.service";
import { DocumentResponse, Post } from "@/types";
import { Img } from "@uploadcare/blocks";
import { Heart, HeartIcon, HeartOff } from "lucide-react";
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
      <div className="flex-col w-full">
        <div className="flex w-ful justify-center items-center h-14  bg-gray-800">
          <p className="text-white text-xl ">My Photos</p>
        </div>
        <div className="flex w-full flex-wrap mt-7 gap-2">
          {data.map((res: any) => {
            return (
              <div className="group flex w-1/4 h-52 relative cursor-pointer">
                <img
                  src={res?.photos[0].cdnUrl}
                  alt="Image"
                  className="w-full h-full object-cover"
                />
                <div className="flex w-full h-full absolute inset-0 bg-black opacity-0 hover:opacity-70 transition-opacity duration-300">
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <HeartIcon className=" fill-white group-hover:text-white transition-colors duration-300" />
                    <p className="text-white group-hover:text-slate-50 transition-colors duration-300">
                      {" "}
                      {res.likes}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};
export default MyPhotos;
