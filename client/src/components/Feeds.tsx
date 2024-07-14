import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commentPost,
  reactionPost,
  reactionPostCancel,
  renderPost,
} from "../services/posts.service";
import { renderUser } from "../services/account.service";
import {
  Post,
  User,
  SearchResults,
  Comment,
  replyComment,
  Reaction,
} from "../interfaces/page";
import { getCheckUser } from "../util";

interface FeedsProps {
  searchResults: SearchResults;
}

export default function Feeds({ searchResults }: FeedsProps) {
  //Comment
  const [valueComment, setValueComment] = useState<string>("");
  const [getIdItemFeed, setGetIdItemFeed] = useState<number>(0);

  //
  const reversedPosts = useSelector((state: any) => state.post.post || []);
  const posts = [...reversedPosts].reverse();

  const getPosts: Post = posts.find((item: Post) => item.id === getIdItemFeed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderPost());
  }, [dispatch]);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [getPost, setGetPost] = useState<Post>({
    id: 0,
    user_id: 0,
    group_id: 0,
    content: "",
    image: [],
    reaction: [],
    comments: [],
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

  const getUser: User = users.find((item: User) => item.id === getCheckUser.id);

  useEffect(() => {
    dispatch(renderUser()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  /**
   * Comment
   */

  const handleValueComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueComment(e.target.value);
  };

  const handlePostComment = (postId: number) => {
    const comment = {
      user_id: getCheckUser.id,
      user_name: getCheckUser.name,
      avatar: getUser.avatar,
      content: valueComment,
      reaction: [],
      reply_comment: [],
      created_at:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    };
    dispatch(commentPost({ postId, comment }));
    setValueComment("");
  };

  /**
   * Reaction Post
   */

  const handleReactionPost = (postId: number) => {
    const reaction = {
      user_id: getCheckUser.id,
      type: "tym",
      create_at:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    };

    dispatch(reactionPost({ postId, reaction }));
  };

  // Cancel reaction Post

  const getIdReactionPost = getPosts?.reaction.find(
    (item: Reaction) => item.user_id === getCheckUser.id
  )?.user_id;

  const handleCancelReactionPost = (postId: number) => {
    if (getIdReactionPost) {
      dispatch(reactionPostCancel({ postId, reactionId: getIdReactionPost }));
    }
  };

  return (
    <>
      <div className="feeds">
        {posts.map((item: Post, index: number) =>
          item.status ? (
            <div key={index} className="feed">
              <div className="head">
                <div className="user">
                  <div className="profile-photo">
                    <img
                      src={
                        users.find((items: User) => items.id === item.user_id)
                          .avatar
                      }
                      alt="profile"
                    />
                  </div>
                  <div className="info">
                    <h3>
                      {
                        users.find((items: User) => items.id === item.user_id)
                          .name
                      }
                    </h3>
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
                    {item.reaction.find(
                      (item: Reaction) => item.user_id === getCheckUser.id
                    ) ? (
                      <i
                        onClick={() => handleCancelReactionPost(item.id)}
                        style={{ color: "red" }}
                        className="fa-solid fa-heart"
                      ></i>
                    ) : (
                      <i
                        onClick={() => handleReactionPost(item.id)}
                        className="uil uil-heart"
                      />
                    )}
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
                <p>
                  Liked by <b>{item.reaction.length} People</b>
                </p>
              </div>
              <div className="caption">
                <p>{item.content}</p>
              </div>
              <div className="comments text-muted">
                View all {item.comments.length} comments
              </div>
            </div>
          ) : null
        )}
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
                        {getPosts?.reaction.find(
                          (item: Reaction) => item.user_id === getCheckUser.id
                        ) ? (
                          <i
                            onClick={() =>
                              handleCancelReactionPost(getPosts.id)
                            }
                            style={{ color: "red" }}
                            className="fa-solid fa-heart"
                          ></i>
                        ) : (
                          <i
                            onClick={() => handleReactionPost(getPosts.id)}
                            className="uil uil-heart"
                          />
                        )}
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
                      Liked by <b>{getPosts.reaction.length} people</b>
                    </p>
                  </div>
                  <div className="caption">
                    <p>
                      <b>
                        {
                          users.find(
                            (items: User) => items.id === getPosts.user_id
                          ).name
                        }
                      </b>{" "}
                      {getPost.content}
                      <span className="harsh-tag">#lifestyle</span>
                    </p>
                  </div>
                  <div className="comments text-muted">
                    There were a total of {getPosts.reaction.length}{" "}
                    interactions
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-custom-right">
              <div className="article-owner">
                <div className="info-article-owner">
                  <div className="profile-photo">
                    <img
                      src={
                        users.find(
                          (items: User) => items.id === getPosts.user_id
                        ).avatar
                      }
                      alt="profile"
                    />
                  </div>
                  <b>
                    {
                      users.find((items: User) => items.id === getPosts.user_id)
                        .name
                    }
                  </b>
                  <h6>Follow</h6>
                </div>
                <span className="material-symbols-outlined">more_horiz</span>
              </div>
              <hr />
              <div className="article-comment">
                {getPosts.comments.map((item: Comment, index: number) => (
                  <div key={index} className="comment-container">
                    <img
                      src={item.avatar}
                      alt="User Avatar"
                      className="comment-avatar"
                    />
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-username">
                          {item.user_name}
                        </span>
                        <span className="comment-time">{item.created_at}</span>
                      </div>
                      <div className="comment-text">{item.content}</div>
                      <div className="comment-actions">
                        <span className="material-symbols-outlined">
                          favorite
                        </span>
                        <span className="material-symbols-outlined">reply</span>
                      </div>
                      {/* <div className="comment-reply">
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
                    </div> */}
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="post-comment">
                <span className="material-symbols-outlined">add_reaction</span>
                <input
                  onChange={handleValueComment}
                  type="text"
                  placeholder="comment"
                  value={valueComment}
                />
                <button
                  onClick={() => handlePostComment(getIdItemFeed)}
                  type="button"
                  className="btn btn-outline-primary"
                >
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
