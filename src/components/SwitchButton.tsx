import { Switch } from 'react-native';
import {Colors} from '../constants/Colors';

type SwitchButtonProps = {
    isActive: boolean,
    onClick: () => void,
};

export function SwitchButton(props: SwitchButtonProps) {

return (
    <Switch
        trackColor={{false: '#767577', true: Colors.dark.placeholder}}
        thumbColor={props.isActive ? Colors.dark.primaryGreen : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.onClick}
        value={props.isActive}
    />
    );
};