import PropTypes from "prop-types";
import { useState } from "react";

const blogStyle = {
  padding: "8px 12px",
  border: "1px solid",
  marginBottom: "5px",
  borderRadius: "6px",
};

export function BlogDetails(props) {
  const { blog, isOwner, onLike, onDelete } = props;

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
        <div>
          <span>{blog.title}</span> <span>{blog.author}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {isOwner && (
            <button type="button" onClick={onDelete}>
              Delete
            </button>
          )}
          <button
            type="button"
            onClick={() => setExpanded((expanded) => !expanded)}
          >
            {expanded ? "Hide" : "View"}
          </button>
        </div>
      </div>
      <div style={expanded ? { marginTop: 8 } : { display: "none" }}>
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </div>
        <div>
          {blog.likes} {blog.likes === 1 ? "like" : "likes"}{" "}
          <button type="button" onClick={onLike}>
            Like
          </button>
        </div>
        <div>{blog.user.name || blog.user.username}</div>
      </div>
    </div>
  );
}

BlogDetails.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isOwner: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
