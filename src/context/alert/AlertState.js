import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";
import AlertContext from "./alertContext";
import { useReducer } from "react";

const GithubState = (props) => {
  const intialState = null;
  const [state, dispatch] = useReducer(AlertReducer, intialState);
  //for Show Alert
  const showAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 4000);
  };
  //clear Alert
  const clearAlert = () => dispatch({ type: REMOVE_ALERT });

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        showAlert,
        clearAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default GithubState;
