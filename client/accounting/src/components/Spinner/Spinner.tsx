import { ISpinnerProps } from '../../types/index';
import './style'

export const Spinner = ({ top, left }: ISpinnerProps) => {
    <div
        style={{ top: `${top}px`, left: `${left}px` }}
        className="spinner-border spinner"
        role="status"
    />;
};
