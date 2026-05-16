import { useState, useRef } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import TextField from "../components/ui/TextField";
import { PrimaryButton } from "../components/ui/PrimaryButton";

const sairIcon = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 6L8.586 7.414L11.172 10H3V12H11.172L8.586 14.586L10 16L14 12L10 6Z" fill="#06D001"/>
<path d="M19 4H14V2H19C20.1046 2 21 2.89543 21 4V20C21 21.1046 20.1046 22 19 22H14V20H19V4Z" fill="#06D001"/>
</svg>`;

const colarOptions = ["Colar A", "Colar B", "Colar C", "Colar D", "Colar E", "Colar F", "Colar G", "Colar H", "Colar I", "Colar J"];

interface RegisterBubalinoScreenProps {
  onBack: () => void;
}

export default function RegisterBubalinoScreen({ onBack }: RegisterBubalinoScreenProps) {
  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState<"Macho" | "Fêmea" | "">("");
  const [nascimento, setNascimento] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [colar, setColar] = useState("");
  const [isCollarOpen, setIsCollarOpen] = useState(false);

  // Animated values
  const dropdownAnim = useRef(new Animated.Value(0)).current; // 0 = fechado, 1 = aberto
  const arrowAnim = useRef(new Animated.Value(0)).current;

  const handleNascimentoChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, 8);
    if (!digits) {
      setNascimento("");
      return;
    }

    let formatted = digits;
    if (digits.length > 2) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    if (digits.length > 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    }
    setNascimento(formatted);
  };

  const openDropdown = () => {
    setIsCollarOpen(true);
    Animated.parallel([
      Animated.spring(dropdownAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 60,
        friction: 10,
      }),
      Animated.timing(arrowAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDropdown = () => {
    Animated.parallel([
      Animated.timing(dropdownAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(arrowAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => setIsCollarOpen(false));
  };

  const toggleCollar = () => {
    if (isCollarOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  // Interpolações
  const dropdownTranslateY = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  const dropdownOpacity = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const dropdownScale = dropdownAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1],
  });

  const arrowRotation = arrowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View
      className="flex-1 bg-tertiary px-4"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 24 : 44 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }} keyboardShouldPersistTaps="handled">

          {/* Botão de Sair (Topo) */}
          <View className="mt-8 mb-6 items-start">
            <TouchableOpacity
              className="rounded-2xl border border-primary p-3"
              onPress={onBack}
              activeOpacity={0.8}
            >
              <SvgXml xml={sairIcon} width={24} height={24} />
            </TouchableOpacity>
          </View>

          {/* Título */}
          <View className="w-full mb-8 items-center justify-center">
            <Text className="font-title text-white text-3xl uppercase tracking-widest text-center">
              Cadastre o
            </Text>
            <Text className="font-title text-white text-6xl uppercase tracking-wide text-center mt-[-4px]">
              Bubalino
            </Text>
          </View>

          {/* Formulário */}
          <View className="rounded-3xl border border-[#2F3E46] bg-[#1f2933] p-5 shadow-lg w-full">
            <TextField
              label="Nome (opcional)"
              placeholder="Digite aqui o nome"
              value={nome}
              onChangeText={setNome}
            />

            <View className="flex-row gap-3 mb-5">
              <View className="flex-1">
                <Text className="font-body text-white text-base mb-2">Sexo</Text>
                <View className="flex-row rounded-2xl border border-secondary bg-black/20 p-2">
                  {(["Macho", "Fêmea"] as const).map((option) => {
                    const isActive = sexo === option;
                    return (
                      <TouchableOpacity
                        key={option}
                        onPress={() => setSexo(option)}
                        activeOpacity={0.8}
                        className={`flex-1 rounded-2xl border px-3 py-3 items-center justify-center ${
                          isActive
                            ? "border-primary bg-[#052a07]"
                            : "border-transparent bg-black/30"
                        }`}
                      >
                        <Text className={`font-body text-base ${isActive ? "text-white" : "text-gray-300"}`} numberOfLines={1}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View className="w-1/2">
                <TextField
                  label="Nascimento"
                  placeholder="dd/mm/aaaa"
                  value={nascimento}
                  onChangeText={handleNascimentoChange}
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>
            </View>

            <View className="flex-row gap-3">
              <TextField
                label="Número da etiqueta"
                placeholder="Digite aqui o número"
                value={etiqueta}
                onChangeText={setEtiqueta}
                keyboardType="numeric"
                className="flex-1"
              />

              {/* Dropdown do Colar */}
              <View className="w-1/2 mb-6">
                <Text className="font-body text-white text-base mb-2">Selecione o colar</Text>
                <View style={{ position: "relative" }}>

                  {/* Botão trigger */}
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: isCollarOpen ? "#06D001" : "#2F3E46",
                      backgroundColor: "rgba(0,0,0,0.3)",
                      paddingHorizontal: 16,
                      paddingVertical: 16,
                    }}
                    onPress={toggleCollar}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={{
                        fontFamily: "body",
                        fontSize: 16,
                        color: colar ? "#ffffff" : "#9ca3af",
                        flex: 1,
                      }}
                      numberOfLines={1}
                    >
                      {colar || "Selecione"}
                    </Text>

                    {/* Seta animada */}
                    <Animated.Text
                      style={{
                        color: isCollarOpen ? "#06D001" : "#ffffff",
                        fontSize: 18,
                        transform: [{ rotate: arrowRotation }],
                      }}
                    >
                      ▾
                    </Animated.Text>
                  </TouchableOpacity>

                  {/* Dropdown animado */}
                  {isCollarOpen && (
                    <>
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: 0, left: 0, right: 0, bottom: 0,
                          zIndex: 40,
                        }}
                        onPress={closeDropdown}
                        activeOpacity={1}
                      />
                      <Animated.View
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          marginTop: 8,
                          borderRadius: 16,
                          borderWidth: 1,
                          borderColor: "#2F3E46",
                          backgroundColor: "#122023",
                          overflow: "hidden",
                          zIndex: 50,
                          opacity: dropdownOpacity,
                          transform: [
                            { translateY: dropdownTranslateY },
                            { scale: dropdownScale },
                          ],
                          // Sombra moderna
                          shadowColor: "#06D001",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.15,
                          shadowRadius: 12,
                          elevation: 1,
                        }}
                      >
                        <ScrollView style={{ maxHeight: 150 }} nestedScrollEnabled>
                          {colarOptions.map((option, index) => {
                            const isSelected = colar === option;
                            return (
                              <TouchableOpacity
                                key={option}
                                style={{
                                  paddingHorizontal: 16,
                                  paddingVertical: 12,
                                  borderBottomWidth: index < colarOptions.length - 1 ? 1 : 0,
                                  borderBottomColor: "#2F3E46",
                                  backgroundColor: isSelected ? "rgba(6,208,1,0.08)" : "transparent",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                                onPress={() => {
                                  setColar(option);
                                  closeDropdown();
                                }}
                                activeOpacity={0.8}
                              >
                                <Text
                                  style={{
                                    color: isSelected ? "#06D001" : "#ffffff",
                                    fontSize: 16,
                                    fontFamily: "body",
                                  }}
                                  numberOfLines={1}
                                >
                                  {option}
                                </Text>
                                {isSelected && (
                                  <Text style={{ color: "#06D001", fontSize: 14 }}>✓</Text>
                                )}
                              </TouchableOpacity>
                            );
                          })}
                        </ScrollView>
                      </Animated.View>
                    </>
                  )}
                </View>
              </View>
            </View>

            <PrimaryButton
              title="CADASTRAR"
              className="w-full max-w-none"
              activeOpacity={0.85}
              onPress={() => {
                setNome("");
                setSexo("");
                setNascimento("");
                setEtiqueta("");
                setColar("");
                closeDropdown();
                onBack();
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}