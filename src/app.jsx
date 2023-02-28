import { useEffect, useState } from "react";
import { BlogDetails } from "./components/blog-details";
import { LoginForm } from "./components/login-form";
import { LogoutForm } from "./components/logout-form";
import { getBlogs } from "./services/blog";
import { login } from "./services/login";
import { getUser, removeUser, saveUser } from "./utils/auth";

export function App() {
  const [user, setUser] = useState(() => getUser());
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  useEffect(() => {
    if (user) {
      saveUser(user);
    } else {
      removeUser(user);
    }
  }, [user]);

  const loginUser = async (credentials) => {
    const user = await login(credentials);
    setUser(user);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <div className="app">
      {user ? (
        <>
          <h1>Blogs</h1>
          <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
            <div>Signed in as {user.name ?? user.username}.</div>
            <LogoutForm onSubmit={logoutUser} />
          </div>
          {blogs.map((blog) => (
            <BlogDetails key={blog.id} blog={blog} />
          ))}
        </>
      ) : (
        <LoginForm onSubmit={loginUser} />
      )}
    </div>
  );
}
