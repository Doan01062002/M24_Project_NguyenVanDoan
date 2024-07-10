import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  fetchFriendRequests,
  acceptFriendRequest,
  deleteFriendRequest,
} from "../services/account.service";
import "../assets/AddFriend.css";
import { getCheckUser } from "../util";

const AddFriend: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = getCheckUser;
  const friendRequests = useSelector(
    (state: RootState) => state.users.friendRequests
  );

  useEffect(() => {
    dispatch(fetchFriendRequests(currentUser.id));
  }, [dispatch, currentUser.id]);

  const handleAccept = (requestId: number, fromUserId: number) => {
    dispatch(
      acceptFriendRequest({ requestId, fromUserId, toUserId: currentUser.id })
    );
  };

  const handleDelete = (requestId: number) => {
    dispatch(deleteFriendRequest(requestId));
  };

  if (!friendRequests) {
    return <div>Loading...</div>;
  }

  return (
    <div className="friend-requests">
      <div className="header">
        <h2>Lời mời kết bạn</h2>
        <a href="#" className="view-all">
          Xem tất cả
        </a>
      </div>
      <div className="requests-container">
        {friendRequests.map((request: any) => (
          <div className="request" key={request.id}>
            <img src={request.fromUser.avatar} alt={request.fromUser.name} />
            <div className="info">
              <p className="name">{request.fromUser.name}</p>
              <p className="mutual-friends">
                Bạn chung: {request.mutualFriends}
              </p>
              <div className="buttons">
                <button
                  className="accept"
                  onClick={() => handleAccept(request.id, request.from_user_id)}
                >
                  Xác nhận
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(request.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddFriend;
