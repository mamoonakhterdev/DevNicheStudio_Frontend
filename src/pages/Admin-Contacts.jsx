import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
export const AdminContacts = () => {
  const [users, setUsers] = useState([]);
  const [contact, setContact] = useState(0);
  const { authorizationToken, API } = useAuth();
  
  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,

        }
      });
      const data = await response.json();
      if(response.ok){
        setUsers(data);
        if(data.length !== 0){
          setContact(data.length);
        }else{
          setContact(0);
        }
      }
      else{
        toast.error("Failed to fetch contacts!");
      }
    } catch (error) {
      toast.error(error);
    }
  };
 const deleteContactById = async (id)=> {
  try {
    const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: authorizationToken,
      }
    })
    if(response.ok){
      getAllUsersData();
      toast.success("Contact deleted successfully!");
    } else {
      toast.error("Failed to delete contact");
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
      <section className="admin-users-section setHeight">
        <div className="container">
          <h1>Users Contacts</h1>
        </div>

        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th colSpan="2">Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {contact === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No Message Found!
                  </td>
                </tr>
              ) : (
                users.map((curUser, index) => (
                  <tr key={index}>
                    <td>{curUser.username}</td>
                    <td>{curUser.email}</td>
                    <td colSpan="2">{curUser.message}</td>
                    <td><button className="btn btn-danger" onClick={()=> deleteContactById(curUser._id)}>Delete</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
