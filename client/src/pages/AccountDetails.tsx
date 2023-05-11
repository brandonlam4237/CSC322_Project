import Button from "src/components/Button";
import { useState } from "react";
import { useAuthContext } from "src/contexts/AuthContext";
import "../scss/accountDetails.scss";

export interface IBalanceForm {
  card_number: string;
  exp_date: string;
  balance: number;
  name_on_card: string;
  cvc: number;
}

export default function AccountDetails() {
  const [balanceForm, setBalanceForm] = useState<IBalanceForm>({
    card_number: "",
    exp_date: "",
    balance: 0,
    name_on_card: "",
    cvc: 0,
  });

  const authValues = useAuthContext();
  const user = authValues.userData;
  async function balanceButtonHandler() {
    balanceForm.balance = Number(balanceForm.balance);

    if (balanceForm.name_on_card.length > 0 && balanceForm.cvc.toString().length > 1){
      await authValues.askForBalance(balanceForm);
    }else{
      alert("Please Insert Name and CVC");
    }
  }

  function handleOnFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fieldName: string = event.target.name;
    const fieldValue: string = event.target.value;
    setBalanceForm({
      ...balanceForm,
      [fieldName]: fieldValue,
    });
  }

  return (
    <main className="account-details-component">
      <h1 className="account-details-component__header">
        <div className="logo__accent-left">{`<`}</div> Account Details
        <div className="logo__accent-right">{`>`}</div>
      </h1>

      <div className="account-details-component__content">
        <section className="account-details-component__content__container-left">
          <h2 className="account-username">
            <div className="logo__accent-left">{`<`}</div>{" "}
            {user.first_name.charAt(0).toUpperCase() +
              user.first_name.slice(1)}{" "}
            {user.last_name.charAt(0).toUpperCase() +
              user.last_name.slice(1)}
            <div className="logo__accent-right">{`>`}</div>
          </h2>
          <h2> {user.email}</h2>
          <h2> Current Balance: ${user.balance}</h2>
          <h2> Compliments: {user.compliments}</h2>
          <h2> Warnings: {user.warnings}</h2>
        </section>

        <section className="account-details-component__content__container-right">
          <div className="name_and_credit">
            <form>
              <label>
                <p>Name</p>
                <input
                  className="input-field"
                  type="text"
                  name="card_name"
                  onChange={handleOnFormChange}
                  placeholder="Name on Card"
                />
              </label>
            </form>
            <form>
              <label>
                <p>Credit Card Number</p>
                <input
                  className="input-field"
                  type="password"
                  name="card_number"
                  value={balanceForm.card_number}
                  onChange={handleOnFormChange}
                  placeholder="9999 9999 9999"
                />
              </label>
            </form>
          </div>
          <div className="exp_and_cvc">
            <form>
              <label>
                <p>Expiration Date</p>
                <input
                  className="input-field"
                  type="text"
                  name="exp_date"
                  value={balanceForm.exp_date}
                  onChange={handleOnFormChange}
                  placeholder="MMYYYY"
                />
              </label>
            </form>
            <form>
              <label>
                <p>Security Code</p>
                <input
                  className="input-field"
                  type="password"
                  name="sec_code"
                  onChange={handleOnFormChange}
                  placeholder="CVC"
                />
              </label>
            </form>
          </div>
          <div className="deposit-amount">
            <form>
              <label>
                <p>Amount to Add</p>
                <input
                  className="input-field"
                  inputMode="numeric"
                  type="text"
                  name="balance"
                  value={balanceForm.balance == 0 ? "" : balanceForm.balance}
                  onChange={handleOnFormChange}
                  placeholder="0.00"
                />
              </label>
            </form>
            <Button className="blue-primary" onClick={balanceButtonHandler}>
              Add Balance
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
