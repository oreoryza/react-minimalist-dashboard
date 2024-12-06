import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUsers } from "../redux/async/restSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { users, totalUsers } = useSelector((state) => state.rest);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 7;

  useEffect(() => {
    dispatch(getUsers({ page: currentPage, limit: usersPerPage }));
  }, [dispatch, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      return;
    } else {
      dispatch(getUsers({ search: searchTerm, page: 1, limit: usersPerPage }));
      setCurrentPage(1);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearchTerm("");
    dispatch(getUsers({ page: 1, limit: usersPerPage }));
    setCurrentPage(1);
  };

  // Hitung jumlah halaman
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div>
        <div className="w-48 h-48 rounded-full overflow-hidden">
          <img src={profile.photo} alt="" className="h-full w-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold">{profile.name}</h2>
        <p className="text-black">{profile.email}</p>
      <div className="flex justify-end items-center w-full my-6">
        <form
          onSubmit={handleSearch}
          className="w-2/5 p-2 border-2 border-black/[.3] rounded flex"
        >
          <input
            className="w-full focus:outline-0"
            type="text"
            placeholder="Search by name, username, or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <i className="bi bi-search text-black/[.3]"></i>
          </button>
        </form>
        <button
          className="text-black/[.3] border-2 border-black/[.3] p-2 rounded"
          onClick={handleReset}
        >
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-black">
            <th>Username</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-y border-black hover:bg-black/[.1]"
            >
              <td className="py-4">{user.name}</td>
              <td className="text-center">{user.title}</td>
              <td className="text-center">
                <button className="me-2 text-red">Delete</button>
                <button className="text-dark-yellow">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between my-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-black text-white py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-black text-white py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Profile;
