import PropTypes from "prop-types";
import { useState } from "react";

const initialFormData = { title: "", author: "", url: "" };

export function NewBlogForm(props) {
  const { onSubmit } = props;
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit(formData);

    setFormData(initialFormData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new blog</h2>
      <div>
        <label htmlFor="title">Title</label>{" "}
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>{" "}
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="url">URL</label>{" "}
        <input
          type="url"
          name="url"
          required
          value={formData.url}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save blog</button>
    </form>
  );
}

NewBlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
