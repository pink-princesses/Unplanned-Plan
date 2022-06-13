import './Inner.scss';
import { ChildrenProps } from '../../types/ChildrenProps';

export default function Inner({ children }: ChildrenProps) {
  return <div className="innerWrapper">{children}</div>;
}
