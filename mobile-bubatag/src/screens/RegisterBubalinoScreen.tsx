import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
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

const colarOptions = ["Colar A", "Colar B", "Colar C", "Colar D"];

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

  const toggleCollar = () => setIsCollarOpen((prev) => !prev);

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
          <View className="flex-row items-center mt-8 mb-6">
            <TouchableOpacity
              className="rounded-2xl border border-primary p-3"
              onPress={onBack}
              activeOpacity={0.8}
            >
              <SvgXml xml={sairIcon} width={24} height={24} />
            </TouchableOpacity>

            <View className="flex-1 mx-3">
              <Text
                className="font-title text-white text-2xl uppercase tracking-[0.18em] text-center"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Cadastre o Bubalino
              </Text>
            </View>

            <View className="w-12" />
          </View>

          <View className="rounded-3xl border border-[#2F3E46] bg-[#1f2933] p-5 shadow-lg">
            <TextField
              label="Nome (opcional)"
              placeholder="Digite aqui o nome"
              value={nome}
              onChangeText={setNome}
            />

            <View className="flex-row gap-3">
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

              <View className="w-1/2 mb-6">
                <Text className="font-body text-white text-base mb-2">Selecione o colar</Text>
                <View className="relative z-10">
                  <TouchableOpacity
                    className="flex-row items-center justify-between rounded-2xl border border-secondary bg-black/30 px-4 py-4"
                    onPress={toggleCollar}
                    activeOpacity={0.8}
                  >
                    <Text className={`font-body text-base ${colar ? "text-white" : "text-gray-400"}`} numberOfLines={1}>
                      {colar || "Selecione o colar"}
                    </Text>
                    <Text className="text-white text-lg">▾</Text>
                  </TouchableOpacity>
                  {isCollarOpen && (
                    <View className="mt-2 rounded-2xl border border-secondary bg-[#122023] overflow-hidden">
                      {colarOptions.map((option) => (
                        <TouchableOpacity
                          key={option}
                          className="px-4 py-3 border-b border-[#2F3E46] last:border-b-0"
                          onPress={() => {
                            setColar(option);
                            setIsCollarOpen(false);
                          }}
                          activeOpacity={0.8}
                        >
                          <Text className="text-white font-body text-base" numberOfLines={1}>
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
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
                setIsCollarOpen(false);
                onBack();
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
