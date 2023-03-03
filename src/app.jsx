import { useEffect, useRef, useState } from "react";
import { BlogDetails } from "./components/blog-details";
import { LoginForm } from "./components/login-form";
import { LogoutForm } from "./components/logout-form";
import { NewBlogForm } from "./components/new-blog-form";
import { Notification } from "./components/notification";
import { Togglable } from "./components/togglable";
import {
  createBlog,
  deleteBlogById,
  getBlogs,
  updateBlogById,
} from "./services/blog";
import { login } from "./services/login";
import { getUser, removeUser, saveUser } from "./utils/auth";

export function App() {
  const [notification, setNotification] = useState(null);

  const [user, setUser] = useState(() => getUser());

  const [blogs, setBlogs] = useState([]);
  const sortedBlogs = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);

  const blogFormRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (user) {
      saveUser(user);
    } else {
      removeUser(user);
    }
  }, [user]);

  const fetchBlogs = async () => {
    const blogs = await getBlogs();
    setBlogs(blogs);
  };

  const notify = ({ status = "success", message }) => {
    setNotification({ status, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const loginUser = async (credentials) => {
    try {
      const user = await login(credentials);
      setUser(user);
    } catch {
      notify({ status: "error", message: "wrong username or password" });
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  const addBlog = async (data) => {
    try {
      await createBlog(data);
      await fetchBlogs();
      notify({
        message: `a new blog "${data.title}" by "${data.author}" was added`,
      });
      blogFormRef.current.toggleVisiblity();
    } catch (error) {
      notify({
        status: "error",
        message: "Failed to add a new blog, try again!",
      });
    }
  };

  const likeBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const data = { ...blog, likes: blog.likes + 1 };
    await updateBlogById(id, data);
    await fetchBlogs();
  };

  const deleteBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    if (!window.confirm(`Remove blog "${blog.title}" by "${blog.author}"`)) {
      return;
    }

    await deleteBlogById(id);
    await fetchBlogs();
  };

  return (
    <div className="app">
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
        />
      )}
      {user ? (
        <>
          <h1>Blogs</h1>
          <div
            style={{
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <p>Signed in as {user.name || user.username}.</p>
            <LogoutForm onSubmit={logoutUser} />
          </div>
          <Togglable ref={blogFormRef} openButtonLabel="New note">
            <NewBlogForm onSubmit={addBlog} />
          </Togglable>
          <div style={{ marginTop: 16 }}>
            {sortedBlogs.map((blog) => (
              <BlogDetails
                key={blog.id}
                blog={blog}
                isOwner={blog.user.username === user.username}
                onLike={likeBlog}
                onDelete={deleteBlog}
              />
            ))}
          </div>
        </>
      ) : (
        <LoginForm onSubmit={loginUser} />
      )}
    </div>
  );
}
