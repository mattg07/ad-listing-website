import { UploadResponse } from "imagekit/dist/libs/interfaces";
import React from "react";
import MyImage from "./MyImage";
type Props = {
  file: UploadResponse;
  onClick?: () => void;
    size?: 'small' | 'large';

};

export default function UploadThumbnail({ file, onClick, size = 'small' }: Props) {
  function handleClick(ev: React.MouseEvent) {
    if (onClick) {
      ev.preventDefault();
      return onClick();
    }
    location.href = file.url;
  }
   const imageSize = size === 'large' ? 400 : 120;

  if (file.fileType === "image") {
    return (
      <a onClick={handleClick} target="_blank">
        <MyImage
          width={imageSize}
          height={imageSize}
          alt={"product thumbnail"}
          key={file.fileId}
          aiCrop={true}
          src={file.filePath}
          className="w-auto h-auto max-w-full max-h-full"
        />
      </a>
    );
  }
  return <div>{file.url} &raquo</div>;
}
