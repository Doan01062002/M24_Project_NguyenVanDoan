import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCheckUser, setCheckUser } from "../util";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../interfaces/page";
import { renderUser } from "../services/account.service";
import AddFriend from "./AddFriend";
import CreateGroup from "./CreateGroup";

export default function Nav_Left() {
  /**
   *************Logic show Notifications************
   */
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFriends, setShowFriends] = useState<boolean>(false);
  const [showCreateGroup, setShowCreateGroup] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("home");

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setActiveItem("notification");
  };

  /**
   ************** Logic active nav class item*****
   */
  useEffect(() => {
    const menuItems =
      document.querySelectorAll<HTMLAnchorElement>(".menu-item");

    // Remove active class from all menu items
    const changeActiveItem = () => {
      menuItems.forEach((item) => {
        item.classList.remove("active");
      });
    };

    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        changeActiveItem();
        item.classList.add("active");
        const notificationsPopup = document.querySelector<HTMLElement>(
          ".notifications-popup"
        );
        const notificationCount = document.querySelector<HTMLElement>(
          "#notifications .notification-count"
        );
        if (item.id !== "notifications") {
          if (notificationsPopup) notificationsPopup.style.display = "none";
        } else {
          if (notificationsPopup) notificationsPopup.style.display = "block";
          if (notificationCount) notificationCount.style.display = "none";
        }
      });
    });

    // Cleanup event listeners on component unmount
    return () => {
      menuItems.forEach((item) => {
        item.removeEventListener("click", () => {});
      });
    };
  }, []);

  /**
   ******************** Logic đăng xuất ******************
   */
  const navigate = useNavigate();
  const logoutUser = () => {
    setCheckUser();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  /**
   * Get User
   */
  const [loading, setLoading] = useState<boolean>(true);

  const users = useSelector((state: any) => {
    return state.users.accountUser;
  });

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

  // Next Home
  const NextHome = () => {
    navigate("/");
    setActiveItem("home");
    window.location.reload();
  };

  /**
   * Add friend
   */

  return (
    <>
      <div className="left">
        <a onClick={() => navigate("/profile")} className="profile">
          <div className="profile-photo">
            <img src={getUser.avatar} alt="" />
          </div>
          <div className="handle">
            <h4>{getUser.name}</h4>
            <p className="text-muted">@{getUser.userName}</p>
          </div>
        </a>
        {/*--------------- SIDEBAR ------------------*/}
        <div className="sidebar">
          <a
            onClick={NextHome}
            className={activeItem === "home" ? "menu-item active" : "menu-item"}
          >
            <span>
              <i className="uil uil-home" />
            </span>
            <h3>Home</h3>
          </a>
          <a
            className={
              activeItem === "notification" ? "menu-item active" : "menu-item"
            }
            id="notifications"
            onClick={handleNotificationClick}
          >
            <span>
              <i className="uil uil-bell">
                <small className="notification-count">9+</small>
              </i>
            </span>
            <h3>Notification</h3>
            {/*------------- NOTIFICATION POPUP -------------*/}
            {showNotifications && (
              <div className="notifications-popup">
                <div>
                  <div className="profile-photo">
                    <img src="./images/profile-2.jpg" />
                  </div>
                  <div className="notification-body">
                    <b>Keke Benjamin</b> accepted your friend request
                    <small className="text-muted">2 Days Ago</small>
                  </div>
                </div>
                <div>
                  <div className="profile-photo">
                    <img src="./images/profile-3.jpg" />
                  </div>
                  <div className="notification-body">
                    <b>John Doe</b> commented on your post
                    <small className="text-muted">1 Hour Ago</small>
                  </div>
                </div>
                <div>
                  <div className="profile-photo">
                    <img src="./images/profile-4.jpg" />
                  </div>
                  <div className="notification-body">
                    <b>Marry Oppong</b> and <b>283 Others</b> liked your post
                    <small className="text-muted">4 Minutes Ago</small>
                  </div>
                </div>
                <div>
                  <div className="profile-photo">
                    <img src="./images/profile-5.jpg" />
                  </div>
                  <div className="notification-body">
                    <b>Doris Y. Lartey</b> commented on a post you are tagged in
                    <small className="text-muted">2 Days Ago</small>
                  </div>
                </div>
                <div>
                  <div className="profile-photo">
                    <img src="./images/profile-6.jpg" />
                  </div>
                  <div className="notification-body">
                    <b>Keyley Jenner</b> commented on a post you are tagged in
                    <small className="text-muted">1 Hour Ago</small>
                  </div>
                </div>
                <div>
                  <div className="profile-photo">
                    <img src="./images/profile-7.jpg" />
                  </div>
                  <div className="notification-body">
                    <b>Jane Doe</b> commented on your post
                    <small className="text-muted">1 Hour Ago</small>
                  </div>
                </div>
              </div>
            )}
            {/*------------- END NOTIFICATION POPUP -------------*/}
          </a>

          <a
            onClick={() => {
              setShowFriends(!showFriends), setShowCreateGroup(false);
            }}
            className="menu-item"
          >
            <i className="fa-solid fa-user-group">
              <small className="notification-count">1+</small>
            </i>
            <h3>Friend</h3>
          </a>
          <a
            onClick={() => {
              setShowCreateGroup(!showCreateGroup), setShowFriends(false);
            }}
            className="menu-item"
          >
            <span>
              <i className="uil uil-chart-line" />
            </span>
            <h3>Create Group (+)</h3>
          </a>
          <a className="menu-item" id="theme">
            <span>
              <i className="uil uil-palette" />
            </span>
            <h3>Theme</h3>
          </a>
          <a onClick={logoutUser} className="menu-item">
            <span>
              <i className="uil uil-sign-out-alt"></i>
            </span>
            <h3>Log out</h3>
          </a>
        </div>
        {/*--------------- END OF SIDEBAR ------------------*/}
      </div>
      {showFriends && <AddFriend></AddFriend>}
      {showCreateGroup && <CreateGroup></CreateGroup>}
    </>
  );
}
