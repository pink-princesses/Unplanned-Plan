import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { openGoogleLoginPage } from '../../utils';

import './IntroContents.scss';

export default function IntroContents() {
  const navigate = useNavigate();
  const clickHandler = useCallback(openGoogleLoginPage, []);

  useEffect(() => {
    const paramStr = window.location.href;
    const jwt = paramStr?.split('?')[1]?.split('=')[1];
    if (jwt) {
      if (jwt.length > 10) localStorage.setItem('jwt', jwt);
      if (localStorage.getItem('jwt')) navigate('/calander');
    }
  }, []);

  return (
    <div className="Intro__wrapper">
      <p className="Intro__logo">😎</p>
      <p className="Intro__title">Welcom to Unplanded Plan!</p>
      <div className="Intro__contents">
        <p className="Intro__content">데드라인만 지키면 되죠</p>
        <p className="Intro__content">계획은 미뤄야 제 맛</p>
        <p className="Intro__content">우리가 만든 결과는 늘 괜찮았어요</p>
      </div>
      <button className="Login__googleBtn" onClick={clickHandler}></button>
    </div>
  );
}
