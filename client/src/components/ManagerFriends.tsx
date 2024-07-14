import React, { useState, useEffect, useRef } from "react";
import "../assets/ManagerFriends.css";
import { useDispatch, useSelector } from "react-redux";
import { Friend, User } from "../interfaces/page";
import { getCheckUser } from "../util";
import { renderUser, unfriend } from "../services/account.service";

export default function ManagerFriends() {
  const [showActions, setShowActions] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  const handleActionClick = (index: number) => {
    setShowActions(showActions === index ? null : index);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      actionMenuRef.current &&
      !actionMenuRef.current.contains(event.target as Node)
    ) {
      setShowActions(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [loading, setLoading] = useState<boolean>(true);

  const users = useSelector((state: any) => state.users.accountUser);

  const getUser: User = users.find((item: User) => item.id === getCheckUser.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderUser()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!getUser) {
    return <div>User not found</div>;
  }

  const handleUnfriend = (friendId: number) => {
    dispatch(unfriend({ userId: getUser.id, friendId }));
  };

  return (
    <div className="container-friends">
      <header>
        <h1>Friend</h1>
        <input type="text" placeholder="Tìm kiếm" />
      </header>
      <div className="tabs">
        <span className="active">All Friend</span>
        <span>Following</span>
      </div>
      <div className="friends-list">
        {getUser.friends.map((friend: Friend, index: number) => (
          <div className="friend-card" key={index}>
            <img src={friend.imageFriend} alt="Friend Avatar" />
            <div className="friend-info">
              <h2>{friend.nameFriend}</h2>
              <p>100 mutual friends</p>
            </div>
            <div className="friend-actions">
              <button
                className="action-btn"
                onClick={() => handleActionClick(index)}
              >
                ...
              </button>
              {showActions === index && (
                <div className="action-menu" ref={actionMenuRef}>
                  <button onClick={() => alert("Unfollow")}>Unfollow</button>
                  <button onClick={() => handleUnfriend(friend.userId)}>
                    Unfriend
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
