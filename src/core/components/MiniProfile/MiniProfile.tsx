import { useAppSelector } from "../../../hooks";
import { getUser } from "../../../store/userSlice";
import React from "react";
import "./MiniProfile.scss";

export const MiniProfile: React.FC = () => {
  const user = useAppSelector(getUser);

  return (
    <div className="miniProfile">
      <img
        src={user.profile!.avatar!}
        alt={user.userName}
        className="miniProfile-image"
      />
      <span className="miniProfile-name">{`${user.firstName} ${user.lastName}`}</span>
    </div>
  );
};
