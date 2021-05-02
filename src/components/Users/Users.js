import "./Users.css";
import UserItem from "./UserItem/UserItem";
import Spinner from "../layouts/Spinner";
import GithubContext from "../../context/github/githubContext";
import { useContext } from "react";

const Users = () => {
  const { loading, users } = useContext(GithubContext);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="users-grid">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

export default Users;
