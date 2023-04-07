import { Link } from "react-router-dom";
import "../scss/auth.scss";
import Input from "src/components/Input";
import Button from "src/components/Button";
import "../scss/radio.scss";
import { useState } from "react";
import "../scss/input.scss";

interface RegisterForm {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  userType: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    userType: "",
    password: "",
    confirmPassword: "",
  });

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
                  name="firstName"
                  value={registerForm.firstName}
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
                  name="lastName"
                  value={registerForm.lastName}
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
                name="userType"
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
                name="userType"
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
                name="confirmPassword"
                value={registerForm.confirmPassword}
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
          <Button variant="primary">Register</Button>
        </div>
      </section>
    </main>
  );
}
