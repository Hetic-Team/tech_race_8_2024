import { View } from "react-native";
import Svg, { Circle, Path } from 'react-native-svg';

type IconProps = {
    size: number,
    color: string,
};

export function IconVoice(props: IconProps) {

    return (
        <View>
            <Svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <Path d="m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12"/>
                <Path d="M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5"/>
                <Circle cx="16" cy="7" r="5"/>
            </Svg>
        </View>
    );
};