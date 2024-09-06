import { View } from "react-native";
import Svg, { Path, Circle } from 'react-native-svg';

type IconProps = {
    size: number,
    color: string,
};

export function IconJoystick(props: IconProps) {

    return (
        <View>
        <Svg width={props.size} height={props.size} viewBox="0 0 20 20" fill="none">
            <Path d="M19 15C19 14.4696 18.7893 13.9609 18.4142 13.5858C18.0391 13.2107 17.5304 13 17 13H3C2.46957 13 1.96086 13.2107 1.58579 13.5858C1.21071 13.9609 1 14.4696 1 15V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V15Z" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M4 13V11" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M10 13V7" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M10 7C11.6569 7 13 5.65685 13 4C13 2.34315 11.6569 1 10 1C8.34315 1 7 2.34315 7 4C7 5.65685 8.34315 7 10 7Z" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
        </View>
    );
};

{/* <Svg width={props.size} height={props.size} viewBox="0 0 887 887" fill="none" >
<Path d="M443.5 872C680.154 872 872 680.154 872 443.5C872 206.846 680.154 15 443.5 15C206.846 15 15 206.846 15 443.5C15 680.154 206.846 872 443.5 872Z" stroke={props.color} stroke-width="1000"/>
<Path d="M443.5 562.773C509.373 562.773 562.773 509.373 562.773 443.5C562.773 377.627 509.373 324.227 443.5 324.227C377.627 324.227 324.227 377.627 324.227 443.5C324.227 509.373 377.627 562.773 443.5 562.773Z" stroke={props.color} stroke-width={props.size}/>
<Path d="M492.976 183.749L444.384 139.574L401.092 183.749M160.778 392.257L119.254 444.384L160.778 493.86M752.727 392.257L792.485 444.384L752.727 493.86M492.976 720.037L444.384 763.329L401.092 720.037M420.529 494.743V392.257L492.976 441.733L420.529 494.743Z" stroke={props.color} />
</Svg> */}
