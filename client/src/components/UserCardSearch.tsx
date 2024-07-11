import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderUser, sendFriendRequest } from "../services/account.service";
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
    alert("đã gửi lời mời kết bạn");
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
