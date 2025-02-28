import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.log(error);
        console.log("Error fetching user");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl">Dashboard</h2>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
