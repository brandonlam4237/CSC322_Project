import "../scss/user-row.scss";
import Button from "src/components/Button";
interface UserRowProps {
  username: string;
  email: string;
  userType: string;
}

export function UserRow({ username, email, userType }: UserRowProps) {
  return (
    <div className="user-row">
      <div className="user-row__info">
        <h2 className="user-row__user-type">{userType}</h2>
        <p>{username}</p>
        <p>{email}@example.com</p>
      </div>
      <div className="user-row__buttons">
        <Button className="user-row__buttons__approve">✔</Button>
        <Button className="user-row__buttons__reject">X</Button>
      </div>
    </div>
  );
}
