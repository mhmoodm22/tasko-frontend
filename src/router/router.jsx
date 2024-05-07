import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";
import ResetPass from "../pages/Authentication/ResetPass";
import Error from "../pages/Error/Error";
import SingleTask from "../pages/SingleTask/SingleTask";
import CollaborativeTask from "../pages/CollaborativeTask/CollaborativeTask";
import AddFriends from "../pages/AddFriends.jsx/AddFriends";
import FriendsRequests from "../pages/FriendsRequests/FriendsRequests";
import Profile from "../pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import AddTask from "../pages/AddTask/AddTask";
import Settings from "../pages/Settings/Settings";
import Notifications from "../pages/Notifications/Notifications";
import Spin from "../pages/Spin/Spin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/task/:id",
        element: (
          <PrivateRoute>
            <SingleTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/collaborative-task",
        element: (
          <PrivateRoute>
            <CollaborativeTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-friends",
        element: (
          <PrivateRoute>
            <AddFriends />
          </PrivateRoute>
        ),
      },
      {
        path: "/friends-requests",
        element: (
          <PrivateRoute>
            <FriendsRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-task",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
      {
        path: "/notifications",
        element: (
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        ),
      },
      {
        path: "/spin",
        element: (
          <PrivateRoute>
            <Spin />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/reset-password",
    element: <ResetPass />,
  },
]);

export default router;
