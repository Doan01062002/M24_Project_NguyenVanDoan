import React, { useEffect, useState } from "react";
import { Post } from "../../interfaces/page";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, renderPost } from "../../services/posts.service";

export default function ManagerPost() {
  const [valueSearch, setValueSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(1); // số lượng nhóm trên mỗi trang

  // get Post
  const posts = useSelector((state: any) => state.post.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(renderPost());
  }, [dispatch]);

  const changeStatusPost = (id: number, status: boolean) => {
    dispatch(changeStatus({ id, status: status }));
  };

  // search Input
  const searchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
    setCurrentPage(1); // reset về trang đầu tiên khi tìm kiếm
  };

  // Filter groups based on search input
  const filteredPost = posts.filter((post: Post) =>
    post.content.toLowerCase().includes(valueSearch.toLowerCase())
  );

  // Logic for displaying groups
  const indexOfLastGroup = currentPage * postsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - postsPerPage;
  const currentGroups = filteredPost.slice(indexOfFirstGroup, indexOfLastGroup);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPost.length / postsPerPage); i++) {
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
              <th>IMAGE</th>
              <th>CONTENT</th>
              <th>TYPE POST</th>
              <th>CREATE AT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {currentGroups.map((item: Post, index: number) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  <img
                    style={{
                      borderRadius: "0px",
                      width: "50px",
                      height: "50px",
                    }}
                    src={item.image[0]}
                    alt={""}
                  />
                </td>
                <td>{item.content}</td>
                <td>{item.action}</td>
                <td>{item.created_at}</td>
                <td>
                  {item.status === true ? (
                    <button
                      onClick={() => changeStatusPost(item.id, false)}
                      className="btn red"
                    >
                      Hide
                    </button>
                  ) : (
                    <button
                      onClick={() => changeStatusPost(item.id, true)}
                      className="btn blue"
                    >
                      Show
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
