import React, { useState, useEffect, useRef } from "react";
import "../assets/mainPage.css";
import { useNavigate } from "react-router-dom";
import { setCheckUser } from "../util";
import Feeds from "../components/Feeds";
import UploadPost from "../components/UploadPost";
import Nav_Right from "../components/Nav_Right";
import Nav_Left from "../components/Nav_Left";

export default function MainPage() {
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
          <Nav_Left></Nav_Left>
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
            <div className="create-post">
              <UploadPost></UploadPost>
            </div>
            {/*--------------- FEEDS ------------------*/}
            <Feeds></Feeds>
            {/*--------------- END OF FEEDS ------------------*/}
          </div>
          {/*--------------- END OF MIDDLE ------------------*/}
          {/*--------------- RIGHT ------------------*/}
          <Nav_Right></Nav_Right>
          {/*--------------- END OF RIGHT ------------------*/}
        </div>
      </main>
    </>
  );
}
