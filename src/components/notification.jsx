import PropTypes from "prop-types";

export function Notification(props) {
  const { status = "success", message } = props;

  return (
    <div role="alert" className={`notification ${status}`}>
      {message}
    </div>
  );
}

Notification.propTypes = {
  status: PropTypes.oneOf(["success", "error"]),
  message: PropTypes.string.isRequired,
};
