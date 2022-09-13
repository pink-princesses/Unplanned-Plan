import styled from '@emotion/styled';
import { useState } from 'react';

import './PersonalSettingsContents.scss';

import SettingCard from './SettingCard';
import SettingsInput from './SettingsInput';

export default function PersonalSettingsContents() {
  const [focus, setFocus] = useState('닉네임');
  const [tags, setTags] = useState([]);

  const getNicknameFocus = () => setFocus('닉네임');
  const getTageFocus = () => setFocus('태그 설정');
  const getMailFocus = () => setFocus('메일 알림 여부 설정');

  return (
    <div className="PersonalSettingsContentsWrapper">
      <SettingCard
        label="닉네임"
        focus={focus === '닉네임'}
        changeFocus={getNicknameFocus}
      >
        <SettingsInput autoFocus changeFocus={getNicknameFocus} />
      </SettingCard>
      <SettingCard
        label="태그 설정"
        focus={focus === '태그 설정'}
        changeFocus={getTageFocus}
      >
        <SettingsInput changeFocus={getTageFocus} />
      </SettingCard>
      <SettingCard
        label="메일 알림 여부 설정"
        focus={focus === '메일 알림 여부 설정'}
        changeFocus={getMailFocus}
      >
        <SettingsInput changeFocus={getMailFocus} />
      </SettingCard>
      <Div></Div>
    </div>
  );
}

const Div = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: gray;
  z-index: -10;
`;
