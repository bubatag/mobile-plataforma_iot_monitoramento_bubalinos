import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
}

export function PrimaryButton({ title, className = "", ...props }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      className={`w-4/5 max-w-xs bg-primary rounded-lg py-4 items-center mt-6 mb-4 self-center ${className}`}
      {...props}
    >
      <Text className="text-tertiary font-title font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
}
