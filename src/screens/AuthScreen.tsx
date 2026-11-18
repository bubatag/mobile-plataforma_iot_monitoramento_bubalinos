import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Svg, Defs, RadialGradient, Stop, Rect, SvgXml } from "react-native-svg";
import TextField from "../components/ui/TextField";
import { PrimaryButton } from "../components/ui/PrimaryButton";

const backgroundTopLeft = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="291" height="272" viewBox="0 0 291 272" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_2846_14172)">
<path d="M237.804 185.869C238.718 182.936 239.529 179.947 240.232 176.905C241.172 172.83 241.896 168.755 242.41 164.692C257.068 153.327 268.048 137.029 272.545 117.548C282.911 72.6436 254.912 27.8383 210.008 17.4724C186.316 12.0032 162.653 17.2163 144.06 29.9547C136.833 28.5973 129.624 27.9131 122.5 27.8589C145.754 5.36192 179.578 -5.26738 213.452 2.55228C266.596 14.8204 299.733 67.8477 287.465 120.992C280.791 149.901 262.057 172.889 237.804 185.869ZM220.8 176.819C221.177 175.447 221.528 174.061 221.851 172.662C234.621 117.343 200.129 62.147 144.81 49.377C138.493 47.9187 132.177 47.0796 125.926 46.8147C131.126 40.2884 137.254 34.6179 144.06 29.9547C145.724 30.2671 147.389 30.6119 149.053 30.9961C210.448 45.1688 250.166 103.497 242.41 164.692C235.858 169.773 228.571 173.867 220.8 176.819ZM94.3228 268.083C28.8531 252.97 -11.9688 187.644 3.1446 122.174C16.2045 65.6005 66.7583 27.4351 122.5 27.8589C116.417 33.743 111.058 40.4377 106.611 47.828C66.024 53.8554 31.3131 84.0187 21.5255 126.417C8.7554 181.736 43.2475 236.932 98.566 249.702C146.023 260.657 193.389 236.83 213.957 194.909C222.304 192.93 230.316 189.876 237.804 185.869C219.046 246.048 156.75 282.494 94.3228 268.083ZM169.025 195.005C115.881 182.736 82.7444 129.709 95.0126 76.565C97.4158 66.1543 101.384 56.5122 106.611 47.828C112.931 46.8894 119.393 46.5377 125.926 46.8147C118.408 56.2501 112.827 67.4701 109.933 80.0093C99.5667 124.913 127.565 169.719 172.47 180.085C189.184 183.943 205.884 182.485 220.8 176.819C219.06 183.157 216.758 189.201 213.957 194.909C199.637 198.305 184.336 198.539 169.025 195.005Z" fill="url(#paint0_linear_2846_14172)"/>
</g>
<defs>
<filter id="filter0_i_2846_14172" x="0" y="0" width="290.017" height="272.665" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1.43688"/>
<feGaussianBlur stdDeviation="0.718438"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2846_14172"/>
</filter>
<linearGradient id="paint0_linear_2846_14172" x1="226.628" y1="211.05" x2="168.571" y2="155.62" gradientUnits="userSpaceOnUse">
<stop stop-color="#90A955"/>
<stop offset="1" stop-color="#038000"/>
</linearGradient>
</defs>
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

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const loginPasswordRef = useRef<TextInput>(null);

  // Register form states
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const registerEmailRef = useRef<TextInput>(null);
  const registerPasswordRef = useRef<TextInput>(null);

  const handleToggleForm = () => {
    const newIsLogin = !isLogin;
    setIsLogin(newIsLogin);

    Animated.timing(slideAnim, {
      toValue: newIsLogin ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -screenWidth],
  });

  const handleLogin = () => {
    console.log("Login realizado", { email: loginEmail, password: loginPassword });
    onAuthSuccess();
  };

  const handleRegister = () => {
    console.log("Cadastro realizado", {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
    onAuthSuccess();
  };

  return (
    <View className="flex-1 bg-tertiary">
      {/* BACKGROUND ESTÁTICO */}
      <Svg
        width="120%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <Defs>
          <RadialGradient id="backgroundGradient" cx="50%" cy="50%" rx="70%" ry="70%">
            <Stop offset="0%" stopColor="#3c505a" />
            <Stop offset="50%" stopColor="#374b55" />
            <Stop offset="100%" stopColor="#2c383f" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#backgroundGradient)" />
      </Svg>

      <View
        style={{
          position: "absolute",
          top: -50,
          left: -120,
          width: 240,
          height: 240,
          opacity: 0.5,
        }}
        pointerEvents="none"
      >
        <SvgXml xml={backgroundTopLeft} width="260" height="260" />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 280,
          height: 280,
          opacity: 0.5,
        }}
        pointerEvents="none"
      >
        <SvgXml xml={backgroundBottomRight} width="380" height="380" />
      </View>

      {/* CONTEÚDO ANIMADO */}
      <Animated.View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            width: screenWidth * 2,
            transform: [{ translateX }],
          },
        ]}
      >
        {/* LOGIN FORM */}
        <KeyboardAvoidingView
          style={{ width: screenWidth, flex: 1, justifyContent: "center", paddingHorizontal: 32 }}
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
            value={loginEmail}
            onChangeText={setLoginEmail}
            returnKeyType="next"
            onSubmitEditing={() => loginPasswordRef.current?.focus()}
          />

          <TextField
            ref={loginPasswordRef}
            label="Senha"
            placeholder="Digite aqui sua senha"
            secureTextEntry
            value={loginPassword}
            onChangeText={setLoginPassword}
          />

          <PrimaryButton title="LOGAR" activeOpacity={0.8} onPress={handleLogin} />

          <TouchableOpacity className="w-full items-center" onPress={handleToggleForm}>
            <Text className="font-body text-white text-base underline">Não está cadastrado?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        {/* REGISTER FORM */}
        <KeyboardAvoidingView
          style={{ width: screenWidth, flex: 1, justifyContent: "center", paddingHorizontal: 32 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text className="font-title text-white text-5xl uppercase mb-12 tracking-wide text-center">
            CADASTRE-SE
          </Text>

          <TextField
            label="Nome"
            placeholder="Digite aqui seu nome"
            autoCapitalize="words"
            value={registerName}
            onChangeText={setRegisterName}
            returnKeyType="next"
            onSubmitEditing={() => registerEmailRef.current?.focus()}
          />

          <TextField
            ref={registerEmailRef}
            label="Email"
            placeholder="Digite aqui seu email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={registerEmail}
            onChangeText={setRegisterEmail}
            returnKeyType="next"
            onSubmitEditing={() => registerPasswordRef.current?.focus()}
          />

          <TextField
            ref={registerPasswordRef}
            label="Senha"
            placeholder="Digite aqui sua senha"
            secureTextEntry
            value={registerPassword}
            onChangeText={setRegisterPassword}
          />

          <PrimaryButton title="CADASTRAR" activeOpacity={0.8} onPress={handleRegister} />

          <TouchableOpacity className="w-full items-center" onPress={handleToggleForm}>
            <Text className="font-body text-white text-base underline">Já está cadastrado?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}
