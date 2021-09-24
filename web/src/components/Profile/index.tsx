import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { csrfProtectedFetch } from "../../store/csrfProtection";

interface Collection {
  id: number;
  name: string;
}
interface User {
  id: number;
  username: string;
  email: string;
  favorite_notes: Note[];
  favorite_collections: Collection[];
  collections: Collection[];
}

interface Note {
  id: number;
  category: string;
  title: string;
}

const UserProfile = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [profile, setProfile] = useState<User | void>();
  const { user } = useParams<{ user?: string }>();

  useEffect(() => {
    const getProfile = async () => {
      const response = await csrfProtectedFetch(`/api/users/profile/${user}`);
      if (response?.ok) {
        const data = await response.json();
        console.log("huh?");
        setProfile(data);
      }
      setLoaded(true);
    };
    getProfile();
  }, []);

  const render = () => {
    if (!loaded) {
      return <div>loading...</div>;
    } else if (profile && profile.id) {
      return (
        <section>
          <h3>{profile.username}</h3>
        </section>
      );
    } else {
      return <section>No Profile Found</section>;
    }
  };
  return render();
};

export default UserProfile;
