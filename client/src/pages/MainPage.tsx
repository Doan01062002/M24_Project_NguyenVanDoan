import React, { useEffect, useState } from "react";
import "../assets/mainPage.css";
import { getCheckUser } from "../util";
import Feeds from "../components/Feeds";
import UploadPost from "../components/UploadPost";
import Nav_Right from "../components/Nav_Right";
import Nav_Left from "../components/Nav_Left";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../interfaces/page";
import { renderUser } from "../services/account.service";
import { searchAll } from "../services/searchSlice.service";
import { SearchResults } from "../interfaces/page";
import UserCard from "../components/UserCardSearch";
import GroupCard from "../components/GroupCardSearch";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const users = useSelector((state: any) => state.users.accountUser);
  const searchResults: SearchResults = useSelector(
    (state: any) => state.search.results
  );

  const getUser: User = users.find((item: User) => item.id === getCheckUser.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderUser()).then(() => setLoading(false));
  }, [dispatch]);

  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    dispatch(searchAll(query));
    setShowFilters(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!getUser) {
    return navigate("/login");
  }

  const filteredResults = {
    users: filter === "all" || filter === "users" ? searchResults.users : [],
    posts: filter === "all" || filter === "posts" ? searchResults.posts : [],
    groups: filter === "all" || filter === "groups" ? searchResults.groups : [],
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="create">
            <div className="profile-photo">
              <img src={getUser.avatar} alt="" />
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          <Nav_Left />
          <div className="middle">
            {showFilters && (
              <div className="filter-bar">
                <h3>Kết quả tìm kiếm</h3>
                <div className="filters">
                  <button onClick={() => handleFilterChange("posts")}>
                    Bài viết
                  </button>
                  <button onClick={() => handleFilterChange("users")}>
                    Mọi người
                  </button>
                  <button onClick={() => handleFilterChange("groups")}>
                    Nhóm
                  </button>
                </div>
              </div>
            )}

            {!showFilters && (
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
            )}
            {!showFilters && (
              <div className="create-post">
                <UploadPost />
              </div>
            )}

            {showFilters ? (
              filter === "users" ? (
                <div className="user-results">
                  {filteredResults.users.map((user: User) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              ) : filter === "groups" ? (
                <div className="group-results">
                  {filteredResults.groups.map((group: any) => (
                    <GroupCard key={group.id} group={group} />
                  ))}
                </div>
              ) : (
                <Feeds searchResults={filteredResults} />
              )
            ) : (
              <Feeds searchResults={{ users: [], posts: [], groups: [] }} />
            )}
          </div>
          <Nav_Right />
        </div>
      </main>
    </>
  );
}
