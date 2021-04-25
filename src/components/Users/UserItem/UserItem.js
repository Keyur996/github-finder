import PropTypes from "prop-types";

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt={login}
        className="round-img"
        style={{ width: "60px" }}
      />

      <div>
        <h3>{login}</h3>
        <a
          href={html_url}
          target="_blank"
          className="btn btn-sm btn-dark my-1"
          rel="noreferrer"
        >
          More Info
        </a>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
