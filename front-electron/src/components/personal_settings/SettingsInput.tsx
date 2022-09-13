import './SettingInput.scss';

export default function SettingsInput({ autoFocus, changeFocus }: Props) {
  return (
    <>
      <input
        className="SettingsInput"
        type="text"
        autoFocus={autoFocus}
        onFocus={changeFocus}
      />
    </>
  );
}

type Props = {
  autoFocus?: boolean;
  changeFocus: () => void;
};
