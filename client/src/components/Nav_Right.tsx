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
              <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-10.jpg?alt=media&token=be3c7869-2c76-4731-ad6b-d305cac7f6c1" />
            </div>
            <div className="message-body">
              <h6>Edem Quist</h6>
              <p className="text-muted">Just woke up bruh</p>
            </div>
          </div>
          <div className="message">
            <div className="profile-photo">
              <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-12.jpg?alt=media&token=4f31bf09-4cfa-46a8-91bb-f55d1ff11cdc" />
            </div>
            <div className="message-body">
              <h6>Daniella Jackson</h6>
              <p className="text-bold">2 new messages</p>
            </div>
          </div>
          <div className="message">
            <div className="profile-photo">
              <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-18.jpg?alt=media&token=e1ccfc38-fb86-47bc-8a6e-ef0b244828fe" />
              <div className="active" />
            </div>
            <div className="message-body">
              <h6>Chantel Msiza</h6>
              <p className="text-muted">lol u right</p>
            </div>
          </div>
          <div className="message">
            <div className="profile-photo">
              <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-11.jpg?alt=media&token=55df5258-7239-4f7c-ba8c-bbf9412ab1de" />
            </div>
            <div className="message-body">
              <h6>Juliet Makarey</h6>
              <p className="text-muted">Birthday Tomorrow</p>
            </div>
          </div>
          <div className="message">
            <div className="profile-photo">
              <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-13.jpg?alt=media&token=ed27a7c7-abad-44d7-a008-1fa03306f85d" />
              <div className="active" />
            </div>
            <div className="message-body">
              <h6>Keylie Hadid</h6>
              <p className="text-bold">5 new messages</p>
            </div>
          </div>
          <div className="message">
            <div className="profile-photo">
              <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-14.jpg?alt=media&token=7a3f5408-fa29-4121-8dfd-eb50b3b1132c" />
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
