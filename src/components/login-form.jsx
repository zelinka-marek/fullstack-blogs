import PropTypes from "prop-types";
import { useState } from "react";

export function LoginForm(props) {
  const { onSubmit } = props;
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign in to application</h2>
      <div>
        <label htmlFor="username">Username</label>{" "}
        <input
          type="text"
          name="username"
          id="username"
          required
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>{" "}
        <input
          type="password"
          name="password"
          id="password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
