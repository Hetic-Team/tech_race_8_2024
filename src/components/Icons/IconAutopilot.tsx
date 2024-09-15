import { View } from "react-native";
import Svg, { Circle, Path } from 'react-native-svg';

type IconProps = {
    size: number,
    color: string,
};

export function IconAutopilot(props: IconProps) {

    return (
        <View>
            <Svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none"
                 stroke={props.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M3.5 13h6"/>
                <Path d="m2 16 4.5-9 4.5 9"/>
                <Path d="M18 16V7"/>
                <Path d="m14 11 4-4 4 4"/>
            </Svg>
        </View>
    );
};