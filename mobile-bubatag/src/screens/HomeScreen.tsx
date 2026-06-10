import { useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Platform, StatusBar, ScrollView } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { SvgXml } from "react-native-svg";
import Animated, { FadeInDown, FadeOut, Layout } from "react-native-reanimated";
import AddBubalinoIcon from "../../assets/adicionar-bufalo.svg";
import MapBuffaloIcon from "../../assets/bufalo-mapa-pin.svg";
import { BubalinoCard } from "../components/ui/BubalinoCard";
import type { BubalinoStatusData } from "./BubalinoStatusScreen";

type BubalinoItem = {
  id: string;
  tag: string;
  collar: string;
  status: "disconnected" | "location" | "alert" | "healthy";
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

const initialBubalinos: BubalinoItem[] = [
  {
    id: "4",
    tag: "BC75",
    collar: "CL-103",
    status: "disconnected",
    coordinate: { latitude: -24.58775, longitude: -47.88855 },
  },
  {
    id: "3",
    tag: "JI44",
    collar: "CL-102",
    status: "location",
    coordinate: { latitude: -24.586860, longitude: -47.886931 },
  },
  {
    id: "2",
    tag: "TA19",
    collar: "CL-101",
    status: "alert",
    coordinate: { latitude: -24.58678, longitude: -47.88892 },
  },
  {
    id: "1",
    tag: "TE18",
    collar: "CL-100",
    status: "healthy",
    coordinate: { latitude: -24.58795, longitude: -47.88762 },
  },
];

const sairIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 6L8.586 7.414L11.172 10H3V12H11.172L8.586 14.586L10 16L14 12L10 6Z" fill="#06D001"/>
<path d="M19 4H14V2H19C20.1046 2 21 2.89543 21 4V20C21 21.1046 20.1046 22 19 22H14V20H19V4Z" fill="#06D001"/>
</svg>`;

const searchIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.888916 16.8889L4.00003 13.7778M4.44447 7.11111C4.44447 7.92822 4.60541 8.73733 4.91811 9.49225C5.23081 10.2472 5.68913 10.9331 6.26692 11.5109C6.84471 12.0887 7.53064 12.547 8.28555 12.8597C9.04047 13.1724 9.84958 13.3333 10.6667 13.3333C11.4838 13.3333 12.2929 13.1724 13.0478 12.8597C13.8027 12.547 14.4887 12.0887 15.0665 11.5109C15.6443 10.9331 16.1026 10.2472 16.4153 9.49225C16.728 8.73733 16.8889 7.92822 16.8889 7.11111C16.8889 5.46087 16.2334 3.87823 15.0665 2.71133C13.8996 1.54444 12.3169 0.888885 10.6667 0.888885C9.01646 0.888885 7.43381 1.54444 6.26692 2.71133C5.10003 3.87823 4.44447 5.46087 4.44447 7.11111Z" stroke="#AAAAAA" stroke-opacity="0.72" stroke-width="1.78" stroke-linecap="round"/>
</svg>`;

interface HomeScreenProps {
  onLogout?: () => void;
  onAddBubalino?: () => void;
  onOpenBubalinoStatus?: (bubalino: BubalinoStatusData) => void;
  deletedBubalinoIds?: string[];
}

export default function HomeScreen({
  onLogout,
  onAddBubalino,
  onOpenBubalinoStatus,
  deletedBubalinoIds = [],
}: HomeScreenProps) {
  const [searchText, setSearchText] = useState("");
  const [bubalinos, setBubalinos] = useState(initialBubalinos);
  const [nextMockId, setNextMockId] = useState(5);
  const mapRef = useRef<MapView>(null);

  const farmMapCenter = {
    latitude: -24.58755,
    longitude: -47.88842,
  };

  const geofenceCoordinates = [
    { latitude: -24.586566, longitude: -47.890521 },
    { latitude: -24.586383, longitude: -47.887572 },
    { latitude: -24.587845, longitude: -47.886824 },
    { latitude: -24.588641, longitude: -47.888166 },
  ];

  const filteredBubalinos = useMemo(
    () =>
      bubalinos.filter((item) => {
        if (deletedBubalinoIds.includes(item.id)) {
          return false;
        }

        const query = searchText.toLowerCase().trim();
        if (!query) {
          return true;
        }

        return (
          item.id.includes(query) ||
          item.tag.toLowerCase().includes(query) ||
          item.collar.includes(query)
        );
      }),
    [bubalinos, searchText, deletedBubalinoIds]
  );

  const statusCycle: BubalinoItem["status"][] = ["healthy", "disconnected", "location", "alert"];

  const focusFarmArea = () => {
    mapRef.current?.animateCamera(
      {
        center: farmMapCenter,
        zoom: 17.0,
        pitch: 0,
        heading: 0,
      },
      { duration: 250 }
    );
  };

  const markerIconSize = { width: 65, height: 49 };

  const handleAddMockBubalino = () => {
    const newIndex = nextMockId;
    const newStatus = statusCycle[newIndex % statusCycle.length];

    const newBubalino: BubalinoItem = {
      id: String(newIndex),
      tag: `NEW${String(newIndex).padStart(2, "0")}`,
      collar: `CL-${String(99 + newIndex).padStart(3, "0")}`,
      status: newStatus,
      coordinate: {
        latitude: -24.5875 + (Math.random() - 0.5) * 0.0012,
        longitude: -47.8884 + (Math.random() - 0.5) * 0.0012,
      },
    };

    setBubalinos((current) => [newBubalino, ...current]);
    setNextMockId(newIndex + 1);
    onAddBubalino?.();
  };

  const openBubalinoStatus = (item: BubalinoItem) => {
    const vitalSignsByStatus: Partial<Record<BubalinoItem["status"], Pick<BubalinoStatusData, "pulse" | "temperature">>> = {
      healthy: { pulse: 72, temperature: 39 },
      alert: { pulse: 96, temperature: 40.6 },
      location: { pulse: 58, temperature: 38.2 },
    };

    onOpenBubalinoStatus?.({
      id: item.id,
      tag: item.tag,
      collar: item.collar,
      status: item.status,
      name: "",
      sex: "Macho",
      birthDate: "14/03/2024",
      ...vitalSignsByStatus[item.status],
    });
  };

  return (
    <View
      className="flex-1 bg-tertiary px-4"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 24 : 44 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View className="mt-8 mb-6 items-start">
          <TouchableOpacity
            className="rounded-2xl border border-primary bg-[#1f2933] p-3"
            onPress={onLogout}
            activeOpacity={0.8}
          >
            <SvgXml xml={sairIcon} width={24} height={24} />
          </TouchableOpacity>
        </View>

        <View className="mb-6">
          <View className="self-start bg-[#3B4950] border-t-2 border-l-2 border-r-2 border-primary rounded-t-2xl px-5 py-2 -mb-[2px] ml-4 z-10">
            <Text className="font-title text-white text-lg uppercase tracking-wide" numberOfLines={1}>
              LOCALIZACAO DOS BUBALINOS
            </Text>
          </View>

          <View className="overflow-hidden rounded-3xl border-2 border-[#2F3E46] bg-[#1f2933] shadow-lg" style={{ height: 260 }}>
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
              mapType="satellite"
              onMapReady={focusFarmArea}
              onLayout={focusFarmArea}
              initialRegion={{
                latitude: farmMapCenter.latitude,
                longitude: farmMapCenter.longitude,
                latitudeDelta: 0.00105,
                longitudeDelta: 0.00135,
              }}
            >
              <Polygon
                coordinates={geofenceCoordinates}
                strokeColor="#06D001"
                fillColor="rgba(6, 208, 1, 0.18)"
                strokeWidth={2}
              />
              {bubalinos.map((bubalino) => (
                <Marker
                  key={bubalino.id}
                  coordinate={bubalino.coordinate}
                  title={bubalino.tag}
                  anchor={{ x: 0.5, y: 0.5 }}
                >
                  <View collapsable={false} pointerEvents="none" style={{ width: 35, height: 35 }}>
                    <MapBuffaloIcon width={35} height={35} />
                  </View>
                </Marker>
              ))}
            </MapView>
          </View>
        </View>

        <View className="flex-row items-center gap-3 mb-4">
          <View className="flex-1 flex-row items-center rounded-2xl border border-primary bg-[#1f2933] px-4 py-3">
            <SvgXml xml={searchIcon} width={18} height={18} />
            <TextInput
              className="ml-3 flex-1 text-white font-body text-base"
              placeholder="Insira aqui o codigo no animal"
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
              underlineColorAndroid="transparent"
            />
          </View>

          <TouchableOpacity
            className="rounded-2xl border border-primary bg-[#1f2933] p-4"
            activeOpacity={0.8}
            onPress={handleAddMockBubalino}
          >
            <AddBubalinoIcon width={36} height={36} />
          </TouchableOpacity>
        </View>

        {filteredBubalinos.length > 0 ? (
          <View>
            {filteredBubalinos.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(index * 50)}
                exiting={FadeOut.duration(200)}
                layout={Layout.springify().damping(14)}
              >
                <BubalinoCard
                  id={item.id}
                  tag={item.tag}
                  collar={item.collar}
                  status={item.status}
                  onPress={() => openBubalinoStatus(item)}
                />
              </Animated.View>
            ))}
          </View>
        ) : (
          <View className="items-center justify-center py-20">
            <Text className="font-body text-gray-400 text-lg italic text-center">
              (Nenhum bubalino encontrado)
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
