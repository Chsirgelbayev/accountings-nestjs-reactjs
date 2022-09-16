import { ISpinnerProps } from '../../types/index';
import './style.css';

export const Spinner = ({ top, left }: ISpinnerProps) => {
    return (
        <div
            style={{ top: `${top}px`, left: `${left}px` }}
            className="spinner-border spinner"
            role="status"
        />
    );
};
