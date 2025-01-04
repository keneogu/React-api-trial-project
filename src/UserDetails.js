import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!response.ok) {
          throw new Error("Users not fetched");
        }
        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <p>Loading user details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="users-header">User Details</h1>
      <div>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Username:</strong> {user?.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Website:</strong> {user.website}
        </p>
      </div>
      <div>
        <h3>Address</h3>
        <p>
          <strong>Street:</strong> {user.address.street}
        </p>
        <p>
          <strong>Suite:</strong> {user.address.suite}
        </p>
        <p>
          <strong>City:</strong> {user.address.city}
        </p>
        <p>
          <strong>Zip Code:</strong> {user.address.zipcode}
        </p>
      </div>
      <div>
        <h3>Company</h3>
        <p>
          <strong>Company Name:</strong> {user.company.name}
        </p>
      </div>
      <Link to="/" className="user-details-link">Back to Home</Link>
    </div>
  );
};

export default UserDetails;
