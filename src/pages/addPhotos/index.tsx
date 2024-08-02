import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserAuth } from "@/context/userAuthContext";
import { FileEntry, Post } from "@/types";
import React, { useState } from "react";
import { PhotoMeta } from "./../../types/index";
import { createPost } from "./../../repository/post.service";
import { useNavigate } from "react-router-dom";

type Props = {};
type IAppProps = {};
const AddPhotos: React.FunctionComponent<IAppProps> = ({}: Props) => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({
    files: [],
  });
  const [post, setPost] = useState<Post>({
    caption: "",
    photos: [],
    likes: 0,
    userLikes: [],
    userId: null,
    date: new Date(),
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log("Uploaded File Entry : ", fileEntry.files);
      console.log("The create post is : ", post);
      const PhotoMeta: PhotoMeta[] = fileEntry.files.map((res) => {
        return { cdnUrl: res.cdnUrl, uuid: res.uuid };
      });

      if (user) {
        const newPost = {
          ...post,
          userId: user.uid,
          photos: PhotoMeta,
        };
        console.log("newPost", newPost);
        await createPost(newPost);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="flex-col w-full">
        <div className="flex w-ful justify-center items-center h-14  bg-gray-800">
          <p className="text-white text-xl ">Add Photos</p>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <Label className="mb-4" htmlFor="caption">
                Photo Caption
              </Label>
              <Textarea
                id={"caption"}
                placeholder="Type your message here."
                onChange={(e) => setPost({ ...post, caption: e.target.value })}
              />
            </div>
            <div className="flex flex-col mt-8">
              <Label className="mb-4" htmlFor="caption">
                Photo
              </Label>
              <div className=" flex w-32 h-8">
                <FileUploader fileEntry={fileEntry} onChange={setFileEntry} />
              </div>
            </div>
            <div>
              <button
                className="mt-8 w-32 h-8 bg-gray-800 text-white  rounded-sm"
                type={"submit"}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default AddPhotos;
