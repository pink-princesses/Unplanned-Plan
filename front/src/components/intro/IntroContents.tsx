import { useCallback } from 'react';

import './IntroContents.scss';
import IntroConffeti from './IntroConffeti';

export default function IntroContents() {
  const openGoogleLoginPage = useCallback(() => {
    console.log('login');
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const redirectUri = 'api/v1/auth/login/google/';

    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' ');

    const params = {
      response_type: 'code',
      client_id:
        '310763754913-02lvsola05qlakebccaqpi9km0kj8qlu.apps.googleusercontent.com',
      redirect_uri: `${'http://localhost:8000'}/${redirectUri}`,
      prompt: 'select_account',
      access_type: 'offline',
      scope,
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `${googleAuthUrl}?${urlParams}` as (string | Location) &
      Location;
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
      <button
        className="Login__googleBtn"
        onClick={openGoogleLoginPage}
      ></button>
      <IntroConffeti />
    </div>
  );
}
