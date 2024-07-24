import React, { useCallback } from "react";
import "./DragAvatar.scss";

interface DragFileProps {
  handleFile: (e: string) => void;
  data: any;
}

export const DragFile: React.FC<DragFileProps> = ({ handleFile, data }) => {
  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        if (file) {
          handleFile(reader.result as string);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files[0];
      console.log("Dropped file:", file);
      if (file) {
        handleFileRead(file);
      }
    },
    [handleFileRead],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.target.files?.[0];
      console.log("Selected file:", file);
      if (file) {
        handleFileRead(file);
      }
    },
    [handleFileRead],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div
      className="dragAvatar"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}>
      {!data ? (
        <p className="placeholder"> Please upload your picture </p>
      ) : (
        <img src={data} alt={"Avatar Preview"} />
      )}
      <input id="fileInput" type="file" onChange={handleChange} />
    </div>
  );
};
