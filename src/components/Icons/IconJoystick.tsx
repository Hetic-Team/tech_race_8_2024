import { View } from "react-native";
import Svg, { Path, Circle } from 'react-native-svg';

type IconProps = {
    size: number,
    color: string,
};

export function IconJoystick(props: IconProps) {

    return (
        <View>
            <Svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke={props.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z"/>
                <Path d="M6 15v-2"/>
                <Path d="M12 15V9"/>
                <Circle cx="12" cy="6" r="3"/>
            </Svg>
        </View>
    );
};

{/* <Svg width={props.size} height={props.size} viewBox="0 0 887 887" fill="none" >
<Path d="M443.5 872C680.154 872 872 680.154 872 443.5C872 206.846 680.154 15 443.5 15C206.846 15 15 206.846 15 443.5C15 680.154 206.846 872 443.5 872Z" stroke={props.color} stroke-width="1000"/>
<Path d="M443.5 562.773C509.373 562.773 562.773 509.373 562.773 443.5C562.773 377.627 509.373 324.227 443.5 324.227C377.627 324.227 324.227 377.627 324.227 443.5C324.227 509.373 377.627 562.773 443.5 562.773Z" stroke={props.color} stroke-width={props.size}/>
<Path d="M492.976 183.749L444.384 139.574L401.092 183.749M160.778 392.257L119.254 444.384L160.778 493.86M752.727 392.257L792.485 444.384L752.727 493.86M492.976 720.037L444.384 763.329L401.092 720.037M420.529 494.743V392.257L492.976 441.733L420.529 494.743Z" stroke={props.color} />
</Svg> */}