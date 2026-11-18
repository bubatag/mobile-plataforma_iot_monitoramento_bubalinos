import { Text, TouchableOpacity, TouchableOpacityProps, View, StyleSheet } from "react-native";
import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
}

export function PrimaryButton({ title, className = "", ...props }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      className={`w-4/5 max-w-xs rounded-lg py-4 items-center justify-center mt-6 mb-4 self-center overflow-hidden relative ${className}`}
      {...props}
    >
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient 
              id="buttonGradient" 
              cx="50%" cy="50%" 
              rx="100%" ry="100%" 
              fx="50%" fy="50%"
            >
              <Stop offset="0%" stopColor="#06D001" stopOpacity={1} />
              <Stop offset="100%" stopColor="#04A600" stopOpacity={1} />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#buttonGradient)" />
        </Svg>
      </View>

      <Text className="text-tertiary font-title font-bold text-lg">
        {title}
      </Text>
    </TouchableOpacity>
  );
}