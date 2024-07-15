import {useCallback, useState, useEffect} from "react";
import {setAvatar, getAvatar} from "../../store/userSlice";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getIsNewProject, getIsUpdateProject, getProjectOpen} from "../../store/projectSlice";

interface DragAvatarProps {
  projectAvatar?: string;
  handleAddLogo?: (e: string) => void;
  handleFile?: (e: string) => void;
}

export const DragAvatar: React.FC<DragAvatarProps>=({
  handleAddLogo,
  projectAvatar,
  handleFile,
}) => {
  const dispatch=useAppDispatch();
  const projectOpen=useAppSelector(getProjectOpen);
  const isNewProject=useAppSelector(getIsNewProject);
  const isUpdateProject=useAppSelector(getIsUpdateProject);
  const profileAvatar=useAppSelector(getAvatar);
  const [projectAvatarPreview, setProjectAvatarPreview]=useState<string>("");
  const [userAvatar, setUserAvatar]=useState<string|null>(null);

  useEffect(() => {
    if (projectOpen && isNewProject) {
      setProjectAvatarPreview("");
    } else if (isUpdateProject && projectAvatar) {
      setProjectAvatarPreview(projectAvatar);
    } else if (!projectOpen && (isNewProject || isUpdateProject)) {
      setProjectAvatarPreview("");
    } else {
      setUserAvatar(profileAvatar || null);
    }
  }, [projectOpen, isNewProject, isUpdateProject, projectAvatar, profileAvatar]);

  const handleFileRead=(file: File) => {
    const reader=new FileReader();
    reader.onloadend=() => {
      if(reader.result) {
        console.log("FileReader result:", reader.result);
        if(!projectOpen) {
          // dispatch(setAvatar(reader.result as string));
          setUserAvatar(reader.result as string);
          handleFile?.(reader.result as string);
        }
        if(isNewProject||isUpdateProject) {
          handleAddLogo?.(reader.result as string);
          setProjectAvatarPreview(reader.result as string);
          console.log(projectAvatarPreview)
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
      {(!userAvatar||(projectOpen&&!projectAvatarPreview))&&(
        <p>
          {projectOpen
            ? "Drag and drop a project logo here, or click to select one"
            :"Drag and drop an avatar here, or click to select one"}
        </p>
      )}
      {(userAvatar&&(projectOpen? projectAvatarPreview:userAvatar))&&(
        <img
          src={projectOpen? (projectAvatarPreview??undefined):(userAvatar??undefined)}
          alt={projectOpen? "Project Logo Preview":"Avatar Preview"}
        />
      )}
      <input id="fileInput" type="file" onChange={handleChange} />
    </div>
  );
};