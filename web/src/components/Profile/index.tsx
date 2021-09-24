import { MouseEventHandler, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { csrfProtectedFetch } from "../../store/csrfProtection";
import "./index.css";
import { User, nullUser } from "../../types";

const UserProfile = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [profile, setProfile] = useState<User>(nullUser);
  const history = useHistory();
  const { user } = useParams<{ user?: string }>();

  useEffect(() => {
    const getProfile = async () => {
      const response = await csrfProtectedFetch(`/api/users/profile/${user}`);
      if (response?.ok) {
        const data = await response.json();
        setProfile(data);
      }
      setLoaded(true);
    };
    getProfile();
  }, []);

  const handleRedirect: MouseEventHandler = (e) => {
    if (profile?.username) {
      history.push(`/collection/${profile?.username}/${e.currentTarget.id}`);
    }
  };

  const render = () => {
    if (!loaded) {
      return <div>loading...</div>;
    } else if (profile && profile.id) {
      return (
        <section className="profile">
          <h3>{profile.username}</h3>
          <div className="variable-name">
            {`var `}
            <span className="white">{"{"}</span>
          </div>
          {profile.collections.length > 0 &&
            profile.collections.map((colName) => (
              <div>
                <button
                  className="object-name"
                  id={`${colName.id}`}
                  key={colName.id}
                  onClick={handleRedirect}
                >
                  {"    "}
                  {`${colName.name},`}
                </button>
              </div>
            ))}
          <div className="destructured-var">
            {" "}
            <span className="white">{`} = `}</span>
            {`${profile.username}sCollections`}
          </div>
        </section>
      );
    } else {
      return <section>No Profile Found</section>;
    }
  };
  return render();
};

export default UserProfile;
