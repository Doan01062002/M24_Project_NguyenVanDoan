import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderUser } from "../../services/account.service";
import { renderPost } from "../../services/posts.service";
import { renderGroup } from "../../services/group.service";

export default function Nav_Main() {
  /**
   * Get Data
   */
  const users = useSelector((state: any) => {
    return state.users.accountUser;
  });
  const posts = useSelector((state: any) => state.post.post);
  const groups = useSelector((state: any) => state.group.groups);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderUser());
    dispatch(renderPost());
    dispatch(renderGroup());
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="insights">
        <div className="sales">
          <span className="material-icons-sharp">analytics</span>
          <div className="middle">
            <div className="left">
              <h3>Number Users</h3>
              <h1>{users.length}</h1>
            </div>
          </div>
          <small className="text-muted">Last 1 hours</small>
        </div>
        <div className="expenses">
          <span className="material-icons-sharp">bar_chart</span>
          <div className="middle">
            <div className="left">
              <h3>Number Posts</h3>
              <h1>{posts.length}</h1>
            </div>
          </div>
          <small className="text-muted">Last 1 hours</small>
        </div>
        <div className="income">
          <span className="material-icons-sharp">stacked_line_chart</span>
          <div className="middle">
            <div className="left">
              <h3>Number Groups</h3>
              <h1>{groups.length}</h1>
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
          <tbody>
            <tr>
              <td>Foldable Mini Drone</td>
              <td>85631</td>
              <td>Due</td>
              <td className="warning">Pending</td>
              <td className="primary">Details</td>
            </tr>
            <tr>
              <td>LARVENDER KF102 Drone</td>
              <td>36378</td>
              <td>Refunded</td>
              <td className="danger">Declined</td>
              <td className="primary">Details</td>
            </tr>
            <tr>
              <td>Ruko F11 Pro Drone</td>
              <td>49347</td>
              <td>Due</td>
              <td className="warning">Pending</td>
              <td className="primary">Details</td>
            </tr>
            <tr>
              <td>Drone with Camera Drone</td>
              <td>96996</td>
              <td>Paid</td>
              <td className="primary">Delivered</td>
              <td className="primary">Details</td>
            </tr>
            <tr>
              <td>GPS 4k Drone</td>
              <td>22821</td>
              <td>Paid</td>
              <td className="primary">Delivered</td>
              <td className="primary">Details</td>
            </tr>
            <tr>
              <td>DJI Air 2S</td>
              <td>81475</td>
              <td>Due</td>
              <td className="warning">Pending</td>
              <td className="primary">Details</td>
            </tr>
            <tr>
              <td>Lozenge Drone</td>
              <td>00482</td>
              <td>Paid</td>
              <td className="primary">Delivered</td>
              <td className="primary">Details</td>
            </tr>
          </tbody>
        </table>
        <a href="#">Show All</a>
      </div>
    </main>
  );
}
