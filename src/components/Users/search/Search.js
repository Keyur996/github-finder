import { useContext, useState } from "react";
import GithubContext from "../../../context/github/githubContext";
import AlertContext from "../../../context/alert/alertContext";

const Search = () => {
  const { searchUsers, clear, users } = useContext(GithubContext);
  const { showAlert } = useContext(AlertContext);

  const [text, setText] = useState("");

  const onSubmitSearch = (e) => {
    e.preventDefault();

    if (text === "") {
      showAlert("Please enter something..", "light");
    } else {
      //  console.log(this.state.text);
      searchUsers(text);
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
      {users.length > 0 && (
        <button
          type="button"
          onClick={clear}
          className="btn btm-light btn-block"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
