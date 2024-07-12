import React, { useEffect, useState } from "react";
import "../assets/CreateGroup.css";
import { useDispatch, useSelector } from "react-redux";
import { renderGroup, addGroup } from "../services/group.service";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getCheckUser } from "../util";

export default function CreateGroup() {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupPrivacy, setGroupPrivacy] = useState("public");
  const [groupImage, setGroupImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGroupImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl = "";
    if (groupImage) {
      const storageRef = ref(storage, `group-images/${groupImage.name}`);
      await uploadBytes(storageRef, groupImage);
      imageUrl = await getDownloadURL(storageRef);
    }

    const newGroup = {
      groupName,
      userCreate: getCheckUser.id,
      group_picture: imageUrl,
      banner: imageUrl,
      bio: groupDescription,
      members: [],
      status: true,
      created_at:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    };

    dispatch(addGroup(newGroup));

    // Reset form
    setGroupName("");
    setGroupDescription("");
    setGroupPrivacy("public");
    setGroupImage(null);
    setImagePreview(null);
  };

  return (
    <>
      <div className="container-create-group">
        <h1>Tạo Nhóm Mới</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="group-name">Tên Nhóm</label>
            <input
              type="text"
              id="group-name"
              name="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="group-description">Mô Tả Nhóm</label>
            <textarea
              id="group-description"
              name="group-description"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="group-privacy">Chế Độ Riêng Tư</label>
            <select
              id="group-privacy"
              name="group-privacy"
              value={groupPrivacy}
              onChange={(e) => setGroupPrivacy(e.target.value)}
              required
            >
              <option value="public">Công Khai</option>
              <option value="private">Riêng Tư</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="group-image">Ảnh Nhóm</label>
            <input type="file" id="group-image" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" />}
          </div>
          <div className="form-group">
            <button type="submit">Tạo Nhóm</button>
          </div>
        </form>
      </div>
    </>
  );
}
