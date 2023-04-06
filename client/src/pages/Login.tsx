import Input from "src/components/Input";
import Button from "src/components/Button";
import { Link } from "react-router-dom";
import "../scss/auth.scss";
export default function Login() {
  return (
    <main className="register">
      <h1 className="register__header">Login to your account</h1>
      <section className="container">
        <div className="container__forms">
          <form>
            <label>
              <p>Username</p>
              <Input />
            </label>
          </form>
          <form>
            <label>
              <p>Password</p>
              <Input />
            </label>
          </form>
        </div>
        <div className="container__button">
          <Button label="Login" />
        </div>
        <footer className="container__footer">
          Don't have an account?{" "}
          <Link className="redirect-link" to="/register">
            Login
          </Link>
        </footer>
      </section>
    </main>
  );
}
