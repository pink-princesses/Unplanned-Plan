import './Inner.scss';

export default function Inner({ children }: Props) {
  return <div className="innerWrapper">{children}</div>;
}

type Props = {
  children: React.ReactNode;
};
