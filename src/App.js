import { Fragment } from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/Users/Users";
import User from "./components/Users/single-user/User";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";
import Search from "./components/Users/search/Search";
import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

const App = () => {
  // async componentDidMount() {
  //   setLoading(true);
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRETE_KEY}`
  //   );
  //   console.log("Users: ", res.data);
  //   setUsers(res.data);
  //   setLoading(false);
  // }

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div>
            <Navbar title="Github Finder" />
            <div className="container">
              <Alert />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Fragment>
                      <Search />
                      <Users />
                    </Fragment>
                  )}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};
export default App;
