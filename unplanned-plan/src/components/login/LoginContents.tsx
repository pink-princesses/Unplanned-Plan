import { useNavigate } from 'react-router-dom';

import './LoginContents.scss';

export default function LoginContents() {
  const navigate = useNavigate();

  const goPersonalSettings = () => navigate('/personalSettings');
  return (
    <div className="Login__wrapper">
      <p className="Login__logo">😎</p>
      <p className="Login__title">Sign in Unplanded Plan!</p>
      <button
        className="Login__googleBtn"
        onClick={goPersonalSettings}
      ></button>
      <button className="Login__appleBtn" onClick={goPersonalSettings}>
        <img src="apple_logo.png" alt="" />
        <p>Continue with Apple</p>
      </button>
    </div>
  );
}
