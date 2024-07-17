import React, { useEffect, useState } from "react";
import { IMember } from "../../../core";
import { PulseFormInput, PulseFormInputProps } from "./PulseFormInput";
import { useAppSelector, useDebounce } from "../../../hooks";
import { getAllMembers } from "../../../store/projectSlice";

interface PulseFormSearchProps extends PulseFormInputProps {}

export const PulseFormSearch: React.FC<PulseFormSearchProps> = ({
  inputData,
  inputValue,
  onChange,
}) => {
  const allMembers = useAppSelector(getAllMembers);
  const [memberSearch, setMemberSearch] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<IMember[]>([]);
  const debouncedMembers = useDebounce(memberSearch, 500);

  useEffect(() => {
    if (debouncedMembers.trim() !== "") {
      const filter = allMembers.filter((member: IMember) => {
        return (
          (member.firstName
            .toLowerCase()
            .includes(debouncedMembers.toLowerCase()) ||
            member.lastName
              .toLowerCase()
              .includes(debouncedMembers.toLowerCase()) ||
            member.userName
              .toLowerCase()
              .includes(debouncedMembers.toLowerCase()) ||
            member.email
              .toLowerCase()
              .includes(debouncedMembers.toLowerCase())) &&
          !inputValue.some(
            (inputValue: { userName: string }) =>
              inputValue.userName === member.userName,
          )
        );
      });
      setFilteredMembers(filter);
    } else {
      setFilteredMembers([]);
    }
  }, [debouncedMembers, allMembers, inputValue.username]);

  const handleAddMember = (member: IMember) => {
    inputValue.push(member);
    onChange({ value: inputValue, name: "selectedMembers" });
    setFilteredMembers([]);
    setMemberSearch("");
  };

  const handleRemoveMember = (userName: string) => {
    inputValue = inputValue.filter(
      (member: IMember) => member.userName !== userName,
    );
    onChange({ value: inputValue, name: "selectedMembers" });
  };

  return (
    <div className="new-project-pop__search-container">
      <div className="new-project-pop__user-add">
        <PulseFormInput
          inputData={inputData}
          inputValue={inputValue}
          onChange={e => onChange(e)}
        />
        {filteredMembers.length > 0 && (
          <div className="new-project-pop__user-list">
            {filteredMembers.map((member: IMember) => (
              <div key={member.userName} className="new-project-pop__user-item">
                <div
                  className="new-project-pop__select-button"
                  onClick={() => handleAddMember(member)}>
                  <span>
                    {member.firstName} {member.lastName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="new-project-pop__selected-members">
        <div className="new-project-pop__text">Selected Members:</div>
        {inputValue?.length > 0 && (
          <div className="new-project-pop__selected-list">
            {inputValue.map((member: IMember) => (
              <div
                key={member.userName}
                className="new-project-pop__selected-member">
                <span>
                  {member.firstName} {member.lastName}
                </span>
                <button
                  type="button"
                  className="new-project-pop__delete-button"
                  onClick={() => handleRemoveMember(member.userName)}>
                  &#x232B;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
