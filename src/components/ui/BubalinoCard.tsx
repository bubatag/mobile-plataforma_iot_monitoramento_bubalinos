import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

interface BubalinoCardProps {
  id: string;
  tag: string;
  collar: string;
  status: "disconnected" | "location" | "alert" | "healthy";
  onPress?: () => void;
}

// Ícones SVG minimalistas para cada status
const statusConfig = {
  healthy: {
    // Verde primário do Design System (#06D001) - Ícone de Check
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06D001" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    bgColor: "rgba(6, 208, 1, 0.12)",
  },
  alert: {
    // Amarelo/Laranja - Ícone de Alerta
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F9AB00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    bgColor: "rgba(249, 171, 0, 0.12)",
  },
  location: {
    // Vermelho - Ícone de Pino de Mapa (Fugiu do perímetro)
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D93025" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    bgColor: "rgba(217, 48, 37, 0.12)",
  },
  disconnected: {
    // Cinza - Ícone de Sem Sinal
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>`,
    bgColor: "rgba(156, 163, 175, 0.15)",
  },
};

export function BubalinoCard({ id, tag, collar, status, onPress }: BubalinoCardProps) {
  const currentStatus = statusConfig[status] || statusConfig.healthy;
  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      className="bg-[#27333A] rounded-2xl p-4 mb-3 border border-[#141B1F] flex-row justify-between items-center shadow-sm"
      onPress={onPress}
      activeOpacity={0.82}
    >
      
      {/* Informações de Identificação */}
      <View>
        <Text className="font-title text-xl text-white mb-0.5">
          {tag}
        </Text>
        
        <View className="flex-row items-center gap-2">
          <Text className="font-body text-sm text-gray-400">
            ID: <Text className="font-bold text-gray-200">{id}</Text>
          </Text>
          <Text className="font-body text-sm text-gray-500">•</Text>
          <Text className="font-body text-sm text-gray-400">
            Colar: <Text className="font-bold text-gray-200">#{collar}</Text>
          </Text>
        </View>
      </View>

      {/* Ícone de Status (Sem Texto) */}
      <View 
        style={{ backgroundColor: currentStatus.bgColor }}
        className="w-12 h-12 rounded-full items-center justify-center"
      >
        <SvgXml xml={currentStatus.icon} />
      </View>

    </CardContainer>
  );
}
