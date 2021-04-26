import { Component, Fragment } from "react";
import axios from "axios";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/Users/Users";
import User from "./components/Users/single-user/User";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import Search from "./components/Users/search/Search";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: [],
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETE_KEY}`
  //   );
  //   console.log("Users: ", res.data);
  //   this.setState({ users: res.data, loading: false });
  // }

  // Search in Github
  search = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETE_KEY}`
    );
    console.log("Users: ", res.data.items);
    this.setState({ users: res.data.items, loading: false });
  };

  //Get a Single Github User
  getUser = async (userName) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETE_KEY}`
    );
    console.log("Users: ", res.data);
    this.setState({ user: res.data, loading: false });
  }

  // Get User Repo
  getUserRepos = async (userName) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETE_KEY}`
    );
    console.log("Users: ", res.data);
    this.setState({ repos: res.data, loading: false });
  }

  //for Show Alert
  showAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };
  //clear Alert
  clearAlert = () => this.setState({ alert: null });

  clear = () => {
    this.setState({ users: [], loading: false });
  };

  render() {
    const { loading, users, user, repos } = this.state;

    return (
      <Router>
        <div>
          <Navbar title="Github Finder" />
          <div className="container">
            <Alert alert={this.state.alert} clearAlert={this.clearAlert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUser={this.search}
                      clearUser={this.clear}
                      showClear={this.state.users.length > 0 ? true : false}
                      showAlert={this.showAlert}
                    />
                    <Users
                      loading={loading}
                      users={users}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={(props) => (
                <User {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
