import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitCustomer } from '../api/requests';
import '../styles/Customer.scss';

function Customer() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [limit, setLimit] = useState(0);

  const handleBackCalander = () => {
    navigate('/calander');
  };
  const handleLimitValue = () => {
    if (limit > 500) {
      alert('이용후기/건의사항은 500자까지만 입력이 가능합니다!');
      setInputValue(inputValue.slice(0, 500));
      setLimit(500);
    } else {
      setLimit(inputValue.length);
    }
  };
  const changeHandler = (newValue: string) => {
    setInputValue(newValue);
    setLimit(inputValue.length);
    handleLimitValue();
  };
  const handleSubmit = async () => {
    if (inputValue) {
      try {
        await submitCustomer(inputValue);
        await alert(
          '이용후기/건의사항이 성공적으로 전달되었습니다. 감사합니다❤',
        );
      } catch (e) {
        alert(e);
      }
      setInputValue('');
      setLimit(0);
    } else {
      alert('내용을 입력해주세요!');
    }
  };

  return (
    <div className="customer__container">
      <div className="nes-container is-rounded form">
        <h1>📞 고객센터 📞</h1>
        <textarea
          id="textarea_field"
          className="nes-textarea"
          value={inputValue}
          onChange={(e) => changeHandler(e.target.value)}
        />
        <label htmlFor="textarea_field">
          UPP의 발전에 도움을 주셔서 감사합니다🙇‍♀️
          <span>{`${limit}/500자`}</span>
        </label>
      </div>
      <div className="btns">
        <button
          type="button"
          className="nes-btn is-primary"
          onClick={handleSubmit}
        >
          제출하기
        </button>
        <button
          type="button"
          className="nes-btn is-primary"
          onClick={handleBackCalander}
        >
          캘린더로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default Customer;
