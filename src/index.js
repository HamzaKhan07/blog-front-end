import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Post from './pages/post/Post';
import PostPage from './pages/post_page/PostPage';
import EditPost  from "./pages/editPost/EditPost";

import './App.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home/>
    ),
  },
  {
    path: "/login",
    element: (
      <Login/>
    ),
  },
  {
    path: "/register",
    element: (
      <Register/>
    ),
  },
  {
    path: "/create",
    element: (
      <Post/>
    ),
  },
  {
    path: "/post/:id",
    element: (
      <PostPage/>
    ),
  },
  {
    path: "/editPost/:id",
    element: (
      <EditPost/>
    ),
  }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);