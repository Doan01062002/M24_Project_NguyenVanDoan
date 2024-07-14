import React, { useEffect, useState } from "react";
import "../assets/EditProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { renderUser, updateUser } from "../services/account.service";
import { getCheckUser } from "../util";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import { User } from "../interfaces/page";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfile: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [profileImage, setProfileImage] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [city, setCity] = useState("");
  const [work, setWork] = useState("");
  const [study, setStudy] = useState("");
  const [hometown, setHometown] = useState("");
  const [relationship, setRelationship] = useState("");

  const users = useSelector((state: any) => state.users.accountUser);
  const getUser: User = users.find((item: User) => item.id === getCheckUser.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderUser());
  }, [dispatch]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    setUrl: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setUrl(url);
        });
      });
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateUser = () => {
    const updatedUser = {
      userName: getCheckUser.userName,
      email: getCheckUser.email,
      name: getCheckUser.name,
      password: getCheckUser.password,
      avatar: profileImage,
      banner: coverPhoto,
      bio: "",
      city: city,
      work: work,
      study: study,
      hometown: hometown,
      relationship: relationship,
      follows: [],
      friends: [...getUser.friends],
      groups: [],
      created_at: getCheckUser.created_at,
      status: true,
    };
    dispatch(updateUser({ id: getCheckUser.id, user: updatedUser }));
    setCity("");
    setCoverPhoto("");
    setHometown("");
    setProfileImage("");
    setRelationship("");
    setStudy("");
    setWork("");
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-edit-profile" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Edit Profile</h2>
        <div className="profile-options">
          <div>
            <strong>Profile Image</strong>
            <button
              onClick={() =>
                document.getElementById("profileImageInput")?.click()
              }
            >
              Edit
            </button>
            <input
              type="file"
              id="profileImageInput"
              style={{ display: "none" }}
              onChange={(e) =>
                handleFileChange(e, setProfileImage, setProfileImage)
              }
            />
          </div>
          {profileImage && (
            <div className="image-preview">
              <img src={profileImage} alt="Profile" />
            </div>
          )}
          <div>
            <strong>Cover Photo</strong>
            <button
              onClick={() =>
                document.getElementById("coverPhotoInput")?.click()
              }
            >
              Edit
            </button>
            <input
              type="file"
              id="coverPhotoInput"
              style={{ display: "none" }}
              onChange={(e) =>
                handleFileChange(e, setCoverPhoto, setCoverPhoto)
              }
            />
          </div>
          {coverPhoto && (
            <div className="cover-photo">
              <img src={coverPhoto} alt="Cover" />
            </div>
          )}
          <div>
            <strong>City</strong>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <strong>Work</strong>
            <input
              type="text"
              value={work}
              onChange={(e) => setWork(e.target.value)}
            />
          </div>
          <div>
            <strong>Study</strong>
            <input
              type="text"
              value={study}
              onChange={(e) => setStudy(e.target.value)}
            />
          </div>
          <div>
            <strong>Hometown</strong>
            <input
              type="text"
              value={hometown}
              onChange={(e) => setHometown(e.target.value)}
            />
          </div>
          <div>
            <strong>Relationship</strong>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
            />
          </div>
        </div>
        <button className="confirm-button" onClick={handleUpdateUser}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
