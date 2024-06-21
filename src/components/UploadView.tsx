import { UploadResponse } from "imagekit/dist/libs/interfaces";
import MyImage from "./MyImage";

export default function UploadView({ file }: { file: UploadResponse }) {
  if (file.fileType === "image") {
    return (
      <MyImage
        src={file.filePath}
        alt={"product photo"}
        aiCrop={false}
        width={2048}
            height={2048}
            className="w-auto h-auto max-w-full max-h-[450px] "
      />
    );
  }

  return <>{file.name}</>;
}
