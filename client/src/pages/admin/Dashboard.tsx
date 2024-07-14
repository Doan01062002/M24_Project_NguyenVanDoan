import React, { useEffect, useState } from "react";
import "../../assets/asests_Admin/dashboard.css";
import Nav_Main from "../../components/component_admin/Nav_Main";
import Nav_Right from "../../components/component_admin/Nav_Right";
import { useNavigate } from "react-router-dom";
import { getCheckAdmin, setCheckAdmin } from "../../util";
import Manager_User from "../../components/component_admin/Manager_User";
import Manager_Group from "../../components/component_admin/Manager_Group";
import ManagerPost from "../../components/component_admin/ManagerPost";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../../services/accountAdmin.service";
import { AccountAdmin } from "../../interfaces/page";

const Dashboard: React.FC = () => {
  const [showMain, setShowMain] = useState<string>("dashboard");
  const [activeItem, setActiveItem] = useState<string>("dashboard");
  // Active
  const toggleSidebar = (show: boolean): void => {
    const sideMenu = document.querySelector("aside");
    if (sideMenu) {
      sideMenu.style.display = show ? "block" : "none";
    }
  };

  // Logout

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAdmin());
  }, []);

  const handleLogout = () => {
    setCheckAdmin();
    navigate("/login_admin");
  };

  const handleItemClick = (item: string) => {
    setShowMain(item);
    setActiveItem(item);
  };

  return (
    <div className="containers">
      <aside>
        <div className="top">
          <div className="logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesAdmin%2Flogo.png?alt=media&token=018c46b8-3e94-4fbd-a405-f0283e15a92e"
              alt="Logo"
            />
            <h2>
              VN<span className="danger">SN</span>
            </h2>
          </div>
          <div
            className="close"
            id="close-btn"
            onClick={() => toggleSidebar(false)}
          >
            <span className="material-icons-sharp">close</span>
          </div>
        </div>
        <div className="sidebar">
          <a
            onClick={() => handleItemClick("dashboard")}
            href="#"
            className={activeItem === "dashboard" ? "active" : ""}
          >
            <span className="material-icons-sharp">dashboard</span>
            <h3>Dashboard</h3>
          </a>
          <a
            onClick={() => handleItemClick("managerUser")}
            href="#"
            className={activeItem === "managerUser" ? "active" : ""}
          >
            <span className="material-icons-sharp">person_outline</span>
            <h3>Users</h3>
          </a>
          <a
            onClick={() => handleItemClick("managerGroup")}
            href="#"
            className={activeItem === "managerGroup" ? "active" : ""}
          >
            <span className="material-icons-sharp">receipt_long</span>
            <h3>Groups</h3>
          </a>
          <a
            onClick={() => handleItemClick("managerPost")}
            href="#"
            className={activeItem === "managerPost" ? "active" : ""}
          >
            <span className="material-icons-sharp">insights</span>
            <h3>Posts</h3>
          </a>
          <a
            onClick={() => handleItemClick("messages")}
            href="#"
            className={activeItem === "messages" ? "active" : ""}
          >
            <span className="material-icons-sharp">mail_outline</span>
            <h3>Messages</h3>
            <span className="message-count">26</span>
          </a>
          <a
            onClick={() => handleItemClick("products")}
            href="#"
            className={activeItem === "products" ? "active" : ""}
          >
            <span className="material-icons-sharp">inventory</span>
            <h3>Products</h3>
          </a>
          <a
            onClick={() => handleItemClick("reports")}
            href="#"
            className={activeItem === "reports" ? "active" : ""}
          >
            <span className="material-icons-sharp">report_gmailerrorred</span>
            <h3>Reports</h3>
          </a>
          <a
            onClick={() => handleItemClick("settings")}
            href="#"
            className={activeItem === "settings" ? "active" : ""}
          >
            <span className="material-icons-sharp">settings</span>
            <h3>Settings</h3>
          </a>
          <a
            onClick={() => handleItemClick("addProduct")}
            href="#"
            className={activeItem === "addProduct" ? "active" : ""}
          >
            <span className="material-icons-sharp">add</span>
            <h3>Add Product</h3>
          </a>
          <a
            href="#"
            onClick={handleLogout}
            className={activeItem === "logout" ? "active" : ""}
          >
            <span className="material-icons-sharp">logout</span>
            <h3>Logout</h3>
          </a>
        </div>
      </aside>
      {showMain === "dashboard" ? <Nav_Main></Nav_Main> : ""}
      {showMain === "managerUser" ? <Manager_User></Manager_User> : ""}
      {showMain === "managerGroup" ? <Manager_Group></Manager_Group> : ""}
      {showMain === "managerPost" ? <ManagerPost></ManagerPost> : ""}
      <Nav_Right></Nav_Right>
    </div>
  );
};

export default Dashboard;
