import React from "react";
import { User } from "../interfaces/page"; // Điều chỉnh đường dẫn import cho phù hợp
import "../assets/UserCardSearch.css";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card-avatar">
        <img src={user.avatar} alt={user.name} />
      </div>
      <div className="user-card-info">
        <h3>{user.name}</h3>
        <p>{user.bio}</p>
        <button className="add-friend-button">Thêm bạn bè</button>
      </div>
    </div>
  );
};

export default UserCard;
