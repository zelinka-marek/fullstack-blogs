import { useEffect, useState } from "react";
import { BlogDetails } from "./components/blog-details";
import { LoginForm } from "./components/login-form";
import { getBlogs } from "./services/blog";
import { login } from "./services/login";

export function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  const loginUser = async (credentials) => {
    const user = await login(credentials);
    setUser(user);
  };

  return (
    <div className="app">
      {user ? (
        <>
          <h1>Blogs</h1>
          <div style={{ marginBottom: 16 }}>
            <div>Signed in as {user.name ?? user.username}.</div>
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
