import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, TextInput } from "react-native";
import TextField from "../components/ui/TextField";
import { PrimaryButton } from "../components/ui/PrimaryButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef<TextInput>(null);

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica de login ou mock de autenticação.
    console.log("Login realizado", { email, password });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-tertiary px-8 justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text className="font-title text-white text-5xl uppercase mb-12 tracking-wide text-center">
        LOGIN
      </Text>

      <TextField
        label="Email"
        placeholder="Digite aqui seu email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />

      <TextField
        ref={passwordInputRef}
        label="Senha"
        placeholder="Digite aqui sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <PrimaryButton title="LOGAR" activeOpacity={0.8} onPress={handleLogin} />

      <TouchableOpacity className="w-full items-center">
        <Text className="font-body text-white text-base underline">Não está cadastrado?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
