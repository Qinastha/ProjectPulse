import {useCallback, useState, useEffect} from "react";
import {setAvatar, getAvatar} from "../store/userSlice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getNewProjectOpen} from "../store/projectSlice";

interface DragAvatarProps {
  handleAddLogo?: (e: string) => void;
}

export const DragAvatar: React.FC<DragAvatarProps>=({
  handleAddLogo,
}) => {
  const dispatch=useAppDispatch();
  const newProjectOpen=useAppSelector(getNewProjectOpen);
  const profileAvatar=useAppSelector(getAvatar);
  const [projectAvatar, setProjectAvatar]=useState<string|null>(null);
  const [userAvatar, setUserAvatar]=useState<string|null>(null);

  useEffect(() => {
    if(profileAvatar&&(newProjectOpen===false)) {
      setUserAvatar(profileAvatar);
    }
    if((newProjectOpen===false)&&projectAvatar) {
      setProjectAvatar(null);
    }
  }, [profileAvatar, newProjectOpen, projectAvatar]);

  const handleFileRead=(file: File) => {
    const reader=new FileReader();
    reader.onloadend=() => {
      if(reader.result) {
        console.log("FileReader result:", reader.result);
        if(newProjectOpen==false) {
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

  const handleDrop=useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const file=e.dataTransfer.files[0];
      console.log("Dropped file:", file);
      if(file) {
        handleFileRead(file);
      }
    },
    [handleFileRead],
  );

  const handleChange=useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const file=e.target.files?.[0];
      console.log("Selected file:", file);
      if(file) {
        handleFileRead(file);
      }
    },
    [handleFileRead],
  );

  const handleDragOver=(e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick=() => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div
      className="dragAvatar"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}>
      {(!userAvatar||((newProjectOpen===true)&&!projectAvatar))&&(
        <p>
          {newProjectOpen==true
            ? "Drag and drop a project logo here, or click to select one"
            :"Drag and drop an avatar here, or click to select one"}
        </p>
      )}
      {(userAvatar&&((newProjectOpen===true)? projectAvatar:userAvatar))&&(
        <img
          src={(newProjectOpen===true)? projectAvatar??undefined:userAvatar??undefined}
          alt={(newProjectOpen===true)? "Project Logo Preview":"Avatar Preview"}
        />
      )}
      <input id="fileInput" type="file" onChange={handleChange} />
    </div>
  );
};
