import './IntroContents.scss';

export default function IntroContents() {
  return (
    <div className="Intro__wrapper">
      <p className="logo">😎</p>
      <p className="title">Unplanded Plan!</p>
      <button className="google loginBtn"></button>
      <button className="apple loginBtn">
        <img src="apple_logo.png" alt="" />
        <p>Continue with Apple</p>
      </button>
    </div>
  );
}
