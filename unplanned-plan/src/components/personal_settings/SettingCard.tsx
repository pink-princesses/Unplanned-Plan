import { ChildrenProps } from '../../types/ChildrenProps';
import './SettingCard.scss';

export default function SettingCard({
  children,
  label,
  focus,
  changeFocus,
}: Props) {
  return (
    <div
      className={`SettingCardWrapper${focus ? '--focus' : ''}`}
      onClick={changeFocus}
    >
      <p className="SettingCardWrapper__label">{label}</p>
      {children}
    </div>
  );
}

type Props = ChildrenProps & {
  label: string;
  focus: boolean;
  changeFocus: () => void;
};
