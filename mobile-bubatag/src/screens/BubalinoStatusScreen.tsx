import { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, Defs, Line, Path, Rect, RadialGradient, Stop } from "react-native-svg";
import { SvgXml } from "react-native-svg";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import TextField from "../components/ui/TextField";

export type BubalinoStatusData = {
  id: string;
  tag: string;
  collar: string;
  status: "healthy";
  name: string;
  sex: "Macho" | "Femea";
  birthDate: string;
  pulse: number;
  temperature: number;
};

interface BubalinoStatusScreenProps {
  bubalino: BubalinoStatusData;
  onBack: () => void;
  onUpdate?: (bubalino: BubalinoStatusData) => void;
  onDelete?: (id: string) => void;
}

const sairIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 6L8.586 7.414L11.172 10H3V12H11.172L8.586 14.586L10 16L14 12L10 6Z" fill="#06D001"/>
<path d="M19 4H14V2H19C20.1046 2 21 2.89543 21 4V20C21 21.1046 20.1046 22 19 22H14V20H19V4Z" fill="#06D001"/>
</svg>`;

const editIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#06D001" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
<path d="M12 20H21"/>
<path d="M16.5 3.5C16.8978 3.10218 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04016C19.0692 3.14676 19.303 3.30302 19.5 3.5C19.697 3.69698 19.8532 3.93084 19.9598 4.18821C20.0665 4.44558 20.1213 4.72142 20.1213 5C20.1213 5.56261 19.8978 6.10217 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"/>
</svg>`;

const deleteIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1E2529" stroke-width="3.2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
<path d="M5 5L19 19"/>
<path d="M19 5L5 19"/>
</svg>`;

const backgroundBottomRight = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="351" height="351" viewBox="0 0 351 351" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M175.5 0C272.426 0 351 78.574 351 175.5C351 272.426 272.426 351 175.5 351C78.574 351 0 272.426 0 175.5C0 78.574 78.574 0 175.5 0ZM175.5 10.5479C84.3993 10.5479 10.5479 84.3993 10.5479 175.5C10.5479 266.601 84.3993 340.452 175.5 340.452C266.601 340.452 340.452 266.601 340.452 175.5C340.452 84.3993 266.601 10.5479 175.5 10.5479ZM175.691 29.0586C252.873 29.0587 315.441 91.6271 315.441 168.809C315.441 245.99 252.873 308.558 175.691 308.559C98.5096 308.559 35.9414 245.99 35.9414 168.809C35.9416 91.627 98.5097 29.0586 175.691 29.0586ZM175.691 60.7891C116.034 60.7891 67.6711 109.151 67.6709 168.809C67.6709 228.467 116.033 276.829 175.691 276.829C235.349 276.829 283.712 228.466 283.712 168.809C283.712 109.151 235.349 60.7892 175.691 60.7891Z" fill="url(#paint0_linear_2846_14175)"/>
<defs>
<linearGradient id="paint0_linear_2846_14175" x1="73" y1="15.5" x2="126.945" y2="118.393" gradientUnits="userSpaceOnUse">
<stop stop-color="#90A955"/>
<stop offset="1" stop-color="#038000"/>
</linearGradient>
</defs>
</svg>`;

const pulseSeries = [44, 46, 43, 58, 42, 47, 48, 46, 47, 45, 47, 43, 55, 42, 45, 45, 56, 42, 47, 49, 46, 47, 46, 45, 46, 48, 45, 58, 43, 56, 43, 47, 46, 49, 48, 47, 50, 42, 47];

function getPulseColor(pulse: number) {
  if (pulse < 45 || pulse > 90) return "#FF3939";
  if (pulse < 55 || pulse > 82) return "#F9AB00";
  return "#06D001";
}

function getTemperatureColor(temperature: number) {
  if (temperature < 37.5 || temperature > 40.2) return "#FF3939";
  if (temperature < 38 || temperature > 39.7) return "#F9AB00";
  return "#06D001";
}

