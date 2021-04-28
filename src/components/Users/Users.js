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
      <div style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};
export default Users;
