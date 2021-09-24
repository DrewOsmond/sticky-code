import { FC, FormEventHandler, ReactElement, useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login } from "../../store/reducers/sessions";
import { LoginProps } from "../../types";
import "./index.css";

const Login: FC<LoginProps> = ({
  credentials,
  handleChange,
  clearResults,
  changeStatus,
}): ReactElement => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user: { id: number } = useAppSelector((state) => state.session);
  const { username, password } = credentials;
  const [errors, setErrors] = useState<string[]>([]);

  const handleLogin: FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const potentialErrors: string[] = [];
    if (!username || !password) return setErrors(["information is invalid"]);
    setErrors(potentialErrors);
    dispatch(login({ username, password }) as any);
    setTimeout(() => {
      if (user.id !== 0) {
        clearResults();
        history.push("/");
      }
    }, 80);
  };

  return (
    <div className="login-page">
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

        <button
          type="submit"
          className="login-button"
        >{`( username, passsword ) => login;`}</button>
      </form>
      <button id="signup" onClick={changeStatus} className="signup-button">
        new user ? Signup :
      </button>
    </div>
  );
};

export default Login;