function formatDateInput(text: string) {
  const digits = text.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function HeartIcon({ color }: { color: string }) {
  return (
    <Svg width={86} height={70} viewBox="0 0 86 70" fill="none">
      <Path
        d="M42.6 61.8C27.4 52.9 8.2 40.8 8.2 21.8C8.2 12.2 15.2 6.1 24.2 6.1C32.1 6.1 37.8 10.6 42.6 16.4C47.4 10.6 53.1 6.1 61 6.1C70 6.1 77 12.2 77 21.8C77 31.1 72.4 38.6 65.9 44.9"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M45 50H53L57 43L61 56L66 49H77"
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ThermometerIcon({ color }: { color: string }) {
  return (
    <View className="h-[132px] w-[132px] items-center justify-center rounded-full bg-[#58C832]">
      <Svg width={84} height={120} viewBox="0 0 84 120" fill="none">
        <Path
          d="M42 72V19C42 10.7 35.3 4 27 4C18.7 4 12 10.7 12 19V72C6.1 76.5 2.5 83.5 2.5 91.3C2.5 104.8 13.5 115.8 27 115.8C40.5 115.8 51.5 104.8 51.5 91.3C51.5 83.5 47.9 76.5 42 72Z"
          stroke={color}
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M27 35V92" stroke={color} strokeWidth={7} strokeLinecap="round" />
        <Circle cx={27} cy={91} r={16} stroke={color} strokeWidth={7} />
      </Svg>
    </View>
  );
}

function PulseChart({ color }: { color: string }) {
  const path = useMemo(() => {
    const width = 282;
    const height = 112;
    const min = 38;
    const max = 62;
    return pulseSeries
      .map((value, index) => {
        const x = (index / (pulseSeries.length - 1)) * width;
        const y = height - ((value - min) / (max - min)) * height;
        return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  }, []);

  return (
    <Svg width="100%" height={114} viewBox="0 0 282 114" preserveAspectRatio="none">
      <Defs>
        <RadialGradient id="chartGlow" cx="50%" cy="50%" rx="70%" ry="90%">
          <Stop offset="0%" stopColor="#425A63" stopOpacity={0.52} />
          <Stop offset="100%" stopColor="#27333A" stopOpacity={0.22} />
        </RadialGradient>
      </Defs>
      <Rect x={0} y={0} width={282} height={114} rx={24} fill="url(#chartGlow)" />
      {Array.from({ length: 26 }).map((_, index) => (
        <Line key={`v-${index}`} x1={index * 11.3} y1={0} x2={index * 11.3} y2={114} stroke="#55707A" strokeWidth={0.45} opacity={0.65} />
      ))}
      {Array.from({ length: 16 }).map((_, index) => (
        <Line key={`h-${index}`} x1={0} y1={index * 7.6} x2={282} y2={index * 7.6} stroke="#55707A" strokeWidth={0.45} opacity={0.65} />
      ))}
      <Path d={path} stroke={color} strokeWidth={1.4} fill="none" opacity={0.58} />
    </Svg>
  );
}

function InfoBox({ label, value, italic = false }: { label: string; value: string; italic?: boolean }) {
  return (
    <View className="mb-3">
      <Text className="font-body text-white text-sm mb-1 ml-2">{label}</Text>
      <View className="bg-[#26343B] rounded-lg min-h-[48px] justify-center px-3">
        <Text className={`font-body text-white text-sm ${italic ? "italic text-gray-200" : ""}`} numberOfLines={1}>
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function BubalinoStatusScreen({ bubalino, onBack, onUpdate, onDelete }: BubalinoStatusScreenProps) {
  const [info, setInfo] = useState(bubalino);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(bubalino);
  const pulseColor = getPulseColor(info.pulse);
  const temperatureColor = getTemperatureColor(info.temperature);

  const openEditModal = () => {
    setDraft(info);
    setIsEditing(true);
  };

  const confirmDelete = () => {
    Alert.alert(
      "Excluir bubalino",
      `Deseja excluir o cadastro do bubalino ${info.tag}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            onDelete?.(info.id);
            onBack();
          },
        },
      ]
    );
  };

  return (
    <View
      className="flex-1 bg-tertiary px-5"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 24 : 44 }}
    >
      <View
        style={{ position: "absolute", bottom: -100, right: -100, width: 280, height: 280, opacity: 0.5 }}
        pointerEvents="none"
      >
        <SvgXml xml={backgroundBottomRight} width="380" height="380" />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 34 }} showsVerticalScrollIndicator={false}>
        <View className="mt-8 mb-6 items-start">
          <TouchableOpacity
            className="rounded-2xl border border-primary p-3"
            onPress={onBack}
            activeOpacity={0.8}
          >
            <SvgXml xml={sairIcon} width={24} height={24} />
          </TouchableOpacity>
        </View>

        <Text className="font-title text-white text-[25px] uppercase" numberOfLines={1} adjustsFontSizeToFit>
          STATUS DO BUBALINO {info.tag}
        </Text>
        <View className="h-[2px] bg-white mt-2 mb-5 -mx-5" />

        <View className="bg-[#2B3940] rounded-[28px] px-4 pt-4 pb-3 shadow-lg border border-[#2D3B42]">
          <PulseChart color={pulseColor} />
          <View className="mt-5 flex-row items-center">
            <HeartIcon color={pulseColor} />
            <View className="ml-3 flex-row items-end">
              <View>
                <Text className="font-body text-white text-sm text-center border-b border-white px-1 mb-0.5">PULSO</Text>
                <Text className="font-body text-white text-5xl leading-[56px]">{info.pulse}</Text>
              </View>
              <Text className="font-body text-white text-lg mb-2 ml-1">BPM</Text>
            </View>
          </View>
        </View>

        <View className="mt-14 flex-row items-center">
          <ThermometerIcon color={temperatureColor} />
          <View className="ml-4">
            <Text className="font-body text-white text-xl border-b border-white pb-1">TEMPERATURA</Text>
            <Text className="font-body text-white text-6xl mt-3">
              {info.temperature.toFixed(1).replace(".", ",")}
            </Text>
          </View>
        </View>

        <View className="mt-16">
          <Text className="font-title text-white text-3xl mb-2">Informações</Text>
          <View className="h-[2px] bg-white mb-3 -mx-5" />

          <View className="flex-row">
            <View className="flex-1 pr-4">
              <InfoBox label="Nome" value={info.name || "Sem nome registrado"} italic={!info.name} />
              <InfoBox label="Número da etiqueta" value={info.tag} />
              <InfoBox label="Data Nascimento" value={info.birthDate} />
            </View>

            <View className="w-[92px]">
              <InfoBox label="Sexo" value={info.sex === "Femea" ? "Fêmea" : info.sex} />
              <InfoBox label="Colar" value={info.collar} />
              <InfoBox label="ID" value={info.id} />
            </View>

            <View className="w-[64px] items-end pt-6">
              <TouchableOpacity className="h-[48px] w-[48px] rounded-lg border-2 border-primary items-center justify-center shadow-sm" onPress={openEditModal} activeOpacity={0.8}>
                <SvgXml xml={editIcon} width={31} height={31} />
              </TouchableOpacity>
              <TouchableOpacity className="mt-9 h-[48px] w-[48px] rounded-lg bg-[#FF3939] items-center justify-center shadow-sm" onPress={confirmDelete} activeOpacity={0.82}>
                <SvgXml xml={deleteIcon} width={34} height={34} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={isEditing} transparent animationType="fade" onRequestClose={() => setIsEditing(false)}>
        <View className="flex-1 justify-center bg-black/60 px-5">
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <View className="rounded-2xl bg-[#233138] border border-primary p-5">
              <Text className="font-title text-white text-2xl mb-5">Modificar informações</Text>
              <TextField label="Nome" value={draft.name} onChangeText={(name) => setDraft((current) => ({ ...current, name }))} placeholder="Digite o nome" />
              <View className="flex-row gap-3">
                <TextField label="Etiqueta" value={draft.tag} onChangeText={(tag) => setDraft((current) => ({ ...current, tag }))} className="flex-1" />
                <TextField label="Colar" value={draft.collar} onChangeText={(collar) => setDraft((current) => ({ ...current, collar }))} className="w-24" keyboardType="number-pad" />
              </View>
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Text className="font-body text-white text-base mb-2">Sexo</Text>
                  <View className="flex-row rounded-lg bg-black/30 p-1">
                    {(["Macho", "Femea"] as const).map((sex) => (
                      <TouchableOpacity
                        key={sex}
                        className={`flex-1 rounded-md py-3 items-center ${draft.sex === sex ? "bg-primary" : ""}`}
                        onPress={() => setDraft((current) => ({ ...current, sex }))}
                      >
                        <Text className={`font-body ${draft.sex === sex ? "text-tertiary" : "text-white"}`}>
                          {sex === "Femea" ? "Fêmea" : sex}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                <View className="flex-1">
                  <Text className="font-body text-white text-base mb-2">Nascimento</Text>
                  <TextInput
                    className="w-full bg-black/30 rounded-lg p-4 text-white font-body"
                    value={draft.birthDate}
                    onChangeText={(birthDate) => setDraft((current) => ({ ...current, birthDate: formatDateInput(birthDate) }))}
                    keyboardType="number-pad"
                    maxLength={10}
                    placeholder="dd/mm/aaaa"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
              <View className="flex-row gap-3 mt-8">
                <TouchableOpacity className="flex-1 rounded-lg border border-white/50 py-4 items-center" onPress={() => setIsEditing(false)}>
                  <Text className="font-title text-white text-base">CANCELAR</Text>
                </TouchableOpacity>
                <PrimaryButton
                  title="SALVAR"
                  className="flex-1 max-w-none mt-0 mb-0"
                  onPress={() => {
                    setInfo(draft);
                    onUpdate?.(draft);
                    setIsEditing(false);
                  }}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}
