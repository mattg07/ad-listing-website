"use client";
import { UploadResponse } from "imagekit/dist/libs/interfaces";
import UploadThumbnail from "./UploadThumbnail";
import UploadView from "./UploadView";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Gallery({ files }: { files: UploadResponse[] }) {
  const [activeFile, setActiveFile] = useState<UploadResponse | null>(
    files?.[0] || null
  );

  function next() {
    const activeFileIndex = files.findIndex(f => f.fileId === activeFile?.fileId)
    const nextIndex = activeFileIndex === files.length - 1 ? 0 : activeFileIndex + 1;
    const nextFiles = files[nextIndex]
    setActiveFile(nextFiles)
  } 

  function prev() {
    const activeFileIndex = files.findIndex(f => f.fileId === activeFile?.fileId)
    const prevIndex = activeFileIndex === 0 ?  files.length - 1 : activeFileIndex - 1;
    const prevFiles = files[prevIndex]
    setActiveFile(prevFiles)
  }

  return (
    <>
      <div className="grow flex justify-center items-center relative  ">
        {activeFile && (
          <>
            <div className="max-h-[500px]  inset-6 flex items-center justify-center ">
              <UploadView file={activeFile} />
            </div>
            <div className="absolute inset-4 flex items center">
              <div className="flex items-center justify-between w-full">
                <button
                                    onClick={prev}

                  className="p-1 back-gray-400/5">
                  <ArrowBackIosIcon />
                </button>
                <button
                  onClick={next}
                  className="p-1 back-gray-400/5">
                  <ArrowForwardIosIcon />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className=" p-4 flex gap-4 flex-wrap justify-center ">
        {files.map((file) => (
          <div className=" border shadow-md rounded-sm" key={file.fileId}>
            <UploadThumbnail onClick={() => setActiveFile(file)} file={file} />
          </div>
        ))}
      </div>
    </>
  );
}
