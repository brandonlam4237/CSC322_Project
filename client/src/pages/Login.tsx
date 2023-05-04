import Button from "src/components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../scss/auth.scss";
import { useAuthContext } from "src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const authValues = useAuthContext();
  const navigate = useNavigate()

  function handleOnFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fieldName: string = event.target.name;
    const fieldValue: string = event.target.value;
    setLoginForm({
      ...loginForm,
      [fieldName]: fieldValue,
    });
  }

  async function loginButtonHandler() {
    try {
      await authValues.loginUser(loginForm.username, loginForm.password);
      navigate("/")
    }
    catch (err){

    }
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
          <Button className="blue-primary round" onClick={loginButtonHandler}>
            Login
          </Button>
        </div>
      </section>
    </main>
  );
}
