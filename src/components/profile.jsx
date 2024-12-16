import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom"; // Import Navigate instead of Redirect

const Profile = () => {
  const [user, setUser] = useState(null);
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Check if user is authenticated

  // Retrieve the auth token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);

    // If there's a token, the user is authenticated
    if (storedToken) {
      setIsAuthenticated(true);
      fetchProfile(storedToken); // Fetch profile only if authenticated
    }
  }, []);

  // Fetch user profile data when the token is available
  const fetchProfile = async (authToken) => {
    try {
      const response = await axios.get("http://localhost:5001/api/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:5001/api/profile",
        {
          dietaryRestrictions: dietaryRestrictions.split(", "),
          allergies: allergies.split(", "),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      setDietaryRestrictions("");
      setAllergies("");
      // Refresh user data after successful update
      setUser((prevUser) => ({
        ...prevUser,
        dietaryRestrictions: dietaryRestrictions.split(", "),
        allergies: allergies.split(", "),
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // If not authenticated, redirect to login page using Navigate
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p>
            <strong>Username:</strong> {user.username || "No username"}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "No email"}
          </p>
          <p>
            <strong>Dietary Restrictions:</strong>{" "}
            {user.dietaryRestrictions && user.dietaryRestrictions.length > 0
              ? user.dietaryRestrictions.join(", ")
              : "No details"}
          </p>
          <p>
            <strong>Allergies:</strong>{" "}
            {user.allergies && user.allergies.length > 0
              ? user.allergies.join(", ")
              : "No details"}
          </p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <h3>Update Profile</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dietary Restrictions: </label>
          <input
            type="text"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            placeholder="Enter dietary restrictions, separated by commas"
          />
        </div>
        <div>
          <label>Allergies: </label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Enter allergies, separated by commas"
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
