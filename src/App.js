import { useState, Fragment } from "react";
import axios from "axios";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/Users/Users";
import User from "./components/Users/single-user/User";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import Search from "./components/Users/search/Search";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  // async componentDidMount() {
  //   setLoading(true);
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETE_KEY}`
  //   );
  //   console.log("Users: ", res.data);
  //   setUsers(res.data);
  //   setLoading(false);
  // }

  // Search in Github
  const search = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETE_KEY}`
    );
    console.log("Users: ", res.data.items);
    setUsers(res.data.items);
    setLoading(false);
  };

  //Get a Single Github User
  const getUser = async (userName) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETE_KEY}`
    );
    console.log("User: ", res.data);
    setUser(res.data);
    setLoading(false);
  };

  // Get User Repo
  const getUserRepos = async (userName) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETE_KEY}`
    );
    console.log("Repos: ", res.data);
    setRepos(res.data);
    setLoading(false);
  };

  //for Show Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 4000);
  };
  //clear Alert
  const clearAlert = () => setAlert(null);

  const clear = () => {
    setUsers([]);
    setLoading(false);
  };

  return (
    <Router>
      <div>
        <Navbar title="Github Finder" />
        <div className="container">
          <Alert alert={alert} clearAlert={clearAlert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    searchUser={search}
                    clearUser={clear}
                    showClear={users.length > 0 ? true : false}
                    showAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};
export default App;
