import React, { useState, useEffect } from "react";
import './App.css';
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Users not fetched");
        }
        const data = await response.json();
        setUsers(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log("users");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="users-header">Users</h1>
      <div>
        {users.map((user) => (
          <div>
            <h3 key={user.id}>{user.name}</h3>
            <Link to={`/user/${user.id}`}><button className="userLink">User Details</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
