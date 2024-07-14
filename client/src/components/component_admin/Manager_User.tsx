import React, { useEffect, useState } from "react";
import "../../assets/asests_Admin/ManagerUser.css";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, renderUser } from "../../services/account.service";
import { User } from "../../interfaces/page";

export default function Manager_User() {
  const [valueSearch, setValueSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(5); // số lượng người dùng trên mỗi trang
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // get user
  const users: User[] = useSelector((state: any) => {
    return state.users.accountUser;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderUser());
  }, [dispatch]);

  const changeStatusUser = (id: number, status: boolean) => {
    dispatch(changeStatus({ id, status: status }));
  };

  // search Input
  const searchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
    setCurrentPage(1); // reset về trang đầu tiên khi tìm kiếm
  };

  // Hàm sắp xếp
  const sortUsers = (users: User[], order: "asc" | "desc") => {
    return users.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return order === "asc" ? -1 : 1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  // Filter and sort users based on search input and sort order
  const filteredUsers = sortUsers(
    users.filter((user) =>
      user.name.toLowerCase().includes(valueSearch.toLowerCase())
    ),
    sortOrder
  );

  // Logic for displaying users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  // Handle sort order change
  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  //
  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <>
      <div className="table-container-user-admin">
        <div className="search-bar">
          <input onChange={searchInput} type="text" placeholder="Search..." />
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>AVATAR</th>
              <th onClick={handleSortOrderChange}>
                NAME {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th>EMAIL</th>
              <th>CREATE AT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((item: User, index: number) => (
              <tr key={index} onClick={() => handleUserClick(item)}>
                <td>{item.id}</td>
                <td>
                  <img src={item.avatar} alt={item.name} />
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.created_at}</td>
                <td>
                  {item.status === true ? (
                    <button
                      onClick={() => changeStatusUser(item.id, false)}
                      className="btn red"
                    >
                      Lock
                    </button>
                  ) : (
                    <button
                      onClick={() => changeStatusUser(item.id, true)}
                      className="btn blue"
                    >
                      Unlock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              onClick={() => paginate(number)}
              className="page-item"
            >
              <a className="page-link" href="#">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div className="user-detail-overlay">
          <div className="user-detail">
            <h2>User Details</h2>
            <p>ID: {selectedUser.id}</p>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>City: {selectedUser.city}</p>
            <p>Work: {selectedUser.work}</p>
            <p>Study: {selectedUser.study}</p>
            <p>Hometown: {selectedUser.hometown}</p>
            <p>Relationship: {selectedUser.relationship}</p>
            <p>Created At: {selectedUser.created_at}</p>
            <p>Status: {selectedUser.status ? "Active" : "Locked"}</p>
            <button onClick={() => setSelectedUser(null)} className="btn close">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
