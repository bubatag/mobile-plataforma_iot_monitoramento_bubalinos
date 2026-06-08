import { useMemo, useState, type FC } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Defs, Rect, RadialGradient, Stop } from "react-native-svg";
import { SvgXml } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
import { CartesianChart, Line as VictoryLine } from "victory-native";
import YellowHeartIcon from "../../assets/status/coracao-amarelo.svg";
import GreenHeartIcon from "../../assets/status/coracao-verde.svg";
import RedHeartIcon from "../../assets/status/coracao-vermelho.svg";
import DisconnectedIcon from "../../assets/status/sem-sinal.svg";
import YellowThermometerIcon from "../../assets/status/termometro-amarelo.svg";
import GreenThermometerIcon from "../../assets/status/termometro-verde.svg";
import RedThermometerIcon from "../../assets/status/termometro-vermelho.svg";

export type BubalinoStatusData = {
  id: string;
  tag: string;
  collar: string;
  status: "healthy" | "alert" | "location" | "disconnected";
  name: string;
  sex: "Macho" | "Femea";
  birthDate: string;
  pulse?: number;
  temperature?: number;
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

const heartIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="71" height="62" viewBox="0 0 71 62" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M48.5248 52.0397C43.8416 55.4767 39.1534 57.9841 35.4678 59.2087C23.8675 55.3541 2.32397 38.7822 2.32397 20.5531C2.32397 10.4856 10.4856 2.32398 20.5531 2.32398C26.7178 2.32398 32.17 5.38481 35.4678 10.0697C37.149 7.67569 39.3822 5.7219 41.9783 4.37364C44.5745 3.02537 47.4572 2.32232 50.3825 2.32398C60.45 2.32398 68.6116 10.4856 68.6116 20.5531C68.6116 23.4482 68.0681 26.3002 67.1086 29.0661" stroke="#06D001" stroke-width="4.64776" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M40.4392 38.7821H47.068L52.0396 32.1533L57.0111 45.4109L61.9197 38.7821H68.6115" stroke="#06D001" stroke-width="4.64776" stroke-linecap="round" stroke-linejoin="round"/>
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

const thermometerIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="139" height="141" viewBox="0 0 139 141" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M139 69.5C139 107.884 107.884 139 69.5 139C31.1162 139 0 107.884 0 69.5C0 31.1162 31.1162 0 69.5 0C107.884 0 139 31.1162 139 69.5ZM16.4432 69.5C16.4432 98.8024 40.1976 122.557 69.5 122.557C98.8024 122.557 122.557 98.8024 122.557 69.5C122.557 40.1976 98.8024 16.4432 69.5 16.4432C40.1976 16.4432 16.4432 40.1976 16.4432 69.5Z" fill="url(#paint0_radial_3289_15221)"/>
<g filter="url(#filter0_d_3289_15221)">
<path d="M69.3033 128C84.3381 128 96.5531 115.783 96.5531 100.748C96.5531 92.8118 93.2655 85.869 87.0511 80.2315C85.904 79.1869 85.6434 78.6122 85.6434 77.0463L85.7481 30.1666C85.7481 19.2568 79.1172 12 69.3033 12C59.436 12 52.805 19.2568 52.805 30.1666L52.8585 77.0463C52.8585 78.6122 52.5979 79.1869 51.4998 80.2315C45.2364 85.869 42 92.8118 42 100.746C42 115.781 54.1615 128 69.3033 128ZM69.3033 120.425C58.4448 120.425 49.6221 111.551 49.6221 100.746C49.6221 94.2195 52.7026 88.3214 58.2354 84.615C59.8547 83.5169 60.4806 82.5257 60.4806 80.3852V30.4806C60.4806 23.9031 64.0823 19.6733 69.3011 19.6733C74.4708 19.6733 78.0213 23.9031 78.0213 30.4806V80.3874C78.0213 82.5279 78.6472 83.5191 80.2665 84.615C85.7993 88.3236 88.8798 94.2217 88.8798 100.748C88.8798 111.553 80.1083 120.429 69.3011 120.429M69.2498 113.384C70.9138 113.385 72.5617 113.058 74.0987 112.42C75.6356 111.782 77.0313 110.847 78.2055 109.668C79.3796 108.489 80.309 107.089 80.9403 105.55C81.5715 104.01 81.8921 102.361 81.8836 100.697C81.8836 95.7898 79.1172 91.7694 75.0967 89.5776C73.4262 88.6911 72.8515 88.063 72.8515 85.506V57.7839C72.8515 55.0665 71.2857 53.4494 69.2498 53.4494C67.2675 53.4494 65.6482 55.0687 65.6482 57.7839V85.5015C65.6482 88.0585 65.0735 88.6866 63.403 89.5731C59.3847 91.7649 56.6161 95.7876 56.6161 100.692C56.6076 102.356 56.9282 104.005 57.5594 105.545C58.1906 107.085 59.12 108.484 60.2942 109.664C61.4683 110.843 62.864 111.778 64.401 112.416C65.9379 113.053 67.5858 113.381 69.2498 113.379" fill="url(#paint1_linear_3289_15221)"/>
</g>
<defs>
<filter id="filter0_d_3289_15221" x="32.7633" y="5.88166" width="73.0266" height="134.473" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="3.11834"/>
<feGaussianBlur stdDeviation="3.11834"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3289_15221"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3289_15221" result="shape"/>
</filter>
<radialGradient id="paint0_radial_3289_15221" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(69.5 69.5) rotate(-90) scale(104)">
<stop stop-color="#06D001"/>
<stop offset="1" stop-color="#90A955"/>
</radialGradient>
<linearGradient id="paint1_linear_3289_15221" x1="69.2766" y1="-47.5" x2="69.2766" y2="2" gradientUnits="userSpaceOnUse">
<stop stop-color="#036A01" stop-opacity="0"/>
<stop offset="1" stop-color="#06D001"/>
</linearGradient>
</defs>
</svg>`;

const pulseSeries = [44, 46, 43, 58, 42, 47, 48, 46, 47, 45, 47, 43, 55, 42, 45, 45, 56, 42, 47, 49, 46, 47, 46, 45, 46, 48, 45, 58, 43, 56, 43, 47, 46, 49, 48, 47, 50, 42, 47];
const pulseChartData = pulseSeries.map((pulse, index) => ({
  time: index + 1,
  pulse,
}));

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

type StatusVisualConfig = {
  accentColor: string;
  heartIcon: FC<SvgProps>;
  thermometerIcon: FC<SvgProps>;
};

const statusVisualConfig: Record<Exclude<BubalinoStatusData["status"], "disconnected">, StatusVisualConfig> = {
  healthy: {
    accentColor: "#06D001",
    heartIcon: GreenHeartIcon,
    thermometerIcon: GreenThermometerIcon,
  },
  alert: {
    accentColor: "#FF3939",
    heartIcon: RedHeartIcon,
    thermometerIcon: RedThermometerIcon,
  },
  location: {
    accentColor: "#F9AB00",
    heartIcon: YellowHeartIcon,
    thermometerIcon: YellowThermometerIcon,
  },
};

function PulseChart({ color }: { color: string }) {
  const domain = useMemo(() => ({ x: [1, pulseSeries.length] as [number, number], y: [38, 62] as [number, number] }), []);

  return (
    <View className="h-[132px] overflow-hidden rounded-3xl border border-[#3A4A52] bg-[#26343B]">
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="chartGlow" cx="50%" cy="45%" rx="76%" ry="92%">
              <Stop offset="0%" stopColor="#425A63" stopOpacity={0.56} />
              <Stop offset="100%" stopColor="#253139" stopOpacity={0.24} />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#chartGlow)" />
        </Svg>
      </View>
      <View className="flex-1 px-1.5 py-2">
        <CartesianChart
          data={pulseChartData}
          xKey="time"
          yKeys={["pulse"]}
          domain={domain}
          padding={{ left: 8, right: 8, top: 14, bottom: 10 }}
          axisOptions={{
            lineColor: {
              grid: { x: "#55707A8F", y: "#55707A8F" },
              frame: "#3A4A52",
            },
            lineWidth: { grid: { x: 0.45, y: 0.45 }, frame: 0 },
            tickCount: { x: 8, y: 5 },
            labelColor: "transparent",
          }}
        >
          {({ points }) => (
            <VictoryLine
              points={points.pulse}
              color={color}
              strokeWidth={2.4}
              strokeCap="round"
              strokeJoin="round"
              curveType="natural"
              opacity={0.88}
            />
          )}
        </CartesianChart>
      </View>
    </View>
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

function ModalField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "number-pad";
}) {
  return (
    <View className="mb-6">
      <Text className="font-body text-white text-base mb-2">{label}</Text>
      <TextInput
        className="w-full bg-black/30 rounded-lg p-4 text-white font-body"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
      />
    </View>
  );
}

function ModalSaveButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      className="flex-1 h-[56px] rounded-lg items-center justify-center overflow-hidden"
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <Svg width="100%" height="100%">
          <Defs>
            <RadialGradient id="modalSaveGradient" cx="50%" cy="50%" rx="100%" ry="100%">
              <Stop offset="0%" stopColor="#06D001" stopOpacity={1} />
              <Stop offset="100%" stopColor="#04A600" stopOpacity={1} />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#modalSaveGradient)" />
        </Svg>
      </View>
      <Text className="text-tertiary font-title font-bold text-lg">SALVAR</Text>
    </TouchableOpacity>
  );
}

export default function BubalinoStatusScreen({ bubalino, onBack, onUpdate, onDelete }: BubalinoStatusScreenProps) {
  const [info, setInfo] = useState(bubalino);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(bubalino);
  const isDisconnected = info.status === "disconnected";
  const pulse = info.pulse ?? 0;
  const temperature = info.temperature ?? 0;
  const visualConfig = isDisconnected
    ? statusVisualConfig.healthy
    : statusVisualConfig[info.status as Exclude<BubalinoStatusData["status"], "disconnected">];
  const HeartStatusIcon = visualConfig.heartIcon;
  const ThermometerStatusIcon = visualConfig.thermometerIcon;
  const pulseColor = isDisconnected ? visualConfig.accentColor : getPulseColor(pulse);

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
            className="rounded-2xl border border-primary bg-[#1f2933] p-3"
            onPress={onBack}
            activeOpacity={0.8}
          >
            <SvgXml xml={sairIcon} width={24} height={24} />
          </TouchableOpacity>
        </View>

        <View>
          <Text className="font-title text-white text-[25px] uppercase" numberOfLines={1} adjustsFontSizeToFit>
            STATUS DO BUBALINO {info.tag}
          </Text>
          <View className="h-[2px] bg-white mt-2 mb-5 -mx-5" />
        </View>

        {isDisconnected ? (
          <View className="bg-[#2B3940] rounded-[28px] px-5 py-6 shadow-lg border border-[#2D3B42]">
            <View className="flex-row items-center">
              <View className="h-[64px] w-[64px] rounded-2xl bg-white/10 items-center justify-center border border-white/10">
                <DisconnectedIcon width={42} height={42} />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-title text-white text-2xl" numberOfLines={1} adjustsFontSizeToFit>
                  Perda de conexão
                </Text>
                <View className="h-[2px] bg-white/80 mt-2" />
              </View>
            </View>
            <Text className="font-body text-white text-lg leading-7 mt-6">
              A conexão Bubalino de ID {info.id} da coleira {info.collar} infelizmente foi perdida.
            </Text>
          </View>
        ) : (
          <>
            <View className="bg-[#2B3940] rounded-[28px] px-4 pt-4 pb-3 shadow-lg border border-[#2D3B42]">
              <PulseChart color={pulseColor} />
              <View className="mt-5 flex-row items-center">
                <HeartStatusIcon width={86} height={70} />
                <View className="ml-3 flex-row items-end">
                  <View>
                    <Text className="font-body text-white text-sm text-center border-b border-white px-1 mb-0.5">PULSO</Text>
                    <Text className="font-body text-white text-5xl leading-[56px]">{pulse}</Text>
                  </View>
                  <Text className="font-body text-white text-lg mb-2 ml-1">BPM</Text>
                </View>
              </View>
            </View>

            <View className="mt-14 flex-row items-center">
              <ThermometerStatusIcon width={139} height={141} />
              <View className="ml-4">
                <Text className="font-body text-white text-xl border-b border-white pb-1">TEMPERATURA</Text>
                <Text className="font-body text-white text-6xl mt-3">
                  {temperature.toFixed(1).replace(".", ",")}
                </Text>
              </View>
            </View>
          </>
        )}

        <View className="mt-16">
          <Text className="font-title text-white text-3xl mb-2">Informações</Text>
          <View className="h-[2px] bg-white mb-3 -mx-5" />

          <View className="flex-row">
            <View className="flex-1 pr-4">
              <InfoBox label="Nome" value={info.name || "Sem nome registrado"} italic={!info.name} />
              <InfoBox label="Número da Tag" value={info.tag} />
              <InfoBox label="Data Nascimento" value={info.birthDate} />
            </View>

            <View className="w-[92px]">
              <InfoBox label="Sexo" value={info.sex === "Femea" ? "Fêmea" : info.sex} />
              <InfoBox label="Colar" value={info.collar} />
              <InfoBox label="ID" value={info.id} />
            </View>

            <View className="w-[64px] items-end pt-6">
              <TouchableOpacity className="h-[48px] w-[48px] rounded-lg border-2 border-primary bg-[#1f2933] items-center justify-center shadow-sm" onPress={openEditModal} activeOpacity={0.8}>
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
              <ModalField
                label="Nome"
                value={draft.name}
                onChangeText={(name) => setDraft((current) => ({ ...current, name }))}
                placeholder="Digite o nome"
              />
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <ModalField
                    label="Tag"
                    value={draft.tag}
                    onChangeText={(tag) => setDraft((current) => ({ ...current, tag }))}
                  />
                </View>
                <View className="w-24">
                  <ModalField
                    label="Colar"
                    value={draft.collar}
                    onChangeText={(collar) => setDraft((current) => ({ ...current, collar }))}
                    keyboardType="number-pad"
                  />
                </View>
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
                    onChangeText={(birthDate) => setDraft((current) => ({ ...current, birthDate }))}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
              <View className="flex-row gap-3 mt-6">
                <TouchableOpacity className="flex-1 h-[56px] rounded-lg border border-white/50 items-center justify-center" onPress={() => setIsEditing(false)}>
                  <Text className="font-title text-white text-base">CANCELAR</Text>
                </TouchableOpacity>
                <ModalSaveButton
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