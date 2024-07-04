import React, { useState, useEffect, useRef } from "react";
import "../assets/mainPage.css";

export default function MainPage() {
  /**
   *************Logic show Notifications**************
   */
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  /**
   ************** Logic active nav class item**************
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
   ************Logic Message show*************
   */
  const messageNotificationRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const messageSearchRef = useRef<HTMLInputElement>(null);

  const messages = messagesRef.current;
  const messageNotification = messageNotificationRef.current;

  const handleMessagesClick = () => {
    if (messages) {
      messages.style.boxShadow = "0 0 1rem var(--color-primary)";
      if (messageNotification) {
        const notificationCount = messageNotification.querySelector(
          ".notification-count"
        ) as HTMLElement;
        if (notificationCount) notificationCount.style.display = "none";
      }
      setTimeout(() => {
        if (messages) messages.style.boxShadow = "none";
      }, 2000);
    }
  };

  return (
    <>
      <nav>
        <div className="container">
          <h2 className="logo">VNSN</h2>
          <div className="search-bar">
            <i className="uil uil-search" />
            <input
              type="search"
              placeholder="Search for creators, inspirations, and projects"
            />
          </div>
          <div className="create">
            <button className="btn btn-primary">Create</button>
            <div className="profile-photo">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-1.jpg?alt=media&token=2539162a-adf0-4333-9fea-f3dd9feb5103"
                alt=""
              />
            </div>
          </div>
        </div>
      </nav>
      {/*------------------------------ MAIN ---------------------------------*/}
      <main>
        <div className="container">
          {/*--------------- LEFT ------------------*/}
          <div className="left">
            <a className="profile">
              <div className="profile-photo">
                <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-1.jpg?alt=media&token=2539162a-adf0-4333-9fea-f3dd9feb5103" />
              </div>
              <div className="handle">
                <h4>Nia Ridania</h4>
                <p className="text-muted">@niaridania</p>
              </div>
            </a>
            {/*--------------- SIDEBAR ------------------*/}
            <div className="sidebar">
              <a className="menu-item active">
                <span>
                  <i className="uil uil-home" />
                </span>
                <h3>Home</h3>
              </a>
              <a className="menu-item">
                <span>
                  <i className="uil uil-compass" />
                </span>
                <h3>Explore</h3>
              </a>
              <a
                className="menu-item"
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
                        <b>Marry Oppong</b> and <b>283 Others</b> liked your
                        post
                        <small className="text-muted">4 Minutes Ago</small>
                      </div>
                    </div>
                    <div>
                      <div className="profile-photo">
                        <img src="./images/profile-5.jpg" />
                      </div>
                      <div className="notification-body">
                        <b>Doris Y. Lartey</b> commented on a post you are
                        tagged in
                        <small className="text-muted">2 Days Ago</small>
                      </div>
                    </div>
                    <div>
                      <div className="profile-photo">
                        <img src="./images/profile-6.jpg" />
                      </div>
                      <div className="notification-body">
                        <b>Keyley Jenner</b> commented on a post you are tagged
                        in
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
                className="menu-item"
                id="messages-notifications"
                onClick={handleMessagesClick}
              >
                <span>
                  <i className="uil uil-envelope-alt">
                    <small className="notification-count">6</small>
                  </i>
                </span>
                <h3>Messages</h3>
              </a>
              <a className="menu-item">
                <span>
                  <i className="uil uil-bookmark" />
                </span>
                <h3>Bookmarks</h3>
              </a>
              <a className="menu-item">
                <span>
                  <i className="uil uil-chart-line" />
                </span>
                <h3>Analytics</h3>
              </a>
              <a className="menu-item" id="theme">
                <span>
                  <i className="uil uil-palette" />
                </span>
                <h3>Theme</h3>
              </a>
              <a className="menu-item">
                <span>
                  <i className="uil uil-setting" />
                </span>
                <h3>Setting</h3>
              </a>
            </div>
            {/*--------------- END OF SIDEBAR ------------------*/}
            <label className="btn btn-primary" htmlFor="create-post">
              Create Post
            </label>
          </div>
          {/*--------------- MIDDLE ------------------*/}
          <div className="middle">
            {/*--------------- STORIES ------------------*/}
            <div className="stories">
              <div className="story">
                <div className="profile-photo">
                  <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-8.jpg?alt=media&token=37814bfd-5328-4497-a6e4-52872af28a92" />
                </div>
                <p className="name">Your Story</p>
              </div>
              <div className="story">
                <div className="profile-photo">
                  <img src="./images/profile-9.jpg" />
                </div>
                <p className="name">Lila James</p>
              </div>
              <div className="story">
                <div className="profile-photo">
                  <img src="./images/profile-10.jpg" />
                </div>
                <p className="name">Winnie Haley</p>
              </div>
              <div className="story">
                <div className="profile-photo">
                  <img src="./images/profile-11.jpg" />
                </div>
                <p className="name">Daniel Bale</p>
              </div>
              <div className="story">
                <div className="profile-photo">
                  <img src="./images/profile-12.jpg" />
                </div>
                <p className="name">Jane Doe</p>
              </div>
              <div className="story">
                <div className="profile-photo">
                  <img src="./images/profile-13.jpg" />
                </div>
                <p className="name">Tina White</p>
              </div>
            </div>
            {/*--------------- END OF STORIES ------------------*/}
            <form action="" className="create-post">
              <div className="profile-photo">
                <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-1.jpg?alt=media&token=2539162a-adf0-4333-9fea-f3dd9feb5103" />
              </div>
              <div className="information-post">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  id="create-post"
                />
                <div className="icons-function">
                  <span className="material-symbols-outlined">
                    add_photo_alternate
                  </span>
                  <span className="material-symbols-outlined">video_call</span>
                  <span className="material-symbols-outlined">folder</span>
                  <span className="material-symbols-outlined">group_add</span>
                  <span className="material-symbols-outlined">
                    add_reaction
                  </span>
                </div>
              </div>

              <button className="btn btn-primary">Post</button>
            </form>
            {/*--------------- FEEDS ------------------*/}
            <div className="feeds">
              {/*--------------- FEED 1 ------------------*/}
              <div className="feed">
                <div className="head">
                  <div className="user">
                    <div className="profile-photo">
                      <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-13.jpg?alt=media&token=ed27a7c7-abad-44d7-a008-1fa03306f85d" />
                    </div>
                    <div className="info">
                      <h3>Lana Rose</h3>
                      <small>Dubai, 15 Minutes Ago</small>
                    </div>
                  </div>
                  <span className="edit">
                    <i className="uil uil-ellipsis-h" />
                  </span>
                </div>
                <div className="photo">
                  <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Ffeed-1.jpg?alt=media&token=d3802fba-44c8-47f0-8628-a88e94d8e023" />
                </div>
                <div className="action-buttons">
                  <div className="interaction-buttons">
                    <span>
                      <i className="uil uil-heart" />
                    </span>
                    <span>
                      <i className="uil uil-comment-dots" />
                    </span>
                    <span>
                      <i className="uil uil-share-alt" />
                    </span>
                  </div>
                  <div className="bookmark">
                    <span>
                      <i className="uil uil-bookmark-full" />
                    </span>
                  </div>
                </div>
                <div className="liked-by">
                  <span>
                    <img src="./images/profile-10.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-4.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-15.jpg" />
                  </span>
                  <p>
                    Liked by <b>Ernest Achiever</b> and <b>2, 323 others</b>
                  </p>
                </div>
                <div className="caption">
                  <p>
                    <b>Lana Rose</b> Lorem ipsum dolor sit quisquam eius.
                    <span className="harsh-tag">#lifestyle</span>
                  </p>
                </div>
                <div className="comments text-muted">View all 277 comments</div>
              </div>
              {/*--------------- END OF FEED 1 ------------------*/}
              {/*--------------- FEED 2 ------------------*/}
              <div className="feed">
                <div className="head">
                  <div className="user">
                    <div className="profile-photo">
                      <img src="./images/profile-10.jpg" />
                    </div>
                    <div className="info">
                      <h3>Clara Dwayne</h3>
                      <small>Miami, 2 Hours Ago</small>
                    </div>
                  </div>
                  <span className="edit">
                    <i className="uil uil-ellipsis-h" />
                  </span>
                </div>
                <div className="photo">
                  <img src="./images/feed-3.jpg" />
                </div>
                <div className="action-buttons">
                  <div className="interaction-buttons">
                    <span>
                      <i className="uil uil-heart" />
                    </span>
                    <span>
                      <i className="uil uil-comment-dots" />
                    </span>
                    <span>
                      <i className="uil uil-share-alt" />
                    </span>
                  </div>
                  <div className="bookmark">
                    <span>
                      <i className="uil uil-bookmark-full" />
                    </span>
                  </div>
                </div>
                <div className="liked-by">
                  <span>
                    <img src="./images/profile-11.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-5.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-16.jpg" />
                  </span>
                  <p>
                    Liked by <b>Diana Rose</b> and <b>2, 323 others</b>
                  </p>
                </div>
                <div className="caption">
                  <p>
                    <b>Clara Dwayne</b> Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Veniam, fugiat? Ipsam voluptatibus beatae
                    facere eos harum voluptas distinctio, officia, facilis sed
                    quisquam esse, assumenda minima ut. Excepturi sit quis
                    reiciendis!
                    <span className="harsh-tag">#lifestyle</span>
                  </p>
                </div>
                <div className="comments text-muted">View all 100 comments</div>
              </div>
              {/*--------------- END OF FEED 2 ------------------*/}
              {/*--------------- FEED 3 ------------------*/}
              <div className="feed">
                <div className="head">
                  <div className="user">
                    <div className="profile-photo">
                      <img src="./images/profile-4.jpg" />
                    </div>
                    <div className="info">
                      <h3>Rosalinda Clark</h3>
                      <small>New York, 50 Minutes Ago</small>
                    </div>
                  </div>
                  <span className="edit">
                    <i className="uil uil-ellipsis-h" />
                  </span>
                </div>
                <div className="photo">
                  <img src="./images/feed-4.jpg" />
                </div>
                <div className="action-buttons">
                  <div className="interaction-buttons">
                    <span>
                      <i className="uil uil-heart" />
                    </span>
                    <span>
                      <i className="uil uil-comment-dots" />
                    </span>
                    <span>
                      <i className="uil uil-share-alt" />
                    </span>
                  </div>
                  <div className="bookmark">
                    <span>
                      <i className="uil uil-bookmark-full" />
                    </span>
                  </div>
                </div>
                <div className="liked-by">
                  <span>
                    <img src="./images/profile-12.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-13.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-14.jpg" />
                  </span>
                  <p>
                    Liked by <b>Clara Dwayne</b> and <b>2, 323 others</b>
                  </p>
                </div>
                <div className="caption">
                  <p>
                    <b>Rosalinda Clark</b> Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Quo ullam, quam voluptatibus
                    natus ex corporis ea atque quisquam, necessitatibus, cumque
                    eligendi aliquam nulla soluta hic. Obcaecati, tempore
                    dignissimos! Esse cupiditate laborum ullam, quae
                    necessitatibus, officiis, quaerat aspernatur illo voluptatum
                    repellat perferendis voluptatem similique. Assumenda
                    nostrum, eius sit laborum nesciunt deserunt!
                    <span className="harsh-tag">#lifestyle</span>
                  </p>
                </div>
                <div className="comments text-muted">View all 50 comments</div>
              </div>
              {/*--------------- END OF FEED 3 ------------------*/}
              {/*--------------- FEED 4 ------------------*/}
              <div className="feed">
                <div className="head">
                  <div className="user">
                    <div className="profile-photo">
                      <img src="./images/profile-5.jpg" />
                    </div>
                    <div className="info">
                      <h3>Alexandria Riana</h3>
                      <small>Dubai, 1 Hour Ago</small>
                    </div>
                  </div>
                  <span className="edit">
                    <i className="uil uil-ellipsis-h" />
                  </span>
                </div>
                <div className="photo">
                  <img src="./images/feed-5.jpg" />
                </div>
                <div className="action-buttons">
                  <div className="interaction-buttons">
                    <span>
                      <i className="uil uil-heart" />
                    </span>
                    <span>
                      <i className="uil uil-comment-dots" />
                    </span>
                    <span>
                      <i className="uil uil-share-alt" />
                    </span>
                  </div>
                  <div className="bookmark">
                    <span>
                      <i className="uil uil-bookmark-full" />
                    </span>
                  </div>
                </div>
                <div className="liked-by">
                  <span>
                    <img src="./images/profile-10.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-4.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-15.jpg" />
                  </span>
                  <p>
                    Liked by <b>Lana Rose</b> and <b>5, 323 others</b>
                  </p>
                </div>
                <div className="caption">
                  <p>
                    <b>Alexandria Riana</b> Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Modi architecto sunt itaque,
                    in, enim non doloremque velit unde nihil vitae impedit
                    dolorum, distinctio ab deleniti!
                    <span className="harsh-tag">#lifestyle</span>
                  </p>
                </div>
                <div className="comments text-muted">View all 540 comments</div>
              </div>
              {/*--------------- END OF FEED 4 ------------------*/}
              {/*--------------- FEED 5 ------------------*/}
              <div className="feed">
                <div className="head">
                  <div className="user">
                    <div className="profile-photo">
                      <img src="./images/profile-7.jpg" />
                    </div>
                    <div className="info">
                      <h3>Keylie Hadid</h3>
                      <small>Dubai, 3 Hours Ago</small>
                    </div>
                  </div>
                  <span className="edit">
                    <i className="uil uil-ellipsis-h" />
                  </span>
                </div>
                <div className="photo">
                  <img src="./images/feed-7.jpg" />
                </div>
                <div className="action-buttons">
                  <div className="interaction-buttons">
                    <span>
                      <i className="uil uil-heart" />
                    </span>
                    <span>
                      <i className="uil uil-comment-dots" />
                    </span>
                    <span>
                      <i className="uil uil-share-alt" />
                    </span>
                  </div>
                  <div className="bookmark">
                    <span>
                      <i className="uil uil-bookmark-full" />
                    </span>
                  </div>
                </div>
                <div className="liked-by">
                  <span>
                    <img src="./images/profile-10.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-4.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-15.jpg" />
                  </span>
                  <p>
                    Liked by <b>Riana Rose</b> and <b>1, 226 others</b>
                  </p>
                </div>
                <div className="caption">
                  <p>
                    <b>Keylie Hadid</b> Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Autem obcaecati nisi veritatis quisquam
                    eius accusantium rem quo repellat facilis neque.
                    <span className="harsh-tag">#lifestyle</span>
                  </p>
                </div>
                <div className="comments text-muted">View all 199 comments</div>
              </div>
              {/*--------------- END OF FEED 5 ------------------*/}
              {/*--------------- FEED 6 ------------------*/}
              <div className="feed">
                <div className="head">
                  <div className="user">
                    <div className="profile-photo">
                      <img src="./images/profile-15.jpg" />
                    </div>
                    <div className="info">
                      <h3>Benjamin Dwayne</h3>
                      <small>New York, 5 Hours Ago</small>
                    </div>
                  </div>
                  <span className="edit">
                    <i className="uil uil-ellipsis-h" />
                  </span>
                </div>
                <div className="photo">
                  <img src="./images/feed-2.jpg" />
                </div>
                <div className="action-buttons">
                  <div className="interaction-buttons">
                    <span>
                      <i className="uil uil-heart" />
                    </span>
                    <span>
                      <i className="uil uil-comment-dots" />
                    </span>
                    <span>
                      <i className="uil uil-share-alt" />
                    </span>
                  </div>
                  <div className="bookmark">
                    <span>
                      <i className="uil uil-bookmark-full" />
                    </span>
                  </div>
                </div>
                <div className="liked-by">
                  <span>
                    <img src="./images/profile-10.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-4.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-15.jpg" />
                  </span>
                  <p>
                    Liked by <b>Ernest Achiever</b> and <b>2, 323 others</b>
                  </p>
                </div>
                <div className="caption">
                  <p>
                    <b>Benjamin Dwayne</b> Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Nostrum, consequuntur!
                    <span className="harsh-tag">#lifestyle</span>
                  </p>
                </div>
                <div className="comments text-muted">View all 277 comments</div>
              </div>
              {/*--------------- END OF FEED 6 ------------------*/}
              {/*--------------- FEED 7 ------------------*/}
              <div className="feed">
                <div className="head">
                  <div className="user">
                    <div className="profile-photo">
                      <img src="./images/profile-3.jpg" />
                    </div>
                    <div className="info">
                      <h3>Indiana Ellison</h3>
                      <small>Qatar, 8 Hours Ago</small>
                    </div>
                  </div>
                  <span className="edit">
                    <i className="uil uil-ellipsis-h" />
                  </span>
                </div>
                <div className="photo">
                  <img src="./images/feed-6.jpg" />
                </div>
                <div className="action-buttons">
                  <div className="interaction-buttons">
                    <span>
                      <i className="uil uil-heart" />
                    </span>
                    <span>
                      <i className="uil uil-comment-dots" />
                    </span>
                    <span>
                      <i className="uil uil-share-alt" />
                    </span>
                  </div>
                  <div className="bookmark">
                    <span>
                      <i className="uil uil-bookmark-full" />
                    </span>
                  </div>
                </div>
                <div className="liked-by">
                  <span>
                    <img src="./images/profile-10.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-4.jpg" />
                  </span>
                  <span>
                    <img src="./images/profile-15.jpg" />
                  </span>
                  <p>
                    Liked by <b>Benjamin Dwayne</b> and <b>2, 323 others</b>
                  </p>
                </div>
                <div className="caption">
                  <p>
                    <b>Indiana Ellison</b> Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Consequuntur itaque quasi
                    autem pariatur ducimus eligendi, qui odio molestias at
                    molestiae.
                    <span className="harsh-tag">#lifestyle</span>
                  </p>
                </div>
                <div className="comments text-muted">View all 277 comments</div>
              </div>
              {/*--------------- END OF FEED 7 ------------------*/}
            </div>
            {/*--------------- END OF FEEDS ------------------*/}
          </div>
          {/*--------------- END OF MIDDLE ------------------*/}
          {/*--------------- RIGHT ------------------*/}
          <div className="right">
            {/*----- MESSAGES -----*/}
            <div className="messages" ref={messagesRef}>
              <div className="heading">
                <h4>Messages</h4>
                <i className="uil uil-edit" />
              </div>
              {/*----- SEARCH BAR -----*/}
              <div className="search-bar">
                <i className="uil uil-search" />
                <input
                  type="search"
                  placeholder="Search messages"
                  id="message-search"
                  ref={messageSearchRef}
                />
              </div>
              {/*----- MESSAGES CATEGORY -----*/}
              <div className="category">
                <h6 className="active">Primary</h6>
                <h6>General</h6>
                <h6 className="message-requests">Requests (7)</h6>
              </div>
              {/*----- MESSAGES -----*/}
              <div className="message">
                <div className="profile-photo">
                  <img src="./images/profile-17.jpg" />
                </div>
                <div className="message-body">
                  <h6>Edem Quist</h6>
                  <p className="text-muted">Just woke up bruh</p>
                </div>
              </div>
              <div className="message">
                <div className="profile-photo">
                  <img src="./images/profile-6.jpg" />
                </div>
                <div className="message-body">
                  <h6>Daniella Jackson</h6>
                  <p className="text-bold">2 new messages</p>
                </div>
              </div>
              <div className="message">
                <div className="profile-photo">
                  <img src="./images/profile-8.jpg" />
                  <div className="active" />
                </div>
                <div className="message-body">
                  <h6>Chantel Msiza</h6>
                  <p className="text-muted">lol u right</p>
                </div>
              </div>
              <div className="message">
                <div className="profile-photo">
                  <img src="./images/profile-10.jpg" />
                </div>
                <div className="message-body">
                  <h6>Juliet Makarey</h6>
                  <p className="text-muted">Birthday Tomorrow</p>
                </div>
              </div>
              <div className="message">
                <div className="profile-photo">
                  <img src="./images/profile-3.jpg" />
                  <div className="active" />
                </div>
                <div className="message-body">
                  <h6>Keylie Hadid</h6>
                  <p className="text-bold">5 new messages</p>
                </div>
              </div>
              <div className="message">
                <div className="profile-photo">
                  <img src="./images/profile-15.jpg" />
                </div>
                <div className="message-body">
                  <h6>Benjamin Dwayne</h6>
                  <p className="text-muted">haha got that!</p>
                </div>
              </div>
            </div>
            {/*----- END OF MESSAGES -----*/}
            {/*----- FRIEND REQUEST -----*/}
            <div className="friend-requests">
              <h4>Requests</h4>
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="./images/profile-20.jpg" />
                  </div>
                  <div>
                    <h6>Hajia Bintu</h6>
                    <p className="text-muted">8 mutual friends</p>
                  </div>
                </div>
                <div className="action">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn">Decline</button>
                </div>
              </div>
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="./images/profile-18.jpg" />
                  </div>
                  <div>
                    <h6>Edelson Mandela</h6>
                    <p className="text-muted">2 mutual friends</p>
                  </div>
                </div>
                <div className="action">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn">Decline</button>
                </div>
              </div>
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="./images/profile-17.jpg" />
                  </div>
                  <div>
                    <h6>Megan Baldwin</h6>
                    <p className="text-muted">5 mutual friends</p>
                  </div>
                </div>
                <div className="action">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn">Decline</button>
                </div>
              </div>
            </div>
          </div>
          {/*--------------- END OF RIGHT ------------------*/}
        </div>
      </main>

      {/* ---------------Show article detail ----------------- */}
      <div className="overlay" hidden>
        <div className="modal-custom">
          <span className="material-symbols-outlined close-button">close</span>
          <div className="modal-custom-left">
            <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={0}
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={1}
                  aria-label="Slide 2"
                />
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={2}
                  aria-label="Slide 3"
                />
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Ffeed-3.jpg?alt=media&token=0d8acaf8-895f-410b-b1be-3181b7abc879"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Ffeed-4.jpg?alt=media&token=c096f5e9-7149-4f26-9388-68fbaf7fa2a8"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Ffeed-5.jpg?alt=media&token=c5823e1a-d46f-4e45-81eb-a99a05cf1714"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="modal-custom-bottom">
              <div className="feed">
                <div className="action-buttons">
                  <div className="interaction-buttons">
                    <span>
                      <i className="uil uil-heart" />
                    </span>
                    <span>
                      <i className="uil uil-comment-dots" />
                    </span>
                    <span>
                      <i className="uil uil-share-alt" />
                    </span>
                  </div>
                  <div className="bookmark">
                    <span>
                      <i className="uil uil-bookmark-full" />
                    </span>
                  </div>
                </div>
                <div className="liked-by">
                  <p>
                    Liked by <b>Ernest Achiever</b> and <b>2, 323 others</b>
                  </p>
                </div>
                <div className="caption">
                  <p>
                    <b>Lana Rose</b> Lorem ipsum dolor sit quisquam eius.
                    <span className="harsh-tag">#lifestyle</span>
                  </p>
                </div>
                <div className="comments text-muted">View all 277 comments</div>
              </div>
            </div>
          </div>

          <div className="modal-custom-right">
            <div className="article-owner">
              <div className="info-article-owner">
                <div className="profile-photo">
                  <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-13.jpg?alt=media&token=ed27a7c7-abad-44d7-a008-1fa03306f85d" />
                </div>
                <b>Niva ridania</b>
                <h6>Follow</h6>
              </div>
              <span className="material-symbols-outlined">more_horiz</span>
            </div>
            <hr />
            <div className="article-comment">
              <div className="comment-container">
                <img
                  src="avatar-url.jpg"
                  alt="User Avatar"
                  className="comment-avatar"
                />
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-username">User name</span>
                    <span className="comment-time">2 hours ago</span>
                  </div>
                  <div className="comment-text">main comment</div>
                  <div className="comment-actions">
                    <span className="material-symbols-outlined">favorite</span>
                    <span className="material-symbols-outlined">reply</span>
                  </div>
                  {/* Các bình luận trả lời con sẽ được đặt ở đây */}
                  <div className="comment-reply">
                    <div className="comment-container">
                      <img
                        src="avatar-url.jpg"
                        alt="User Avatar"
                        className="comment-avatar"
                      />
                      <div className="comment-content">
                        <div className="comment-header">
                          <span className="comment-username">User name</span>
                          <span className="comment-time">1 hour ago</span>
                        </div>
                        <div className="comment-text">main comment</div>
                        <div className="comment-actions">
                          <span className="material-symbols-outlined">
                            favorite
                          </span>
                          <span className="material-symbols-outlined">
                            reply
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="post-comment">
              <span className="material-symbols-outlined">add_reaction</span>
              <input type="text" placeholder="comment" />
              <button type="button" className="btn btn-outline-primary">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
