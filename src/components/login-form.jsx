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
      <h1>Sign in to application</h1>
      <div>
        <label htmlFor="username">username</label>{" "}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>{" "}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
  );
}
