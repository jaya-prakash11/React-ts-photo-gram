import { DocumentResponse } from "@/types";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import ProfileImage3 from "../../assets/images/profileimg3.jpeg";
import { CloudCog, CloudDrizzle, Heart, MessageCircle } from "lucide-react";
import { useUserAuth } from "@/context/userAuthContext";
import { cn } from "@/lib/utils";
import { updateLikesOnPost } from "@/repository/post.service";

type Props = {
  data: DocumentResponse;
  onChange: () => void;
};
type IAppProps = {
  data: DocumentResponse;
  onChange: () => void;
};
const PostCard: React.FunctionComponent<IAppProps> = ({
  data,
  onChange,
}: Props) => {
  const { user } = useUserAuth();
  const [userInfo, setUserInfo] = useState<{ likes: number; isLike: boolean }>({
    likes: data.likes,
    isLike: data.userLikes.includes(user?.uid) ? true : false,
  });

  useEffect(() => {
    setUserInfo({
      likes: data.likes,
      isLike: data.userLikes.includes(user?.uid) ? true : false,
    });
  }, [data]);

  const updateLikes = async (val: boolean) => {
    setUserInfo({
      likes: val ? userInfo.likes + 1 : userInfo.likes - 1,
      isLike: val,
    });

    if (val) {
      data.userLikes.push(user?.uid);
    } else {
      data.userLikes.splice(data.userLikes.indexOf(user?.uid), 1);
    }

    await updateLikesOnPost(
      data.id,
      data.userLikes,
      val ? userInfo.likes + 1 : userInfo.likes - 1
    );

    onChange();
  };

  console.log("data.likes", data.likes);
  return (
    <div className="flex w-1/3 mt-3">
      <Card className="flex w-full flex-col">
        <CardHeader className="flex flex-row gap-4 ">
          <div
            style={{ backgroundImage: `url(${ProfileImage3})` }}
            className="flex  h-8 w-8 rounded-full border border-black bg-cover bg-center"
          ></div>
          <span>Quest_user</span>
        </CardHeader>
        <CardContent className="flex h-[400px]">
          <img
            className="object-cover w-full"
            src={data.photos[0].cdnUrl}
          ></img>
        </CardContent>
        <CardFooter className="flex flex-col w-full">
          <div className="flex w-full justify-between">
            <div className="flex flex-col justify-center items-center">
              <Heart
                className={cn(
                  "mr-3",
                  "cursor-pointer",
                  userInfo.isLike ? "fill-red-600" : "fill-none"
                )}
                onClick={() => updateLikes(!userInfo.isLike)}
              ></Heart>
              {data.likes}
            </div>
            <MessageCircle></MessageCircle>
          </div>
          <div className="flex mt-2 items-start justify-start w-full">
            <span>Quest_user: </span> <span> {data.caption}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default PostCard;
