import { useEffect, useState } from "react";
import { BlogDetails } from "./components/blog-details";
import { LoginForm } from "./components/login-form";
import { LogoutForm } from "./components/logout-form";
import { NewBlogForm } from "./components/new-blog-form";
import { createBlog, getBlogs } from "./services/blog";
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
    try {
      const user = await login(credentials);
      setUser(user);
    } catch {
      alert("invalid username or password");
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  const addBlog = async (data) => {
    try {
      const blog = await createBlog(data);
      setBlogs((blogs) => blogs.concat(blog));
      alert("Blog saved.");
    } catch (error) {
      alert("Failed to add a new blog, try again!");
    }
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
          <NewBlogForm onSubmit={addBlog} />
          <div style={{ marginTop: 16 }}>
            {blogs.map((blog) => (
              <BlogDetails key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      ) : (
        <LoginForm onSubmit={loginUser} />
      )}
    </div>
  );
}
