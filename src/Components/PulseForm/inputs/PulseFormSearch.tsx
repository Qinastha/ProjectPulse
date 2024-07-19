import React, {useEffect, useState} from "react";
import {IMember, useDebounce} from "../../../core";
import {PulseFormInput, PulseFormInputProps} from "./PulseFormInput";
import {getAllMembers} from "../../../store/projectSlice";
import {useAppSelector} from "../../../hooks";

interface PulseFormSearchProps extends PulseFormInputProps {
}

export const PulseFormSearch: React.FC<PulseFormSearchProps> = ({
                                                                    inputData,
                                                                    inputValue = [],
                                                                    onChange
                                                                }) => {
    const allMembers = useAppSelector(getAllMembers);
    const [memberSearch, setMemberSearch] = useState("");
    const [filteredMembers, setFilteredMembers] = useState<IMember[]>([]);
    const debouncedMembers = useDebounce(memberSearch, 700);

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
    }, [debouncedMembers, allMembers, inputValue]);

    const handleAddMember = (member: IMember) => {
        inputValue = [...inputValue, member]
        onChange({target: {value: inputValue, name: "members"}});
        setFilteredMembers([]);
        setMemberSearch("");
    };

    const handleRemoveMember = (userName: string) => {
        inputValue = inputValue.filter(
            (member: IMember) => member.userName !== userName,
        );
        onChange({target: {value: inputValue, name: "members"}});
    };

    return (
        <div className="new-project-pop__search-container">
            <div className="new-project-pop__user-add">
                <PulseFormInput
                    inputData={inputData}
                    inputValue={memberSearch}
                    onChange={e => setMemberSearch(e.target.value)}
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
