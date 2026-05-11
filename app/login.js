import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    createJwtToken,
    TOKEN_STORAGE_KEY,
    validateToken,
} from "./middleware/auth";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Jika pengguna sudah login dan token valid, langsung arahkan ke halaman utama.
  useEffect(() => {
    async function checkStoredToken() {
      const savedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      if (savedToken && validateToken(savedToken)) {
        router.replace("/");
      }
    }
    checkStoredToken();
  }, [router]);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setMessage("Isi username dan password untuk melanjutkan.");
      return;
    }

    const token = createJwtToken(username.trim());
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    router.replace("/");
  };

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Login FlavorDash</Text>
        <Text style={styles.subtitle}>
          Masuk untuk melanjutkan ke katalog dan detail pesanan.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Masukkan username"
            placeholderTextColor="#94a3b8"
            style={styles.input}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Masukkan password"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            style={styles.input}
          />
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#edf2f7",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 26,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: {
    color: "#475569",
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: "#334155",
    fontWeight: "700",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: "#0f172a",
  },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  message: {
    color: "#dc2626",
    marginBottom: 12,
    fontSize: 14,
  },
});
