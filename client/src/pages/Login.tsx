import Input from "src/components/Input";
import Button from "src/components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../scss/auth.scss";

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  function handleOnFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fieldName: string = event.target.name;
    const fieldValue: string = event.target.value;
    setLoginForm({
      ...loginForm,
      [fieldName]: fieldValue,
    });
  }

  return (
    <main className="auth">
      <h1 className="auth__header">Login to your account</h1>
      <section className="container">
        <div className="container__forms">
          <form>
            <label>
              <p>Username</p>
              <input
                className="input-field"
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleOnFormChange}
              />
            </label>
          </form>
          <form>
            <label>
              <p>Password</p>
              <input
                className="input-field"
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleOnFormChange}
              />
            </label>
          </form>
        </div>
        <footer className="container__footer">
          Don't have an account?{" "}
          <Link className="redirect-link" to="/register">
            Register
          </Link>
        </footer>
        <div className="container__button">
          <Button variant="primary">Login</Button>
        </div>
      </section>
    </main>
  );
}
