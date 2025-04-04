import { useLoaderData } from "react-router-dom";

const UserProfile = () => {
  const user = useLoaderData();

  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      <p>
        <strong>ID:</strong> {user._id}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone || "Not set"}
      </p>
      <p>
        <strong>Address:</strong> {user.address || "Not set"}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
};

export default UserProfile;
