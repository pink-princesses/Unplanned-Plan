import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './LoginContents.scss';

export default function LoginContents() {
  const navigate = useNavigate();
  const search = useLocation().search;

  useEffect(() => {
    const params = new URLSearchParams(search);
    const jwt = params.get('jwt');
    const refresh = params.get('refresh');

    if (jwt && refresh) {
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('refresh', refresh);

      if (localStorage.getItem('jwt')) console.log('있음');
      navigate('/calander');
    } else {
      alert('로그인 할 수 없습니다.');
      navigate('/');
    }
  }, []);

  return <></>;
}
