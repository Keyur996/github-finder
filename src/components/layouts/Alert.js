import PropTypes from "prop-types";

const Alert = ({ alert, clearAlert }) => {
  return (
    alert !== null && (
      <div
        className={`alert alert-${alert.type}`}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span>
          <i className="fas fa-info"></i> &nbsp; {alert.msg}
        </span>
        <span>
          <button style={{ border: "none" }} onClick={clearAlert}>
            <i className="fas fa-times"></i>
          </button>
        </span>
      </div>
    )
  );
};

Alert.propType = {
  alert: PropTypes.object.isRequired,
  clearAlert: PropTypes.func.isRequired,
};

export default Alert;
