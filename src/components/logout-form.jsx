export function LogoutForm(props) {
  const { onSubmit } = props;

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Sign out</button>
    </form>
  );
}
