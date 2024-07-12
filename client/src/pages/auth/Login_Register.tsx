import React, { useEffect, useState } from "react";
import { User } from "../../interfaces/page";
import { useDispatch, useSelector } from "react-redux";
import { addUser, renderUser } from "../../services/account.service";
import "../../assets/login_Register.css";
import { useNavigate } from "react-router-dom";

export default function Login_Register() {
  // logic next web
  const navigate = useNavigate();
  /**
   *************** Logic next login and register ******************
   */
  const [signUpMode, setSignUpMode] = useState<boolean>(false);

  const handleSignUpClick = () => {
    setSignUpMode(true);
  };

  const handleSignInClick = () => {
    setSignUpMode(false);
  };

  /**
   ***********Logic login and register user**************
   */

  const users = useSelector((state: any) => {
    return state.users.accountUser;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderUser());
  }, [dispatch]);
  // value input register
  const [valueFullname, setValueFullname] = useState<string>("");
  const [valueUsername, setValueUsername] = useState<string>("");
  const [valueEmail, setValueEmail] = useState<string>("");
  const [valuePassword, setValuePassword] = useState<string>("");
  const [valueComfirmPassword, setValueConfirmPassword] = useState<string>("");

  // function update value Fullname
  const functionValueFullname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueFullname(e.target.value);
  };

  //function update value Username
  const functionValueUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueUsername(e.target.value);
  };

  //function update value Email
  const functionValueEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };

  //function update value Password
  const functionValuePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValuePassword(e.target.value);
  };

  //function update value comfirm Password
  const functionValueConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValueConfirmPassword(e.target.value);
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const addNewUser = (e: React.MouseEvent) => {
    e.preventDefault();
    // check for duplicate username
    const checkUsername = users.find(
      (item: User) => item.userName === valueUsername
    );
    //check for duplicate email
    const checkEmailRegister = users.find(
      (item: User) => item.email === valueEmail
    );
    if (valueFullname === "") {
      alert("Fullname is required.");
    } else if (valueUsername === "") {
      alert("Username is required.");
    } else if (!validateEmail(valueEmail)) {
      alert("Invalid email address.");
    } else if (valuePassword !== valueComfirmPassword) {
      alert("Passwords do not match.");
    } else if (checkUsername) {
      alert("Username already exists.");
    } else if (checkEmailRegister) {
      alert("Email is already registered.");
    } else {
      const newUser = {
        userName: valueUsername,
        email: valueEmail,
        name: valueFullname,
        password: valuePassword,
        avatar: "",
        banner: "",
        bio: "",
        city: "city",
        work: "work",
        study: "study",
        hometown: "hometown",
        relationship: "relationship",
        follows: [],
        friends: [],
        groups: [],
        created_at:
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString(),
        status: true,
      };
      dispatch(addUser(newUser));
      setValueFullname("");
      setValueUsername("");
      setValueEmail("");
      setValuePassword("");
      setValueConfirmPassword("");
      setSignUpMode(false);
    }
  };

  /**
   ******************** Logic Login ********************
   */
  // value input login
  const [valueUsernameLogin, setValueUsernameLogin] = useState<string>("");
  const [valuePasswordLogin, setValuePasswordLogin] = useState<string>("");

  // function update value UsernameLogin
  const functionValueUsernameLogin = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValueUsernameLogin(e.target.value);
  };

  //function update value PasswordLogin
  const functionValuePasswordLogin = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValuePasswordLogin(e.target.value);
  };

  // handle Login
  const loginUser = (e: React.MouseEvent) => {
    e.preventDefault();

    // check Username
    const checkUsername = users.find(
      (item: User) => item.userName === valueUsernameLogin
    );

    if (!checkUsername) {
      alert("Account or password is incorrect");
    } else if (valuePasswordLogin !== checkUsername.password) {
      alert("Account or password is incorrect");
    } else if (!checkUsername.status) {
      alert("Your account has been locked");
      return;
    } else {
      console.log("Login successful");
      setValueUsernameLogin("");
      setValuePasswordLogin("");
      localStorage.setItem("checkUser", JSON.stringify(checkUsername));
      navigate("/");
      window.location.reload();
    }
  };
  return (
    <>
      <div className={`container_login ${signUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  value={valueUsernameLogin}
                  type="text"
                  placeholder="Username"
                  onChange={functionValueUsernameLogin}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  value={valuePasswordLogin}
                  type="password"
                  placeholder="Password"
                  onChange={functionValuePasswordLogin}
                />
              </div>
              <button onClick={loginUser} className="btn solid">
                Login
              </button>
              <p className="social-text">
                <u style={{ textDecoration: "underline" }}>forgot password</u>{" "}
                Or Sign in with social platforms
              </p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  value={valueFullname}
                  type="text"
                  placeholder="Fullname"
                  onChange={functionValueFullname}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  value={valueUsername}
                  type="text"
                  placeholder="Username"
                  onChange={functionValueUsername}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input
                  value={valueEmail}
                  type="email"
                  placeholder="Email"
                  onChange={functionValueEmail}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  value={valuePassword}
                  type="password"
                  placeholder="Password"
                  onChange={functionValuePassword}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  value={valueComfirmPassword}
                  type="password"
                  placeholder="Comfirm Password"
                  onChange={functionValueConfirmPassword}
                />
              </div>
              <button onClick={addNewUser} className="btn">
                Sign up
              </button>
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                onClick={handleSignUpClick}
                className="btn transparent"
                id="sign-up-btn"
              >
                Sign up
              </button>
            </div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2Fimageslogin_Register%2Flog.svg?alt=media&token=063e91e6-a06f-4c64-9d5a-692546d9d061"
              className="image"
              alt=""
            />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                onClick={handleSignInClick}
                className="btn transparent"
                id="sign-in-btn"
              >
                Sign in
              </button>
            </div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesPages%2Fimageslogin_Register%2Fregister.svg?alt=media&token=8a4a3c0f-7863-4734-8f75-3df6969c8264"
              className="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
