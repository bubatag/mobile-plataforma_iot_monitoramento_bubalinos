import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { Bubalino } from "../../types";

interface Props {
  bubalino: Bubalino;
  onPress?: () => void;
}

const icons = {
  1: {
    xml: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#11C700"/>
      <path d="M45 23c-3.5-4.5-9.5-6-14-2-4.5-4-10.5-2.5-14 2-3.5 4.5-2 11 4 16 6 5 9 7 9 7s3-2 9-7c6-5.1 7.5-11.5 4-16z" fill="#fff"/>
      <rect x="38" y="34" width="6" height="4" rx="1" fill="#fff" transform="rotate(45 41 36)" />
    </svg>
    `,
    bg: "#11C700",
  },
  2: {
    xml: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#FF3B30"/>
      <path d="M32 18v18" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="32" cy="44" r="2.5" fill="#fff"/>
    </svg>
    `,
    bg: "#FF3B30",
  },
  3: {
    xml: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#F2C400"/>
      <path d="M32 14c-6 0-12 6-12 12 0 8 12 22 12 22s12-14 12-22c0-6-6-12-12-12z" fill="#fff"/>
      <circle cx="37" cy="28" r="3" fill="#F2C400"/>
    </svg>
    `,
    bg: "#F2C400",
  },
  4: {
    xml: `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="#9CA3AF"/>
      <path d="M16 26c6-6 16-6 22 0" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <path d="M22 34c4-4 8-4 12 0" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="44" y1="20" x2="52" y2="28" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="52" y1="20" x2="44" y2="28" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
    </svg>
    `,
    bg: "#9CA3AF",
  },
};

export default function BubalinoCard({ bubalino, onPress }: Props) {
  const icon = icons[bubalino.status] || icons[4];

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="flex-row items-center justify-between bg-[#263238] rounded-3xl p-5 mb-4 shadow-lg border border-[#172022]"
    >
      <View className="flex-row items-center" style={{ gap: 24 }}>
        <View style={{ width: 72 }}>
          <Text className="text-sm text-gray-300 underline">ID</Text>
          <Text className="text-white text-2xl font-title">{bubalino.id}</Text>
        </View>

        <View style={{ width: 180 }}>
          <Text className="text-sm text-gray-300 underline">Etiqueta</Text>
          <Text className="text-white text-3xl font-title">{bubalino.n_etiqueta}</Text>
        </View>

        <View style={{ width: 72 }}>
          <Text className="text-sm text-gray-300 underline">Colar</Text>
          <Text className="text-white text-2xl">{bubalino.n_coleira}</Text>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <View style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: icon.bg,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <SvgXml xml={icon.xml} width={36} height={36} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
