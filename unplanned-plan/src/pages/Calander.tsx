import React from 'react';
import { useNavigate } from 'react-router-dom';

function Calander() {
  const navigate = useNavigate();
  return (
    <div>
      ㅋ캘린더임
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        메인으로
      </button>
    </div>
  );
}

export default Calander;
