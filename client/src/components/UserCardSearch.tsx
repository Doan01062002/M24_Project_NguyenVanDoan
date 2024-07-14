import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriendRequest,
  renderUser,
  sendFriendRequest,
} from "../services/account.service";
import { FriendRequest, User } from "../interfaces/page";
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

  const friendRequests = useSelector((state: any) => {
    return state.users.friendRequests;
  });

  useEffect(() => {
    dispatch(getFriendRequest());
  }, []);

  return (
    <div className="user-card">
      <div className="user-card-avatar">
        <img src={user.avatar} alt={user.name} />
      </div>
      <div className="user-card-info">
        <h3>{user.name}</h3>
        <p>{user.bio}</p>
        {friendRequests.find(
          (item: FriendRequest) => item.from_user_id === user.id
        ).status === "pending" ? (
          <button className="add-friend-button" onClick={handleAddFriend}>
            Add friend
          </button>
        ) : (
          <button className="add-friend-button-success">
            sent a friend request
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
