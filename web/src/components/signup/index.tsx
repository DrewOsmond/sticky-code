import { FC, FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { signup } from "../../store/reducers/sessions";
import { SignupProps, User } from "../../types";

const Signup: FC<SignupProps> = ({
  handleChange,
  credentials,
  changeStatus,
}) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { username, email, password, confirmPassword } = credentials;
  const dispatch = useDispatch();
  const user: User = useAppSelector((state) => state.session);

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
          ? "password must contain at least 1 uppercase letter, a lower case letter, and a number"
          : "password must have at least 8 characters";
      potentialErrors.push(errorMsg);
    } else if (password !== confirmPassword) {
      potentialErrors.push("passwords do not match");
    }
    dispatch(signup({ username, email, password }) as any);
    setErrors(potentialErrors);
  };

  return (
    <>
      <form onSubmit={handleSignup}>
        {errors.length > 0 &&
          errors.map((error, i) => <li key={i}>{error}</li>)}
        {user?.errors && user.errors.map((err, i) => <li key={i}>{err}</li>)}
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
        <label htmlFor="email">email:</label>
        <input
          id="email"
          type="email"
          placeholder="enter email"
          value={email}
          required
          onChange={handleChange}
        ></input>
        <label htmlFor="password"> password: </label>
        <input
          id="password"
          type="password"
          placeholder="enter password"
          value={password}
          required
          onChange={handleChange}
        ></input>
        <label htmlFor="confirm_password"> confirm password: </label>
        <input
          id="confirm_password"
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          required
          onChange={handleChange}
        ></input>
        <button
          type="submit"
          className="signup-button"
        >{`( signup ) => newUser;`}</button>
      </form>
      <button id="login" onClick={changeStatus} className="login-button">
        already a user ? login :
      </button>
    </>
  );
};

export default Signup;
