import { useCallback, useState, useEffect } from "react";
import { setAvatar, getAvatar } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

interface DragAvatarProps {
  open?: boolean;
  handleAddLogo?: (e: string) => void;
}

export const DragAvatar: React.FC<DragAvatarProps> = ({
  handleAddLogo,
  open,
}) => {
  const dispatch = useAppDispatch();
  const profileAvatar = useAppSelector(getAvatar);
  const [projectAvatar, setProjectAvatar] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (profileAvatar && !open) {
      setUserAvatar(profileAvatar);
    }
  }, [profileAvatar])

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        console.log("FileReader result:", reader.result);
        if (!open) {
          dispatch(setAvatar(reader.result as string));
          setUserAvatar(reader.result as string);
        } else {
          handleAddLogo?.(reader.result as string);
          setProjectAvatar(reader.result as string);
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
      {(!userAvatar || (open && !projectAvatar)) && (
        <p>
          {open
            ? "Drag and drop a project logo here, or click to select one"
            : "Drag and drop an avatar here, or click to select one"}
        </p>
      )}
      {(userAvatar && (open ? projectAvatar : userAvatar)) && (
        <img
          src={open ? projectAvatar ?? undefined : userAvatar ?? undefined}
          alt={open ? "Project Logo Preview" : "Avatar Preview"}
        />
      )}
      <input id="fileInput" type="file" onChange={handleChange} />
    </div>
  );
};
