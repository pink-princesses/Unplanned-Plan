import { useNavigate } from 'react-router-dom';

import './IntroContents.scss';

export default function IntroContents() {
  const navigate = useNavigate();

  const goPersonalSettings = () => navigate('/personalSettings');
  return (
    <div className="Intro__wrapper">
      <p className="Intro__logo">😎</p>
      <p className="Intro__title">Unplanded Plan!</p>
      <button
        className="Intro__googleBtn"
        onClick={goPersonalSettings}
      ></button>
      <button className="Intro__appleBtn" onClick={goPersonalSettings}>
        <img src="apple_logo.png" alt="" />
        <p>Continue with Apple</p>
      </button>
    </div>
  );
}
