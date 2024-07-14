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
          <div className="logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesAdmin%2Flogo.png?alt=media&token=018c46b8-3e94-4fbd-a405-f0283e15a92e"
              alt="Logo"
            />
            <h2>
              VN<span className="danger">SN</span>
            </h2>
          </div>
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
                <h3>Search Results</h3>
                <div className="filters">
                  <button onClick={() => handleFilterChange("posts")}>
                    Posts
                  </button>
                  <button onClick={() => handleFilterChange("users")}>
                    Everybody
                  </button>
                  <button onClick={() => handleFilterChange("groups")}>
                    Groups
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
                    <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-19.jpg?alt=media&token=2b43e031-7839-4df3-9d4e-acb1132d5581" />
                  </div>
                  <p className="name">Lila James</p>
                </div>
                <div className="story">
                  <div className="profile-photo">
                    <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-14.jpg?alt=media&token=7a3f5408-fa29-4121-8dfd-eb50b3b1132c" />
                  </div>
                  <p className="name">Winnie Haley</p>
                </div>
                <div className="story">
                  <div className="profile-photo">
                    <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-13.jpg?alt=media&token=ed27a7c7-abad-44d7-a008-1fa03306f85d" />
                  </div>
                  <p className="name">Daniel Bale</p>
                </div>
                <div className="story">
                  <div className="profile-photo">
                    <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-11.jpg?alt=media&token=55df5258-7239-4f7c-ba8c-bbf9412ab1de" />
                  </div>
                  <p className="name">Jane Doe</p>
                </div>
                <div className="story">
                  <div className="profile-photo">
                    <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-18.jpg?alt=media&token=e1ccfc38-fb86-47bc-8a6e-ef0b244828fe" />
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
