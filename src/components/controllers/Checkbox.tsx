import { StyleSheet, TouchableOpacity } from "react-native";
import Lottie from "lottie-react-native";
import { useEffect, useRef } from "react";
import { useTheme } from "react-native-paper";

type Props = {
    checked: boolean;
    onCheck: VoidFunction;
}

export function Checkbox({ checked, onCheck }: Props) {
    const firstRun = useRef(true);
    const animation = useRef<any>(null!);
    const theme = useTheme();

    useEffect(() => {
        if (firstRun.current) {
            if (!checked) {
                animation.current.play(0, 0)
            } else {
                animation.current.play(30, 30);
            }
        } else {
            if (!checked) {
                animation.current.play(30, 0);
            } else {
                animation.current.play(0, 30);
            }
        }
    }, [checked]);

    function toggleCheckbox() {
        firstRun.current = false;
        onCheck();
    }

    return (
        <TouchableOpacity onPress={toggleCheckbox}>
            <Lottie 
                ref={animation}
                source={require("../../assets/checkbox.json")}
                style={styles.animation}
                resizeMode="cover"
                autoPlay={false}
                loop={false}
                colorFilters={[
                    { keypath: "Layer 4 Outlines", color: theme.colors.primary },
                    { keypath: "Layer 4 Outlines 2", color: theme.colors.primary },
                ]}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    animation: {
        height: 80,
        width: 40
    }
});