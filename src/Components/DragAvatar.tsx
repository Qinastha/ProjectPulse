// src/components/DragAndDropInput.tsx
import { useCallback, useState, useEffect } from "react";
import { setAvatar, getAvatar } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export const DragAvatar: React.FC = () => {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(getAvatar);

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (avatar) {
      setPreview(avatar);
    }
  }, [avatar]);

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        console.log("FileReader result:", reader.result);
        setPreview(reader.result as string);
        dispatch(setAvatar(reader.result as string));
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
    [dispatch],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      console.log("Selected file:", file);
      if (file) {
        handleFileRead(file);
      }
    },
    [dispatch],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
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
      {preview ? (
        <img src={preview} alt="Avatar Preview" />
      ) : (
        <p>Drag and drop an avatar here, or click to select one</p>
      )}
      <input id="fileInput" type="file" onChange={handleChange} />
    </div>
  );
};
