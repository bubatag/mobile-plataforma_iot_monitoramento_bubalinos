import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface BubalinoCardProps {
  id: string;
  tag: string;
  collar: string;
  status: "disconnected" | "location" | "alert" | "healthy";
}

const statusDefinitions = {
  disconnected: {
    background: "bg-[#4B5563]",
    icon: `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10.5C6.5 7 11.5 7 15 10.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <path d="M6.5 13C8.25 11.25 11.75 11.25 13.5 13" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <path d="M9.5 15.5C10.5 14.5 12 14.5 13 15.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 8L16 16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <path d="M16 8L8 16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
  },
  location: {
    background: "bg-[#F59E0B]",
    icon: `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3C8.68629 3 6 5.68629 6 9C6 13.5 12 21 12 21C12 21 18 13.5 18 9C18 5.68629 15.3137 3 12 3Z" stroke="#FFFFFF" stroke-width="2" stroke-linejoin="round"/>
        <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="#FFFFFF"/>
        <path d="M8 16L16 8" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <path d="M16 16L8 8" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
  },
  alert: {
    background: "bg-[#EF4444]",
    icon: `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="#FFFFFF" opacity="0.08"/>
        <path d="M12 6V13" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <path d="M12 17H12.01" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
  },
  healthy: {
    background: "bg-[#22C55E]",
    icon: `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 20.44L10.553 19.12C5.4 14.76 2 11.8 2 8.28C2 5.32 4.24 3 7.25 3C8.93 3 10.54 3.8 11.5 5.08C12.46 3.8 14.07 3 15.75 3C18.76 3 21 5.32 21 8.28C21 11.8 17.6 14.76 12.447 19.12L12.001 20.44Z" fill="#FFFFFF"/>
        <path d="M16 8.5V11.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
        <path d="M14 10.5H18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
  },
};

export function BubalinoCard({ id, tag, collar, status }: BubalinoCardProps) {
  const currentStatus = statusDefinitions[status];

  return (
    <View className="mb-4 overflow-hidden rounded-3xl border border-[#2F3E46] bg-[#1f2933] px-5 py-5 shadow-lg">
      <View className="flex-row items-center justify-between gap-4">
        <View className="flex-1">
          <View className="flex-row justify-between mb-4">
            <Text className="font-body text-gray-400 text-xs uppercase tracking-[0.18em]">ID</Text>
            <Text className="font-body text-gray-400 text-xs uppercase tracking-[0.18em]">Etiqueta</Text>
            <Text className="font-body text-gray-400 text-xs uppercase tracking-[0.18em]">Colar</Text>
          </View>

          <View className="flex-row justify-between items-end">
            <Text className="font-title text-white text-3xl">{id}</Text>
            <Text className="font-title text-white text-3xl">{tag}</Text>
            <Text className="font-title text-white text-3xl">{collar}</Text>
          </View>
        </View>

        <View className={`rounded-full p-4 ${currentStatus.background} shadow-lg`}>
          <SvgXml xml={currentStatus.icon} width={36} height={36} />
        </View>
      </View>
    </View>
  );
}
