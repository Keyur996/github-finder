import { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ showAlert, searchUser, showClear, clearUser }) => {
  const [text, setText] = useState("");

  const onSubmitSearch = (e) => {
    e.preventDefault();

    if (text === "") {
      showAlert("Please enter something..", "light");
    } else {
      //  console.log(this.state.text);
      searchUser(text);
      setText("");
    }
  };

  const onChangeText = (e) => setText(e.target.value);

  return (
    <div>
      <form className="form" onSubmit={onSubmitSearch}>
        <input
          type="text"
          name="text"
          placeholder="Search Here..."
          value={text}
          onChange={onChangeText}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button
          type="button"
          onClick={clearUser}
          className="btn btm-light btn-block"
        >
          Clear
        </button>
      )}
    </div>
  );
};

Search.propType = {
  onSubmitSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default Search;
