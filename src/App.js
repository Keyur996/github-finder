import { Component, Fragment } from "react";
import axios from "axios";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/Users/Users";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import Search from "./components/Users/search/Search";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
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
                      loading={this.state.loading}
                      users={this.state.users}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
