import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import PostCrop from "./components/PostCrop";
import Farmers from "./components/Farmers";
import Buyers from "./components/Buyers";
import AllCrops from "./components/AllCrops";
import Home from "./components/Home.jsx";
import EditCrop from "./components/EditCrop.jsx";
import DeleteCrop from "./components/DeleteCrop.jsx";
import BuyCrop from "./components/BuyCrop.jsx";
import UserProfile from "./components/UserProfile.jsx";
import { API_URL } from "./config";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
            loader: async () => {
              const token = localStorage.getItem("token");
              if (!token) throw new Error("No token found");
              const res = await axios.get(`${API_URL}/crops/my-crops`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data;
            },
          },
          {
            path: "postCrop",
            element: <PostCrop />,
          },
          {
            path: ":cropId/edit",
            element: <EditCrop />,
            loader: async ({ params }) => {
              const token = localStorage.getItem("token");
              const res = await axios.get(`${API_URL}/crops/${params.cropId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data;
            },
          },
          {
            path: ":cropId/delete",
            element: <DeleteCrop />,
            loader: async ({ params }) => {
              const token = localStorage.getItem("token");
              const res = await axios.get(`${API_URL}/crops/${params.cropId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data;
            },
          },
          {
            path: ":cropId/buy",
            element: <BuyCrop />,
            loader: async ({ params }) => {
              const token = localStorage.getItem("token");
              const res = await axios.get(`${API_URL}/crops/${params.cropId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data;
            },
          },
          {
            path: "farmers",
            element: <Farmers />,
            loader: async () => {
              const token = localStorage.getItem("token");
              if (!token) throw new Error("No token found");
              const res = await axios.get(`${API_URL}/users/farmers`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data;
            },
          },
          {
            path: "buyers",
            element: <Buyers />,
            loader: async () => {
              const token = localStorage.getItem("token");
              if (!token) throw new Error("No token found");
              const res = await axios.get(`${API_URL}/users/buyers`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data;
            },
          },
          {
            path: "all-crops",
            element: <AllCrops />,
            loader: async () => {
              const token = localStorage.getItem("token");
              if (!token) throw new Error("No token found");
              const res = await axios.get(`${API_URL}/crops`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              return res.data;
            },
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:profileId/about",
    element: <UserProfile />,
    loader: async ({ params }) => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/users/${params.profileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

const Loader = () => (
  <div className="loader-container">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

const loaderStyles = `
  .loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: rgba(245, 245, 245, 0.9);
  }
  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #4caf50;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .loader-container p {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #333;
    font-family: 'Arial', sans-serif;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = loaderStyles;
document.head.appendChild(styleSheet);
