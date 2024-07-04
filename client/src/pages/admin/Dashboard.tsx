import React, { useEffect } from "react";
import "../../assets/dashboard.css";

// Define types for the data
type OrderData = {
  productName: string;
  productNumber: string;
  payment: string;
  status: string;
  statusColor: string;
};

type SalesAnalyticsData = {
  itemClass: string;
  icon: string;
  title: string;
  colorClass: string;
  percentage: string;
  sales: string;
};

type UpdateData = {
  imgSrc: string;
  profileName: string;
  message: string;
  updatedTime: string;
};

// Sample data
const RECENT_ORDER_DATA: OrderData[] = [
  {
    productName: "Foldable Mini Drone",
    productNumber: "85631",
    payment: "Due",
    status: "Pending",
    statusColor: "warning",
  },
  {
    productName: "LARVENDER KF102 Drone",
    productNumber: "36378",
    payment: "Refunded",
    status: "Declined",
    statusColor: "danger",
  },
  {
    productName: "Ruko F11 Pro Drone",
    productNumber: "49347",
    payment: "Due",
    status: "Pending",
    statusColor: "warning",
  },
  {
    productName: "Drone with Camera Drone",
    productNumber: "96996",
    payment: "Paid",
    status: "Delivered",
    statusColor: "primary",
  },
  {
    productName: "GPS 4k Drone",
    productNumber: "22821",
    payment: "Paid",
    status: "Delivered",
    statusColor: "primary",
  },
  {
    productName: "DJI Air 2S",
    productNumber: "81475",
    payment: "Due",
    status: "Pending",
    statusColor: "warning",
  },
  {
    productName: "Lozenge Drone",
    productNumber: "00482",
    payment: "Paid",
    status: "Delivered",
    statusColor: "primary",
  },
];

const SALES_ANALYTICS_DATA: SalesAnalyticsData[] = [
  {
    itemClass: "online",
    icon: "shopping_cart",
    title: "ONLINE ORDERS",
    colorClass: "success",
    percentage: "+39",
    sales: "3849",
  },
  {
    itemClass: "offline",
    icon: "local_mall",
    title: "OFFLINE ORDERS",
    colorClass: "danger",
    percentage: "-17",
    sales: "1100",
  },
  {
    itemClass: "customers",
    icon: "person",
    title: "NEW CUSTOMERS",
    colorClass: "danger",
    percentage: "+25",
    sales: "849",
  },
];

const UPDATE_DATA: UpdateData[] = [
  {
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesAdmin%2Fprofile-2.jpg?alt=media&token=187045ee-5861-4a71-901d-b39b939284f7",
    profileName: "Mike Tyson",
    message: "received his order of Night lion tech GPS drone.",
    updatedTime: "2 Minutes Ago",
  },
  {
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesAdmin%2Fprofile-3.jpg?alt=media&token=b0af6181-9da8-4f6a-8a8d-f57d2c030eea",
    profileName: "Diana Ayi",
    message: "declined her order of 2 DJI Air 2S.",
    updatedTime: "5 Minutes Ago",
  },
  {
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesAdmin%2Fprofile-4.jpg?alt=media&token=6e415777-8db0-4503-ae56-a071397cd63a",
    profileName: "Mandy Roy",
    message: "received his order of LARVENDER KF102 Drone.",
    updatedTime: "6 Minutes Ago",
  },
];

