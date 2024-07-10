import React from "react";
import { useDispatch } from "react-redux";
import { sendFriendRequest } from "../services/account.service";
import { User } from "../interfaces/page";
import "../assets/UserCardSearch.css";
import { getCheckUser } from "../util";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = getCheckUser;

  const handleAddFriend = () => {
    dispatch(
      sendFriendRequest({ fromUserId: currentUser.id, toUserId: user.id })
    );
  };

  return (
    <div className="user-card">
      <div className="user-card-avatar">
        <img src={user.avatar} alt={user.name} />
      </div>
      <div className="user-card-info">
        <h3>{user.name}</h3>
        <p>{user.bio}</p>
        <button className="add-friend-button" onClick={handleAddFriend}>
          Thêm bạn bè
        </button>
      </div>
    </div>
  );
};

export default UserCard;
