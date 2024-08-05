import { DocumentResponse } from "@/types";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import ProfileImage3 from "../../assets/images/profileimg3.jpeg";
import { CloudCog, CloudDrizzle, Heart, MessageCircle } from "lucide-react";

type Props = {
  data: DocumentResponse;
};
type IAppProps = {
  data: DocumentResponse;
};
const PostCard: React.FunctionComponent<IAppProps> = ({ data }: Props) => {
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
              <Heart></Heart>
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
