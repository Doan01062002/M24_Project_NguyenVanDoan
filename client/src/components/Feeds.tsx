import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderPost } from "../services/posts.service";
import { renderUser } from "../services/account.service";
import { Post, User, SearchResults } from "../interfaces/page"; // Điều chỉnh đường dẫn import cho phù hợp

interface FeedsProps {
  searchResults: SearchResults;
}

export default function Feeds({ searchResults }: FeedsProps) {
  const reversedPosts = useSelector((state: any) => state.post.post || []);
  const posts = [...reversedPosts].reverse();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderPost());
  }, [dispatch]);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [getIdItemFeed, setGetIdItemFeed] = useState<number>(0);
  const [getPost, setGetPost] = useState<Post>({
    id: 0,
    user_id: 0,
    group_id: 0,
    content: "",
    image: [],
    reactions: [],
    created_at: "",
    status: true,
    action: "",
  });

  const handleShowDetail = (id: number) => {
    setGetIdItemFeed(id);
    setGetPost(posts.find((item: Post) => item.id === id) || getPost);
    setShowDetail(true);
  };

  const [loading, setLoading] = useState<boolean>(true);

  const users = useSelector((state: any) => state.users.accountUser);

  useEffect(() => {
    dispatch(renderUser()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getImageUserPost = (user_id: number) => {
    const getUser: User = users.find((item: User) => item.id === user_id);
    return getUser?.avatar || "";
  };

  const getUserNamePost = (user_id: number) => {
    const getUser: User = users.find((item: User) => item.id === user_id);
    return getUser?.name || "Unknown";
  };

  const renderPosts = searchResults?.posts?.length
    ? searchResults.posts
    : posts;

  return (
    <>
      <div className="feeds">
        {renderPosts &&
          renderPosts.map((item: Post, index: number) => (
            <div key={index} className="feed">
              <div className="head">
                <div className="user">
                  <div className="profile-photo">
                    <img src={getImageUserPost(item.user_id)} alt="profile" />
                  </div>
                  <div className="info">
                    <h3>{getUserNamePost(item.user_id)}</h3>
                    <small>{item.created_at}</small>
                  </div>
                </div>
                <span className="edit">
                  <i className="uil uil-ellipsis-h" />
                </span>
              </div>
              <div className="photo">
                <img src={item.image[0]} alt="" />
              </div>
              <div className="action-buttons">
                <div className="interaction-buttons">
                  <span>
                    <i className="uil uil-heart" />
                  </span>
                  <span onClick={() => handleShowDetail(item.id)}>
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
                  <img src="./images/profile-10.jpg" alt="profile" />
                </span>
                <span>
                  <img src="./images/profile-4.jpg" alt="profile" />
                </span>
                <span>
                  <img src="./images/profile-15.jpg" alt="profile" />
                </span>
                <p>
                  Liked by <b>Ernest Achiever</b> and <b>2, 323 others</b>
                </p>
              </div>
              <div className="caption">
                <p>{item.content}</p>
              </div>
              <div className="comments text-muted">View all 277 comments</div>
            </div>
          ))}
      </div>
      {showDetail && (
        <div className="overlay-detail">
          <div className="modal-custom">
            <span
              onClick={() => setShowDetail(false)}
              className="material-symbols-outlined close-button"
            >
              close
            </span>
            <div className="modal-custom-left">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  {getPost.image.map((item: string, index: number) => (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to={index}
                      className={index === 0 ? "active" : ""}
                      aria-current={index === 0 ? "true" : "false"}
                      aria-label={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="carousel-inner">
                  {getPost.image.map((item: string, index: number) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img src={item} alt={`Slide ${index + 1}`} />
                    </div>
                  ))}
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
                      <b>{getUserNamePost(getPost.user_id)}</b>{" "}
                      {getPost.content}
                      <span className="harsh-tag">#lifestyle</span>
                    </p>
                  </div>
                  <div className="comments text-muted">
                    View all 277 comments
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-custom-right">
              <div className="article-owner">
                <div className="info-article-owner">
                  <div className="profile-photo">
                    <img
                      src={getImageUserPost(getPost.user_id)}
                      alt="profile"
                    />
                  </div>
                  <b>{getUserNamePost(getPost.user_id)}</b>
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
                      <span className="material-symbols-outlined">
                        favorite
                      </span>
                      <span className="material-symbols-outlined">reply</span>
                    </div>
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
      )}
    </>
  );
}
