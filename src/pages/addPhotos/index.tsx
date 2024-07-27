import FileUploader from "@/components/fileUploader";
import Layout from "@/components/layout";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

type Props = {};
type IAppProps = {};
const AddPhotos: React.FunctionComponent<IAppProps> = ({}: Props) => {
  return (
    <Layout>
      <div className="flex-col w-full">
        <div className="flex w-ful justify-center items-center h-14  bg-gray-800">
          <p className="text-white text-xl ">Add Photos</p>
        </div>
        <div className="p-8">
          <form>
            <div className="flex flex-col">
              <Label className="mb-4" htmlFor="caption">
                Photo Caption
              </Label>
              <Textarea id={"caption"} placeholder="Type your message here." />
            </div>
            <div className="flex flex-col mt-8">
              <Label className="mb-4" htmlFor="caption">
                Photo
              </Label>
              <div className=" flex w-32 h-8">
                <FileUploader />
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
