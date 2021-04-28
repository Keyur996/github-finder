import { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
  const { alert, clearAlert } = useContext(AlertContext);

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

export default Alert;
