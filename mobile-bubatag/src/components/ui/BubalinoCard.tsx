import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { SvgProps } from "react-native-svg";
import AlertStatusIcon from "../../../assets/status/estressado.svg";
import LocationStatusIcon from "../../../assets/status/fugiu.svg";
import HealthyStatusIcon from "../../../assets/status/saudavel.svg";
import DisconnectedStatusIcon from "../../../assets/status/sem-sinal.svg";

interface BubalinoCardProps {
  id: string;
  tag: string;
  collar: string;
  status: "disconnected" | "location" | "alert" | "healthy";
  onPress?: () => void;
}

type StatusIcon = React.FC<SvgProps>;

const statusIcons: Record<BubalinoCardProps["status"], StatusIcon> = {
  healthy: HealthyStatusIcon,
  location: LocationStatusIcon,
  alert: AlertStatusIcon,
  disconnected: DisconnectedStatusIcon,
};

const statusLabels: Record<BubalinoCardProps["status"], string> = {
  healthy: "Saudavel",
  location: "Fugiu",
  alert: "Estressado",
  disconnected: "Sem sinal",
};

const statusConfig: Record<BubalinoCardProps["status"], { bgColor: string }> = {
  healthy: {
    bgColor: "rgba(6, 208, 1, 0.12)",
  },
  alert: {
    bgColor: "rgba(217, 48, 37, 0.12)",
  },
  location: {
    bgColor: "rgba(249, 171, 0, 0.12)",
  },
  disconnected: {
    bgColor: "rgba(156, 163, 175, 0.15)",
  },
};

export function BubalinoCard({ id, tag, collar, status, onPress }: BubalinoCardProps) {
  const currentStatus = statusConfig[status] || statusConfig.healthy;
  const StatusIcon = statusIcons[status] || HealthyStatusIcon;
  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      className="bg-[#27333A] rounded-2xl p-4 mb-3 border border-[#141B1F] flex-row justify-between items-center shadow-sm"
      onPress={onPress}
      activeOpacity={0.82}
    >
      <View>
        <Text className="font-title text-xl text-white mb-0.5">{tag}</Text>

        <View className="flex-row items-center gap-2">
          <Text className="font-body text-sm text-gray-400">
            ID: <Text className="font-bold text-gray-200">{id}</Text>
          </Text>
          <Text className="font-body text-sm text-gray-500">•</Text>
          <Text className="font-body text-sm text-gray-400">
            Colar: <Text className="font-bold text-gray-200">{collar}</Text>
          </Text>
        </View>
      </View>

      <View
        style={{ backgroundColor: currentStatus.bgColor }}
        className="w-12 h-12 rounded-full items-center justify-center"
        accessibilityLabel={`Status: ${statusLabels[status]}`}
      >
        <StatusIcon width={34} height={34} />
      </View>
    </CardContainer>
  );
}
