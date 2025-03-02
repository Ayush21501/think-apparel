"use client";
import React, { useEffect, useState } from "react";
import { assets, productsDummyData } from "../../../assets/assets";
import Image from "next/image";
import { useAppContext } from "../../../context/AppContext";
import Footer from "../../../components/seller/Footer";
import Loading from "../../../components/Loading";
import { fetchUsers } from "../../../services/user";

const UsersList = () => {
  const { router } = useAppContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]  = useState();

  useEffect(() => {
    const getUsers = async () => {
      try{
        const data = await fetchUsers(currentPage);
        setLoading(false);
        setUsers(data.data.users);
        setTotalPages(data.data.totalPages);
        console.log(totalPages, data.data.totalPages)
      }
      catch(error){
        console.error("somthing went wrong!",error);
        setLoading(false);
      }
    }
    getUsers();
  }, [currentPage] );


  const onNextPageClick = () => {
    setCurrentPage( (prev) => prev + 1 > totalPages ? totalPages : prev + 1);
  }

  const onPreviousPageClick = () => {
    setCurrentPage((prev) =>  prev - 1 <  1 ? 1 : prev - 1);
  }

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium">All Users</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className=" table-fixed w-full overflow-hidden">
              <thead className="text-gray-900 text-sm text-left">
                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">
                    Email
                  </th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    First name
                  </th>
                  <th className="px-4 py-3 font-medium truncate">Price</th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                    Last name
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-500">
                {users.map((user, index) => (
                  <tr key={index} className="border-t border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="bg-gray-500/10 rounded p-2 rounded-full ">
                        <Image
                          src={user.profileUrl}
                          alt="product Image"
                          className="w-16 rounded-full "
                          width={700}
                          height={700}
                        />
                      </div>
                      <span className="truncate w-full">{user.email}</span>
                    </td>
                    <td className="px-4 py-3 max-sm:hidden">
                      {user.firstName}
                    </td>
                    <td className="px-4 py-3">{user.lastName}</td>
                    <td className="px-4 py-3 max-sm:hidden">
                      <button
                        onClick={() => router.push(`/product/${user.userId}`)}
                        className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white rounded-md"
                      >
                        <span className="hidden md:block">Report</span>
                        <Image
                          className="h-3.5"
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           {/* Pagination Controls */}
           <div className="flex justify-center items-center space-x-2 py-4">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
                onClick={onPreviousPageClick}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
                onClick={onNextPageClick}
                disabled={currentPage >= totalPages}
              > 
                Next
              </button>
            </div>
          
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UsersList;
