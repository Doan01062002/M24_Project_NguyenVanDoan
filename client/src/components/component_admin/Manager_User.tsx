import React, { useEffect, useState } from "react";
import "../../assets/asests_Admin/ManagerUser.css";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, renderUser } from "../../services/account.service";
import { User } from "../../interfaces/page";

export default function Manager_User() {
  const [valueSearch, setValueSearch] = useState<string>("");

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
  };

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(valueSearch.toLowerCase())
  );

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
              <th>NAME</th>
              <th>EMAIL</th>
              <th>CREATE AT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((item: User, index: number) => (
              <tr key={index}>
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
      </div>
    </>
  );
}
