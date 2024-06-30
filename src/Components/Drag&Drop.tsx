import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getAvatar, setAvatar } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export const DragAndDropImage: React.FC = () => {
  const dispatch = useAppDispatch();
  const avatar = useAppSelector(getAvatar);
  // const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // useEffect(() => {
  //   if (avatar) {
  //     setAvatarPreview(URL.createObjectURL(avatar));
  //   }
  // }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        console.log(acceptedFiles);
        dispatch(setAvatar(acceptedFiles[0]));
        // setAvatarPreview(URL.createObjectURL(acceptedFiles[0]));
      }
    },
    [dispatch],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 5000000,
    // accept: 'image/*',
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #cccccc",
        padding: "20px",
        textAlign: "center",
      }}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      {avatar && (
        <img
          src={URL.createObjectURL(avatar)}
          alt="preview"
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}
      {/* {avatarPreview && (
        <img
          src={avatarPreview}
          alt="preview"
          style={{ width: '100%', marginTop: '10px' }}
        />
      )} */}
    </div>
  );
};
