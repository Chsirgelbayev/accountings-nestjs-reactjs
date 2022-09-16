import { IAlertProps } from '../../types/index';
import './styles'

export const Alert = ({ props }: IAlertProps) => (
    <div className={`alert alert-wrapper alert-${props.alertStatus}`}>
        {props.alertText}
    </div>
);
