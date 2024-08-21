import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
export const AminContacts = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();
  
  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,

        }
      });
      const data = await response.json();
      setUsers(data);
      console.log("Response: ", data);
    } catch (error) {
      toast.error(error);
    }
  };
 
  useEffect(() => {
    getAllUsersData();
  }, []);
  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Users Contacts</h1>
        </div>

        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.message}</td>
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
