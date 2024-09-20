import { useAppSelector } from "../../../hooks";
import { getUser } from "../../../store/userSlice";
import React from "react";
import "./MiniProfile.scss";

interface MiniProfileProps {
  viewportWidth: number;
  viewportHeight: number;
  toggleNav: (e: React.MouseEvent) => void;
}

export const MiniProfile: React.FC<MiniProfileProps> = ({
  viewportWidth,
  viewportHeight,
  toggleNav,
}) => {
  const user = useAppSelector(getUser);

  return (
    <div className="miniProfile">
      <img
        src={user.profile!.avatar!}
        alt={user.userName}
        className="miniProfile-image"
      />
      <div className="miniProfile--info">
        <span className="miniProfile-name">{`${user.firstName} ${user.lastName}`}</span>
        {viewportWidth > 1024 && viewportHeight > 450 && (
          <button className="collapseButton" type="button" onClick={toggleNav}>
            &#8656;
          </button>
        )}
      </div>
    </div>
  );
};
