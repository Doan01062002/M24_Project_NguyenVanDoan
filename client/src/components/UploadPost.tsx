import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import "../assets/mainPage.css";
import { getCheckUser } from "../util";
import { useDispatch, useSelector } from "react-redux";
import { postFeed, renderPost } from "../services/posts.service";
import { User } from "../interfaces/page";
import { renderUser } from "../services/account.service";

export default function UploadPost() {
  const [images, setImages] = useState<File[]>([]);
  const [name, setName] = useState<string>("");
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("public");
  const [showUploadFile, setShowUploadFile] = useState<boolean>(false);

  const posts = useSelector((state: any) => {
    state.post.post;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderPost());
  }, [dispatch]);

  const uploadImages = (e: React.MouseEvent) => {
    e.preventDefault();
    const promises = images.map((image) => {
      const imageRef = ref(storage, `image/${image.name}`);
      return uploadBytes(imageRef, image).then((snapshot) =>
        getDownloadURL(snapshot.ref)
      );
    });

    Promise.all(promises).then((urls) => {
      const newPost = {
        user_id: getCheckUser.id,
        content: name,
        image: urls, // Thêm urls vào một mảng images trong đối tượng
        reaction: [],
        created_at:
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString(),
        status: true,
        action: selectedValue,
      };

      dispatch(postFeed(newPost));
    });
    setName("");
    setPreviews([]);
    setImages([]);
    setSelectedValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prevImages) => [...prevImages, ...files]);

    const newPreviews = files.map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result as string);
      });
    });

    Promise.all(newPreviews).then((previewUrls) => {
      setPreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
    });
  };

  const handleChangePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleChangeAction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleShowUploadFile = () => {
    setShowUploadFile(!showUploadFile);
  };

  /**
   * Get User
   */
  const [loading, setLoading] = useState<boolean>(true);

  const users = useSelector((state: any) => {
    return state.users.accountUser;
  });

  const getUser: User = users.find((item: User) => item.id === getCheckUser.id);

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
      <div className="information-post">
        <div className="profile-photo">
          <img src={getUser.avatar} alt="" />
        </div>
        <input
          value={name}
          onChange={handleChangePost}
          type="text"
          placeholder="What's on your mind?"
          id="create-post"
        />
        <div className="icons-function">
          <span
            onClick={handleShowUploadFile}
            className="material-symbols-outlined"
          >
            add_photo_alternate
          </span>
          <span className="material-symbols-outlined">video_call</span>
          <span className="material-symbols-outlined">folder</span>
          <span className="material-symbols-outlined">group_add</span>
          <span className="material-symbols-outlined">add_reaction</span>
        </div>
        {showUploadFile && (
          <div className="image-post">
            <div className="input-group">
              <input
                onChange={handleChange}
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                className="form-control"
                id="inputGroupFile04"
                type="file"
                multiple
              />
            </div>
          </div>
        )}

        <div className="preview-container">
          {previews.map((preview, index) => (
            <div key={index} className="image-preview-wrapper">
              <img
                style={{ width: "200px", height: "100px", margin: "10px" }}
                src={preview}
                alt={`Image Preview ${index + 1}`}
              />
              <button
                className="remove-image-button"
                onClick={() => removeImage(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="information-post-right">
        <select
          defaultValue={selectedValue}
          onChange={handleChangeAction}
          className="form-select"
          aria-label="Default select example"
        >
          <option value="public" selected>
            Public
          </option>
          <option value="private">Private</option>
        </select>
        <button onClick={uploadImages} className="btn btn-primary">
          Post
        </button>
      </div>
    </>
  );
}
