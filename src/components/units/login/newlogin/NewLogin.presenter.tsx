import { ILoginPageUIProps } from "./NewLogin.types";

export default function NewLoginUI(props: ILoginPageUIProps): JSX.Element {
  const { onChangeEmail, onChangePassword, onClickLogin } = props;
  return (
    <div>
      이메일 : <input type="text" onChange={onChangeEmail} /> <br />
      비밀번호 : <input type="password" onChange={onChangePassword} />
      <button onClick={onClickLogin}>로그인하기!!</button>
    </div>
  );
}
