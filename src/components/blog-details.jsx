import { useState } from "react";

const blogStyle = {
  padding: "8px 12px",
  border: "1px solid",
  marginBottom: "5px",
  borderRadius: "6px",
};

export function BlogDetails(props) {
  const { blog } = props;

  const [expanded, setExpanded] = useState(false);

  return (
    <div style={blogStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span>
          {blog.title} {blog.author}
        </span>
        <button
          type="button"
          onClick={() => setExpanded((expanded) => !expanded)}
        >
          {expanded ? "Hide" : "View"}
        </button>
      </div>
      <div style={expanded ? { marginTop: 8 } : { display: "none" }}>
        <div>
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
        </div>
        <div>
          {blog.likes} {blog.likes === 1 ? "like" : "likes"}{" "}
          <button type="button">Like</button>
        </div>
        <div>{blog.user.name || blog.user.username}</div>
      </div>
    </div>
  );
}
