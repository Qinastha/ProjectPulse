import React, { useEffect } from "react";
import "./Project.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setPopUpMode, togglePopUp } from "../../store/popUpSlice";
import {
  fetchProjectById,
  getCurrentProjectListById,
  setCurrentProject,
} from "../../store/projectSlice";

export const Project: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
      dispatch(setCurrentProject(id));
    }
  }, [dispatch, id]);

  const lists = id
    ? useAppSelector(state => getCurrentProjectListById(state, id))
    : [];

  const openAddList = () => {
    dispatch(setPopUpMode("addList"));
    dispatch(togglePopUp(true));
  };

  return (
    <div className="taskContainer">
      <button className="taskContainer--add_button" onClick={openAddList}>
        Add another list
      </button>
      {lists &&
        lists.length > 0 &&
        lists.map(list => (
          <div key={list.id} className="taskContainer--list">
            {list.listName}
          </div>
        ))}
    </div>
  );
};
