import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './LoginContents.scss';

export default function LoginContents() {
  const navigate = useNavigate();
  const search = useLocation().search;

  useEffect(() => {
    const params = new URLSearchParams(search);
    const jwt = params.get('jwt');

    if (jwt) {
      localStorage.setItem('jwt', jwt);

      navigate('/calander');
    } else {
      alert('로그인 할 수 없습니다.');
      navigate('/');
    }
  }, []);

  return <></>;
}
