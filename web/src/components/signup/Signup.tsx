import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  ReactElement,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/reducers/sessions";

interface SignupProps {
  handleChange: ChangeEventHandler;
  credentials: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  // dispatch: Dispatch;
  clearResults: Function;
}

const Signup: FC<SignupProps> = ({
  handleChange,
  credentials,
  // dispatch,
}): ReactElement => {
  const [errors, setErrors] = useState<string[]>([]);
  const { username, email, password, confirmPassword } = credentials;
  const dispatch = useDispatch();

  const handleSignup: FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const potentialErrors: string[] = [];
    const checkPasswordStrength: RegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const strongPassword: RegExpMatchArray | null = password.match(
      checkPasswordStrength
    );

    if (!strongPassword) {
      const errorMsg: string =
        password.length >= 8
          ? "password must contain at least 1 uppercase letter and a number"
          : "password must have at least 8 characters";
      potentialErrors.push(errorMsg);
    } else if (password !== confirmPassword) {
      potentialErrors.push("passwords do not match");
    }
    setErrors(potentialErrors);
    dispatch(signup({ username, email, password }) as any);
  };

  return (
    <form onSubmit={handleSignup}>
      {errors.length > 0 && errors.map((error, i) => <li>{error}</li>)}
      <label htmlFor="username"> username:</label>
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

      <label htmlFor="email">email:</label>
      <input
        id="email"
        type="email"
        placeholder="enter email"
        value={email}
        required
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
        onChange={handleChange}
      ></input>

      <br />

      <label htmlFor="confirm_password"> confirm password: </label>
      <input
        id="confirm_password"
        type="password"
        placeholder="confirm password"
        value={confirmPassword}
        required
        onChange={handleChange}
      ></input>

      <br />

      <button type="submit">signup</button>
    </form>
  );
};

export default Signup;
