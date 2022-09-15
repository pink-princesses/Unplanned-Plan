import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Customer.scss';

function Customer() {
  const navigate = useNavigate();
  const handleBackCalander = () => {
    navigate('/calander');
  };

  return (
    <div className="customer__container">
      <div className="nes-container is-rounded">
        <h1>📞 고객센터 📞</h1>
        <textarea id="textarea_field" className="nes-textarea"></textarea>
        <label htmlFor="textarea_field">
          이용후기나 건의사항을 알려주시면 어쩌고하겠습니다🙇‍♀️
        </label>
      </div>
      <button
        type="button"
        className="nes-btn is-primary"
        onClick={handleBackCalander}
      >
        캘린더로 돌아가기
      </button>
    </div>
  );
}

export default Customer;
