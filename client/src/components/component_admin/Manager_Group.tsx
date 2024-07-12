import React, { useEffect, useState } from "react";
import "../../assets/asests_Admin/ManagerUser.css";
import { useDispatch, useSelector } from "react-redux";
import { Group } from "../../interfaces/page";
import { changeStatus, renderGroup } from "../../services/group.service";

export default function Manager_Group() {
  const [valueSearch, setValueSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [groupsPerPage] = useState<number>(1); // số lượng nhóm trên mỗi trang

  // get groups
  const groups: Group[] = useSelector((state: any) => state.group.groups);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderGroup());
  }, [dispatch]);

  const changeStatusGroup = (id: number, status: boolean) => {
    dispatch(changeStatus({ id, status: status }));
  };

  // search Input
  const searchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
    setCurrentPage(1); // reset về trang đầu tiên khi tìm kiếm
  };

  // Filter groups based on search input
  const filteredGroup = groups.filter((group) =>
    group.groupName.toLowerCase().includes(valueSearch.toLowerCase())
  );

  // Logic for displaying groups
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = filteredGroup.slice(
    indexOfFirstGroup,
    indexOfLastGroup
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredGroup.length / groupsPerPage); i++) {
    pageNumbers.push(i);
  }

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
              <th>MEMBERS</th>
              <th>CREATE AT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {currentGroups.map((item: Group, index: number) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  <img src={item.banner} alt={item.groupName} />
                </td>
                <td>{item.groupName}</td>
                <td>{item.members.length}</td>
                <td>{item.created_at}</td>
                <td>
                  {item.status === true ? (
                    <button
                      onClick={() => changeStatusGroup(item.id, false)}
                      className="btn red"
                    >
                      Lock
                    </button>
                  ) : (
                    <button
                      onClick={() => changeStatusGroup(item.id, true)}
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
    </>
  );
}
