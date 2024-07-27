import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

import React from "react";

type Props = {};
type IAppProps = {};
const FileUploader: React.FunctionComponent<IAppProps> = ({}: Props) => {
  return (
    <section>
      <FileUploaderRegular
        className="bg-gray-800"
        pubkey="8903658e85dd051aa884"
      />
    </section>
  );
};
export default FileUploader;
