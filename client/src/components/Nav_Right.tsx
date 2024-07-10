import React from "react";

export default function Nav_Right() {
  return (
    <>
      <div className="right">
        {/*----- MESSAGES -----*/}
        <div className="messages">
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
      </div>
    </>
  );
}
