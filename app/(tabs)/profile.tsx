import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  decodeJwt,
  TOKEN_STORAGE_KEY,
  validateToken,
} from "../middleware/auth";

export default function Profile() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      if (!token || !validateToken(token)) {
        router.replace("/login");
        return;
      }

      const decoded = decodeJwt(token);
      setUserData(decoded);
      setIsReady(true);
    }

    loadProfile();
  }, [router]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    router.replace("/login");
  };

  if (!isReady) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>Memuat data profil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileCard}>
        <Text style={styles.sectionTitle}>User Session</Text>
        <Text style={styles.profileText}>Username: {userData?.username}</Text>
        <Text style={styles.profileText}>Role: {userData?.role}</Text>
        <Text style={styles.profileText}>
          Token valid sampai: {new Date(userData?.exp).toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 20,
  },
  title: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 18,
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 7,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#0f172a",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  profileText: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loadingText: {
    color: "#475569",
    fontSize: 16,
  },
});
