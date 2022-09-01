import { ChildrenProps } from '../../types/ChildrenProps';
import './Inner.scss';

export default function Inner({ children }: ChildrenProps) {
  return <div className="innerWrapper">{children}</div>;
}
