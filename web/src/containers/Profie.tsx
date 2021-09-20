import { useAppSelector } from "../store/hooks";

interface User {
  id: number;
  username: string;
  email: string;
  favorites: unknown[];
}

interface Note {
  id: number;
  category: string;
}

const Profie = () => {
  const user: User = useAppSelector((state) => state.session);
  const { username } = user;
  const favorites: any = user.favorites;

  const categories = (): string[] => {
    if (favorites.length === 0) return ["No favorites"];
    const uniqueCategories: { [key: string]: boolean } = {};
    //@ts-ignore
    favorites.forEach((note) => (uniqueCategories[note.language] = true));

    const categories = Object.keys(uniqueCategories);
    return categories;
  };

  return (
    <section>
      <h2>{username}</h2>
      {favorites.length > 0 && <p>Favorite Languages</p>}
      {categories().map((ele) => {
        return <div>{ele}</div>;
      })}
      <p>Favorite notes</p>
      {/*
        //@ts-ignore}*/}
      {favorites.length > 0 && favorites.map((fav) => <div>{fav.title}</div>)}
    </section>
  );
};

export default Profie;
