import Layout from "@/components/layout";
import PostCard from "@/components/PostCard";
import Stories from "@/components/stories";
import { useUserAuth } from "@/context/userAuthContext";
import { getPosts } from "@/repository/post.service";
import { DocumentResponse } from "@/types";
import { Search } from "lucide-react";

import React, { useEffect, useState } from "react";

type Props = {};
type IAppProps = {};

const Home: React.FunctionComponent<IAppProps> = ({}: Props) => {
  const { user } = useUserAuth();
  const [data, setData] = useState<DocumentResponse[]>();

  async function getAllPost() {
    const response: DocumentResponse[] = await getPosts();
    console.log(response);
    setData(response);
  }

  useEffect(() => {
    if (user !== null || user !== undefined) {
      getAllPost();
    }
  }, []);

  const rendrPost = () => {
    return data?.map((res) => <PostCard data={res} />);
  };

  return (
    <Layout>
      <div className="flex flex-col w-full h-auto">
        <div className="flex w-full h-10 border border-b p-3 justify-center items-center">
          <input className="border-none w-[100%] h-full focus:outline-none"></input>
          <Search className="text-gray-600"></Search>
        </div>
        <div>
          <Stories></Stories>
        </div>
        <div className="flex flex-col w-full justify-center items-center mt-7">
          {data ? rendrPost() : <div>....Loading </div>}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
