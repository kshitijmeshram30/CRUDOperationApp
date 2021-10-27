import React, { useState, useEffect } from "react"; //useState: If we have data and we have to update with new data then that time we used useState
//useState: it is used to perform re render function
//useEffect: used for perform side effect in functional component 
//if we are working with any API for getting data from that api we can use UseEffect
import axios from "axios"; //Used for getting data and posting data from the json file as a API 
// Easy to send asynchorpmous http request to perform CRUD operation
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []); //This is empty Array, it will perfrom only first time when you reload the page

  const loadUsers = async () => { //async(): Always return a promise, did not get data only returns promise
    const result = await axios.get("http://localhost:3002/users"); //until getting promise we have to wait and store all the data in result
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3002/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => ( //The map() function lets you manipulate the items in an array
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Link className="btn btn-primary mr-2" to={`/users/${user.id}`}>
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;