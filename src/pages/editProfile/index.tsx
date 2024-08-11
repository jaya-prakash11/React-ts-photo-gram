import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileEntry, ProfileInfo, UserProfile } from "@/types";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProfileImage3 from "../../assets/images/profileimg3.jpeg";
import { Input } from "@/components/ui/input";
import { createUser, updateUser } from "@/repository/user.service";
import { useUserAuth } from "@/context/userAuthContext";
import { updateUserInfoOnPosts } from "@/repository/post.service";

type Props = {};
type IAppProps = {};
const EditProfile: React.FunctionComponent<IAppProps> = ({}: Props) => {
  const { user, updateProfileInfo } = useUserAuth();
  const location = useLocation();
  const { id, userId, userBio, displayName, photoUrl } = location.state;

  console.log("asdasdsad", { id, userId, userBio, displayName, photoUrl });
  const [fileEntry, setFileEntry] = React.useState<FileEntry>({
    files: [],
  });
  const navigate = useNavigate();

  const [data, setData] = useState<UserProfile>({
    id,
    userId,
    userBio,
    displayName,
    photoUrl,
  });

  console.log("fileEntry", { id, userId, userBio, displayName, photoUrl });
  const handleUpdate = async (e: React.MouseEvent<HTMLFormElement>) => {
    console.log("dataiiii", data);
    e.preventDefault();
    try {
      if (fileEntry?.files[0]?.cdnUrl) {
        data.photoUrl = fileEntry?.files[0].cdnUrl;
      }
      if (id) {
        const response = await updateUser(id, data);
        console.log(response);
      } else {
        const response = await createUser(data);
        console.log(response);
      }
      navigate("/profile");

      const profileInfo: ProfileInfo = {
        user: user!,
        displayName: data.displayName,
        photoUrl: data.photoUrl,
      };

      updateProfileInfo(profileInfo);
      updateUserInfoOnPosts(profileInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex-col w-full">
        <div className="flex w-ful justify-center items-center h-14  bg-gray-800">
          <p className="text-white text-xl ">Edit Profile</p>
        </div>
        <div className="p-8">
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col">
              <Label className="mb-4" htmlFor="profilePicture">
                Profile Picture
              </Label>
              <div className="flex flex-col justify-start items-start w-auto h-auto gap-5 ">
                <div
                  style={{
                    backgroundImage: `url(${
                      fileEntry?.files[0]?.cdnUrl || data.photoUrl
                    })`,
                  }}
                  className="flex  h-28 w-28 rounded-full border border-black bg-cover bg-center"
                ></div>

                <FileUploader fileEntry={fileEntry} onChange={setFileEntry} />
              </div>
              <div className="flex flex-col mt-10">
                <Label className="mb-4" htmlFor="displayName">
                  Display Name
                </Label>
                <Input
                  id={"displayName"}
                  value={data.displayName}
                  placeholder="Type your message here."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setData({ ...data, displayName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col mt-10">
                <Label className="mb-4" htmlFor="userBio">
                  User Bio
                </Label>
                <Textarea
                  id={"userBio"}
                  placeholder="Type your message here."
                  value={data.userBio}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setData({ ...data, userBio: e.target.value })
                  }
                />
              </div>
              {/* <Textarea
                id={"caption"}
                placeholder="Type your message here."
                //    onChange={(e) => setPost({ ...post, caption: e.target.value })}
              /> */}
            </div>

            <div className="flex gap-10">
              <Button
                className="mt-8 w-32 h-8 bg-gray-800 text-white  rounded-sm"
                type={"submit"}
              >
                Update
              </Button>
              <Button
                variant={"destructive"}
                className="mt-8 w-32 h-8 bg-gray-800 text-white  rounded-sm"
                onClick={() => navigate("/profile")}
              >
                Delete
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default EditProfile;