const Dashboard: React.FC = () => {
  useEffect(() => {
    // Recent Orders Data
    const recentOrdersTable = document.getElementById("recent-orders--table");
    if (recentOrdersTable) {
      recentOrdersTable.appendChild(buildTableBody());
    }

    // Updates Data
    const recentUpdates = document
      .getElementsByClassName("recent-updates")
      .item(0);
    if (recentUpdates) {
      recentUpdates.appendChild(buildUpdatesList());
    }

    // Sales Analytics
    const salesAnalytics = document.getElementById("analytics");
    if (salesAnalytics) {
      buildSalesAnalytics(salesAnalytics);
    }
  }, []);

  // Document Builder
  const buildTableBody = (): HTMLElement => {
    const tbody = document.createElement("tbody");

    let bodyContent = "";
    for (const row of RECENT_ORDER_DATA) {
      bodyContent += `
        <tr>
          <td>${row.productName}</td>
          <td>${row.productNumber}</td>
          <td>${row.payment}</td>
          <td class="${row.statusColor}">${row.status}</td>
          <td class="primary">Details</td>
        </tr>
      `;
    }

    tbody.innerHTML = bodyContent;

    return tbody;
  };

  const buildUpdatesList = (): HTMLElement => {
    const div = document.createElement("div");
    div.classList.add("updates");

    let updateContent = "";
    for (const update of UPDATE_DATA) {
      updateContent += `
        <div class="update">
          <div class="profile-photo">
            <img src="${update.imgSrc}" />
          </div>
          <div class="message">
            <p><b>${update.profileName}</b> ${update.message}</p>
            <small class="text-muted">${update.updatedTime}</small>
          </div>
        </div>
      `;
    }

    div.innerHTML = updateContent;

    return div;
  };

  const buildSalesAnalytics = (element: HTMLElement): void => {
    for (const analytic of SALES_ANALYTICS_DATA) {
      const item = document.createElement("div");
      item.classList.add("item");
      item.classList.add(analytic.itemClass);

      const itemHtml = `
        <div class="icon">
          <span class="material-icons-sharp"> ${analytic.icon} </span>
        </div>
        <div class="right">
          <div class="info">
            <h3>${analytic.title}</h3>
            <small class="text-muted"> Last 24 Hours </small>
          </div>
          <h5 class="${analytic.colorClass}">${analytic.percentage}%</h5>
          <h3>${analytic.sales}</h3>
        </div>
      `;

      item.innerHTML = itemHtml;

      element.appendChild(item);
    }
  };

  // Document operation functions
  const toggleSidebar = (show: boolean): void => {
    const sideMenu = document.querySelector("aside");
    if (sideMenu) {
      sideMenu.style.display = show ? "block" : "none";
    }
  };

  const toggleTheme = (): void => {
    document.body.classList.toggle("dark-theme-variables");

    const themeToggler = document.querySelector(".theme-toggler");
    if (themeToggler) {
      themeToggler
        .querySelector("span:nth-child(1)")
        ?.classList.toggle("active");
      themeToggler
        .querySelector("span:nth-child(2)")
        ?.classList.toggle("active");
    }
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
              EGA<span className="danger">TOR</span>
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
          <a href="#" className="active">
            <span className="material-icons-sharp">dashboard</span>
            <h3>Dashboard</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">person_outline</span>
            <h3>Customers</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">receipt_long</span>
            <h3>Orders</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">insights</span>
            <h3>Analytics</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">mail_outline</span>
            <h3>Messages</h3>
            <span className="message-count">26</span>
          </a>
          <a href="#">
            <span className="material-icons-sharp">inventory</span>
            <h3>Products</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">report_gmailerrorred</span>
            <h3>Reports</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">settings</span>
            <h3>Settings</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">add</span>
            <h3>Add Product</h3>
          </a>
          <a href="#">
            <span className="material-icons-sharp">logout</span>
            <h3>Logout</h3>
          </a>
        </div>
      </aside>
      <main>
        <h1>Dashboard</h1>
        <div className="insights">
          {/* SALES */}
          <div className="sales">
            <span className="material-icons-sharp">analytics</span>
            <div className="middle">
              <div className="left">
                <h3>Total Sales</h3>
                <h1>$25,024</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx={38} cy={38} r={36} />
                </svg>
                <div className="number">
                  <p>81%</p>
                </div>
              </div>
            </div>
            <small className="text-muted">Last 24 hours</small>
          </div>
          {/* EXPENSES */}
          <div className="expenses">
            <span className="material-icons-sharp">bar_chart</span>
            <div className="middle">
              <div className="left">
                <h3>Total Expenses</h3>
                <h1>$14,160</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx={38} cy={38} r={36} />
                </svg>
                <div className="number">
                  <p>62%</p>
                </div>
              </div>
            </div>
            <small className="text-muted">Last 24 hours</small>
          </div>
          {/* INCOME */}
          <div className="income">
            <span className="material-icons-sharp">stacked_line_chart</span>
            <div className="middle">
              <div className="left">
                <h3>Total Income</h3>
                <h1>$10,864</h1>
              </div>
              <div className="progress">
                <svg>
                  <circle cx={38} cy={38} r={36} />
                </svg>
                <div className="number">
                  <p>44%</p>
                </div>
              </div>
            </div>
            <small className="text-muted">Last 24 hours</small>
          </div>
        </div>
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <table id="recent-orders--table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Number</th>
                <th>Payment</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            {/* Add tbody here | JS insertion */}
          </table>
          <a href="#">Show All</a>
        </div>
      </main>
      <div className="right">
        <div className="top">
          <button id="menu-btn" onClick={() => toggleSidebar(true)}>
            <span className="material-icons-sharp">menu</span>
          </button>
          <div className="theme-toggler" onClick={toggleTheme}>
            <span className="material-icons-sharp active">light_mode</span>
            <span className="material-icons-sharp">dark_mode</span>
          </div>
          <div className="profile">
            <div className="info">
              <p>
                Hey, <b>Bruno</b>
              </p>
              <small className="text-muted">Admin</small>
            </div>
            <div className="profile-photo">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/project-f6c67.appspot.com/o/imagesAdmin%2Fprofile-1.jpg?alt=media&token=b5dc9d59-ec60-4a81-9f64-af16a2e7b4cf"
                alt="Profile Picture"
              />
            </div>
          </div>
        </div>
        <div className="recent-updates">
          <h2>Recent Updates</h2>
          {/* Add updates div here | JS insertion */}
        </div>
        <div className="sales-analytics">
          <h2>Sales Analytics</h2>
          <div id="analytics">{/* Add items div here | JS insertion */}</div>
          <div className="item add-product">
            <div>
              <span className="material-icons-sharp">add</span>
              <h3>Add Product</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
