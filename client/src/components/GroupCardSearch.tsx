import React from "react";
import "../assets/GroupCardSearch.css";

interface GroupCardProps {
  group: {
    id: number;
    groupName: string;
    group_picture: string;
    banner: string;
    bio: string;
    members: Array<any>;
  };
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <div className="group-card">
      <div className="group-card-avatar">
        <img src={group.group_picture} alt={group.groupName} />
      </div>
      <div className="group-card-info">
        <h3>{group.groupName}</h3>
        <p>{group.bio}</p>
        <p>{group.members.length} thành viên</p>
        <button className="join-group-button">Tham gia</button>
      </div>
    </div>
  );
};

export default GroupCard;
