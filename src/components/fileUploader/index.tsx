import React, { useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { FileEntry } from "@/types";

interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
}
const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({
  fileEntry,
  onChange,
}) => {
  const [files, setFiles] = useState([]);

  const handleChangeEvent = (items: any) => {
    onChange({
      files: [
        ...items.allEntries.filter(
          (file: { status: string }) => file.status === "success"
        ),
      ],
    });
  };

  return (
    <div>
      <FileUploaderRegular
        onDoneClick={(e) => console.log(e)}
        onChange={handleChangeEvent}
        pubkey="8903658e85dd051aa884"
        showEmptyList={true}
      />

      {/* <div>
        {fileEntry.files?.map((file) => (
          <div key={file.uuid}>
            {file !== null && (
              <img src={file?.cdnUrl} alt={file?.fileInfo?.originalFilename} />
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default FileUploader;
