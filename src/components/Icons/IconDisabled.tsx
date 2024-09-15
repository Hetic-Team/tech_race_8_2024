import { View } from "react-native";
import Svg, { Circle, Path } from 'react-native-svg';

type IconProps = {
    size: number,
    color: string,
};

export function IconDisabled(props: IconProps) {

    return (
        <View>
            <Svg width={props.size} height={props.size}  viewBox="0 0 24 24" fill="none"
                 stroke={props.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 >
                <Circle cx="12" cy="12" r="10"/>
                <Path d="m4.9 4.9 14.2 14.2"/>
            </Svg>
        </View>
    );
};