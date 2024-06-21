import Uploader from "@/components/Uploader";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import UploadThumbnail from "./UploadThumbnail";
type Props = {
  files: UploadResponse[];
  setFiles: Dispatch<SetStateAction<UploadResponse[]>>;
};

export default function UploadMedia({ files, setFiles }: Props) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="bg-gray-200 p-2 rounded">
      <h2 className="text-xs text-gray-400 uppercase font-bold text-center">
        Add pictures to your listing
      </h2>
      <div className="flex flex-col items-center">
        <AddAPhotoIcon className="h-24 w-24" />
        <label
          className={
            "upload-btn   p-3 text-center w-48 rounded flex justify-center items-center" +
            (isUploading
              ? "text-gray-400 cursor-not-allowed"
              : " bg-blue-500 text-white cursor-pointer")
          }
        >
          <Uploader
            onUploadStart={() => setIsUploading(true)}
            onSuccess={(file) => {
              setFiles((prev) => [...prev, file]);
              setIsUploading(false);
            }}
          />
          {isUploading ? (
            <span>Uploading...</span>
          ) : (
            <>
              <AddIcon />
              <span>Add photos</span>
            </>
          )}
        </label>
        <div className="flex justify-center flex-wrap">
          {files.map((file) => (
            <div
              key={file.fileId}
              className="size-16 p-2 rounded overflow-hidden"
            >
              <UploadThumbnail  file={file} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
