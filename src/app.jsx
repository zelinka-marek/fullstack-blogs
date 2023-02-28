import { useEffect, useState } from "react";
import { BlogDetails } from "./components/blog-details";
import { getBlogs } from "./services/blog";

export function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  return (
    <div className="app">
      <h1>Blogs</h1>
      {blogs.map((blog) => (
        <BlogDetails key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
