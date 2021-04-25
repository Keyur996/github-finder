import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  state = {
    text: "",
  };

  static propType = {
    onSubmitSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    showAlert: PropTypes.func.isRequired,
  };

  onSubmitSearch = (e) => {
    e.preventDefault();

    if (this.state.text === "") {
      this.props.showAlert("Please enter something..", "light");
    } else {
      //  console.log(this.state.text);
      this.props.searchUser(this.state.text);
      this.setState({ text: "" });
    }
  };

  onChangeText = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { showClear, clearUser } = this.props;

    return (
      <div>
        <form className="form" onSubmit={this.onSubmitSearch}>
          <input
            type="text"
            name="text"
            placeholder="Search Here..."
            value={this.state.text}
            onChange={this.onChangeText}
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
  }
}

export default Search;
