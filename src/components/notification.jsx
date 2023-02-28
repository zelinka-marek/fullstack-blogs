export function Notification(props) {
  const { status = "success", message } = props;

  return (
    <div role="alert" className={`notification ${status}`}>
      {message}
    </div>
  );
}
