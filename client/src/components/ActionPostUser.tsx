import React, { useEffect, useState } from "react";
import "../assets/ActionPostUser.css";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../interfaces/page";
import { getCheckUser } from "../util";
import { renderPost, deletePost } from "../services/posts.service";

export default function ActionPostUser() {
  const [showPostManager, setShowPostManager] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const reversedPosts = useSelector((state: any) => state.post.post || []);
  const filterPostUser = reversedPosts.filter(
    (item: Post) => item.user_id === getCheckUser.id
  );
  const posts = [...filterPostUser].reverse().map((post) => ({
    ...post,
    checked: false,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderPost());
  }, [dispatch]);

  const [postItems, setPostItems] = useState(posts);

  // Only update postItems when posts change
  useEffect(() => {
    setPostItems(posts);
  }, [reversedPosts]);

  const togglePostManager = () => {
    setShowPostManager(!showPostManager);
  };

  const handleSelectAll = () => {
    const newCheckedState = !selectAll;
    setSelectAll(newCheckedState);
    setPostItems(
      postItems.map((item) => ({ ...item, checked: newCheckedState }))
    );
  };

  const handleCheckboxChange = (id: number) => {
    setPostItems(
      postItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDeleteSelected = () => {
    const selectedPostIds = postItems
      .filter((item) => item.checked)
      .map((item) => item.id);

    selectedPostIds.forEach((postId) => {
      dispatch(deletePost(postId));
    });

    setPostItems(postItems.filter((item) => !item.checked));
    setSelectAll(false);
  };

  return (
    <>
      <div className="action-header-User">
        <div className="header">
          <h2>Posts</h2>
          <div className="header-left">
            <button>
              <span className="material-symbols-outlined">tune</span> Bộ lọc
            </button>
            <button onClick={togglePostManager}>
              <span className="material-symbols-outlined">settings</span> Quản
              lý bài viết
            </button>
          </div>
        </div>
        <div className="tab-menu">
          <span className="active">Xem theo danh sách</span>
          <span>Chế độ xem lưới</span>
        </div>
      </div>
      {showPostManager && (
        <div className="post-manager-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Quản lý bài viết</h3>
              <button className="close-button" onClick={togglePostManager}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <button className="select-all" onClick={handleSelectAll}>
                Chọn tất cả
              </button>
              <div className="post-list">
                {postItems.map((item) => (
                  <div className="post-item" key={item.id}>
                    <input
                      type="checkbox"
                      id={`post${item.id}`}
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <label htmlFor={`post${item.id}`}>
                      <img src={item.image} alt={`Post ${item.id}`} />
                      <div className="post-info">
                        <p>{item.created_at}</p>
                        <small>{item.content}</small>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="delete-button" onClick={handleDeleteSelected}>
                Xóa
              </button>
              <button className="next-button">Tiếp</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
