import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();
  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
      console.log("Response: ", data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        });
  
        const data = response.json();
        toast.success(data);
 
        if(response.ok){
          getAllUsersData();
        }
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    getAllUsersData();
  }, []);
  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>

        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td><Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
                    <td>
                      <button className="danger" onClick={()=> deleteUser(curUser._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
