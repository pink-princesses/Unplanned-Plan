import './IntroContents.scss';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IntroContents() {
  return (
    <div className="Intro__wrapper">
      <p>Unplanded Plan!</p>
      <button className="google loginBtn"></button>
      <button className="apple loginBtn">
        <img src="apple_logo.png" alt="" />
        <p>Continue with Apple</p>
      </button>
    </div>
  );
}
