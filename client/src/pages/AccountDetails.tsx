// branch: feature-AccountDetails
// user: thedreamfish
// pass: password1234

//npm start in client
//python manage.py runserver in server
import Input from "src/components/Input";
import Button from "src/components/Button";
import { useState } from "react";
import { useAuthContext } from "src/contexts/AuthContext";

export interface IBalanceForm {
    card_number: string;
    exp_date: string;
    balance: Number;
  }


export default function AccountDetails(){
    const [balanceForm, setBalanceForm] = useState<IBalanceForm>({
        card_number: "",
        exp_date: "",
        balance: 0,
      });

      const authValues = useAuthContext(); 

      async function balanceButtonHandler() {
        await authValues.askForBalance(balanceForm); 
      }

      function handleOnFormChange(event: React.ChangeEvent<HTMLInputElement>) {
        const fieldName: string = event.target.name;
        const fieldValue: string = event.target.value;
        setBalanceForm({
          ...balanceForm,
          [fieldName]: fieldValue,
        });
      }


    return(
        <main className="account">
            <h1 className="account_header">Account Details</h1>

            <section className="container_left">
                <h2 className="account_user_name"> {authValues.userData.first_name.charAt(0).toUpperCase() + authValues.userData.first_name.slice(1)} {authValues.userData.last_name.charAt(0).toUpperCase() + authValues.userData.last_name.slice(1)}</h2>
                <h2 className="account_email"> {authValues.userData.email}</h2>
                <h2 className="account_current_balance"> Current Balance: ${authValues.userData.balance}</h2>
                <h2 className="account_warnings"> Warnings: 2</h2>
                <h2 className="account_compliments"> Compliments: 4</h2>
            </section>

            <section className="container_right">
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
                <div className="amount_and_button">
                    <form>
                        <label>
                        <p>Amount to Add</p>
                        <input
                            className="input-field"
                            type="text"
                            name="amount"
                            value={balanceForm.balance.toString()}
                            onChange={handleOnFormChange}
                        
                            placeholder="$0.00"
                        />
                        </label>
                    </form>
                    <div className="container__button">
                            <Button className="primary" onClick={balanceButtonHandler}>
                                Add Balance
                            </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}