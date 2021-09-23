import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  ReactElement,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login } from "../../store/reducers/sessions";

interface LoginProps {
  credentials: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleChange: ChangeEventHandler;
  clearResults: Function;
}

const Login: FC<LoginProps> = ({
  credentials,
  handleChange,
  clearResults,
}): ReactElement => {
  const dispatch = useAppDispatch();
  // const user = useAppSelector((state) => state.session);
  const { username, password } = credentials;
  const [errors, setErrors] = useState<string[]>([]);

  const handleLogin: FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const potentialErrors: string[] = [];
    if (!username || !password) return setErrors(["information is invalid"]);
    setErrors(potentialErrors);
    dispatch(login({ username, password }) as any);
    clearResults();
  };

  return (
    <form onSubmit={handleLogin}>
      {errors.length > 0 && errors.map((error, i) => <li>{error}</li>)}
      <label htmlFor="username"> username: </label>
      <input
        id="username"
        type="text"
        placeholder="enter username"
        value={username}
        required
        min="4"
        max="12"
        onChange={handleChange}
      ></input>
      <br />

      <label htmlFor="password"> password: </label>
      <input
        id="password"
        type="password"
        placeholder="enter password"
        value={password}
        required
        min="8"
        max="100"
        onChange={handleChange}
      ></input>

      <br />

      <button type="submit">login</button>
    </form>
  );
};

export default Login;
