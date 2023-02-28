export function BlogDetails(props) {
  const { blog } = props;

  return (
    <div>
      {blog.title} {blog.author}
    </div>
  );
}
