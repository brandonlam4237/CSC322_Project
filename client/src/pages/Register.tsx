import { Link } from "react-router-dom";
import "../scss/auth.scss";
import Button from "src/components/Button";
import "../scss/radio.scss";
import { useState } from "react";
import "../scss/input.scss";
import { useAuthContext } from "src/contexts/AuthContext";

interface RegisterForm {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  user_type: string;
  password: string;
  re_password: string;
}

export default function Register() {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    user_type: "",
    password: "",
    re_password: "",
  });

  const authValues = useAuthContext();

  async function registerButtonHandler() {
    await authValues.registerUser(registerForm);
  }

  function handleOnFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fieldName: string = event.target.name;
    const fieldValue: string = event.target.value;
    setRegisterForm({
      ...registerForm,
      [fieldName]: fieldValue,
    });
  }

  return (
    <main className="auth">
      <h1 className="auth__header">Register your account</h1>
      <section className="container">
        <div className="container__forms">
          <form>
            <label>
              <p>Email</p>
              <input
                className="input-field"
                type="text"
                name="email"
                value={registerForm.email}
                onChange={handleOnFormChange}
              />
            </label>
          </form>
          <form>
            <label>
              <p>Username</p>
              <input
                className="input-field"
                type="text"
                name="username"
                value={registerForm.username}
                onChange={handleOnFormChange}
              />
            </label>
          </form>
          <div className="container__forms__name">
            <form>
              <label>
                <p>First Name</p>
                <input
                  className="input-field"
                  type="text"
                  name="first_name"
                  value={registerForm.first_name}
                  onChange={handleOnFormChange}
                />
              </label>
            </form>
            <form>
              <label>
                <p>Last Name</p>
                <input
                  className="input-field"
                  type="text"
                  name="last_name"
                  value={registerForm.last_name}
                  onChange={handleOnFormChange}
                />
              </label>
            </form>
          </div>
          <div className="container__forms_userType">
            <p>User Type</p>
            <label htmlFor="userType-customer" className="radio">
              <input
                type="radio"
                name="user_type"
                id="userType-customer"
                className="radio__input"
                value="customer"
                onChange={handleOnFormChange}
              />
              <div className="radio__radio"></div>
              Customer
            </label>
            <label htmlFor="userType-employee" className="radio">
              <input
                type="radio"
                name="user_type"
                id="userType-employee"
                className="radio__input"
                value="employee"
                onChange={handleOnFormChange}
              />
              <div className="radio__radio"></div>
              Employee
            </label>
          </div>
          <form>
            <label>
              <p>Password</p>
              <input
                className="input-field"
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleOnFormChange}
              />
            </label>
          </form>
          <form>
            <label>
              <p>Confirm Password</p>
              <input
                className="input-field"
                type="password"
                name="re_password"
                value={registerForm.re_password}
                onChange={handleOnFormChange}
              />
            </label>
          </form>
        </div>
        <footer className="container__footer">
          Already have an account?{" "}
          <Link className="redirect-link" to="/login">
            Login
          </Link>
        </footer>
        <div className="container__button">
          <Button variant="primary" onClick={registerButtonHandler}>
            Register
          </Button>
        </div>
      </section>
    </main>
  );
}
