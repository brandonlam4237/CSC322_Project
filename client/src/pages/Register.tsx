import { Link } from "react-router-dom";
import "../scss/auth.scss";
import Input from "src/components/Input";
import Button from "src/components/Button";
import "../scss/radio.scss";

export default function Register() {
  return (
    <main className="register">
      <h1 className="register__header">Register your account</h1>
      <section className="container">
        <div className="container__forms">
          <form>
            <label>
              <p>Email</p>
              <Input />
            </label>
          </form>
          <form>
            <label>
              <p>Username</p>
              <Input />
            </label>
          </form>
          <div className="container__forms__name">
            <form>
              <label>
                <p>First Name</p>
                <Input />
              </label>
            </form>
            <form>
              <label>
                <p>Last Name</p>
                <Input />
              </label>
            </form>
          </div>
          <div className="container__forms_userType">
            <p>User Type</p>
            <label htmlFor="userType-customer" className="radio">
              <input
                type="radio"
                name="customer"
                id="userType-customer"
                className="radio__input"
              />
              <div className="radio__radio"></div>
              Customer
            </label>
            <label htmlFor="userType-employee" className="radio">
              <input
                type="radio"
                name="customer"
                id="userType-employee"
                className="radio__input"
              />
              <div className="radio__radio"></div>
              Employee
            </label>
          </div>
          <form>
            <label>
              <p>Password</p>
              <Input />
            </label>
          </form>
          <form>
            <label>
              <p>Confirm Password</p>
              <Input />
            </label>
          </form>
        </div>
        <div className="container__button">
          <Button label="Register" />
        </div>
        <footer className="container__footer">
          Already have an account?{" "}
          <Link className="redirect-link" to="/login">
            Login
          </Link>
        </footer>
      </section>
    </main>
  );
}
