import React, { useEffect, useState } from "react";
import "../assets/myIndividual.css";
import UploadPost from "../components/UploadPost";
import UserFeeds from "../components/UserFeeds";
import ManagerFriends from "../components/ManagerFriends";
import ActionPostUser from "../components/ActionPostUser";
import Nav_Left from "../components/Nav_Left";
import Nav_Right from "../components/Nav_Right";
import EditProfile from "../components/EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { renderUser } from "../services/account.service";
import { User } from "../interfaces/page";
import { getCheckUser } from "../util";

export default function MyIndividual() {
  const [navAction, setNavAction] = useState<string>("posts");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
            <div className="nav-profile feed">
              <img className="banner-profile" src={getUser.banner} />
              <div className="nav-info">
                <div className="nav-head-info">
                  <img className="profile-photo-info" src={getUser.avatar} />
                  <div className="nav-info-name">
                    <h5>{getUser.name}</h5>
                    <h6>{getUser.friends.length} friends</h6>
                    <div className="liked-by">
                      <span>
                        <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-1.jpg?alt=media&token=2539162a-adf0-4333-9fea-f3dd9feb5103" />
                      </span>
                      <span>
                        <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-16.jpg?alt=media&token=314da891-931f-4dda-bb4c-e5539f524434" />
                      </span>
                      <span>
                        <img src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2FimagesMain_page%2Fprofile-11.jpg?alt=media&token=55df5258-7239-4f7c-ba8c-bbf9412ab1de" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="nav-action-infor">
                  <button className="btn-edit-info" onClick={openModal}>
                    <span className="material-symbols-outlined">edit</span>
                    Edit information
                  </button>
                </div>
              </div>
              <hr />
              <ul className="nav justify-content-center">
                <li onClick={() => setNavAction("posts")} className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Posts
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Introduce
                  </a>
                </li>
                <li
                  onClick={() => setNavAction("friends")}
                  className="nav-item"
                >
                  <a className="nav-link" href="#">
                    Friends
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Images
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Video
                  </a>
                </li>
              </ul>
            </div>
            {navAction === "friends" && (
              <div className="create-post">
                <ManagerFriends />
              </div>
            )}

            {navAction === "posts" && (
              <>
                <div className="create-post">
                  <UploadPost />
                </div>
                <div className="create-post">
                  <ActionPostUser />
                </div>
                <UserFeeds />
              </>
            )}
          </div>
          <Nav_Right />
        </div>
      </main>
      <EditProfile isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
