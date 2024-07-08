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
  const avatar = useAppSelector(getAvatar);

  const [preview, setPreview] = useState<string | null>(null);
  const [projectLogo, setProjectLogo] = useState<string | null>(null);

  useEffect(() => {
    if (avatar && !open) {
      setPreview(avatar);
    } else if (projectLogo && open) {
      setPreview(projectLogo);
    }
  }, [avatar, projectLogo, open]);

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        console.log("FileReader result:", reader.result);
        if (!open) {
          dispatch(setAvatar(reader.result as string));
          setPreview(reader.result as string);
        } else {
          handleAddLogo?.(reader.result as string);
          setProjectLogo(reader.result as string);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
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
        <img
          src={open ? projectLogo ?? undefined : preview ?? undefined}
          alt={open ? "Project Logo Preview" : "Avatar Preview"}
        />
      ) : (
        <p>
          {open
            ? "Drag and drop a project logo here, or click to select one"
            : "Drag and drop an avatar here, or click to select one"}
        </p>
      )}
      <input id="fileInput" type="file" onChange={handleChange} />
    </div>
  );
};
