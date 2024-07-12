import {useEffect} from "react";
import {useAppDispatch} from "../hooks";
import {fetchAllMembers} from "../store/projectSlice";

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllMembers());
  }, []);
  
  return <div>Hello</div>;
};
