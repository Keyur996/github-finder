import axios from "axios";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  SET_LOADING,
  CLEAR_USERS,
} from "../types";
import GithubContext from "./githubContext";
import { useReducer } from "react";

const GithubState = (props) => {
  const intialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, intialState);

  // Search in Github
  const searchUsers = async (text) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETE_KEY}`
    );
    console.log("Users: ", res.data.items);
    //  setUsers(res.data.items);
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  //Get a Single Github User
  const getUser = async (userName) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETE_KEY}`
    );
    console.log("User: ", res.data);
    dispatch({ type: GET_USER, payload: res.data });
  };

  //Clear Users
  const clear = () => dispatch({ type: CLEAR_USERS });

  // Get User Repo
  const getUserRepos = async (userName) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETE_KEY}`
    );
    console.log("Repos: ", res.data);
    dispatch({ type: GET_REPOS, payload: res.data });
  };

  //set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clear,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
