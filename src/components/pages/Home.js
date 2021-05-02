import { Fragment } from "react";
import Users from "../Users/Users";
import Search from "../Users/search/Search";

const Home = () => {
  return (
    <Fragment>
      <Search />
      <Users />
    </Fragment>
  );
};

export default Home;
