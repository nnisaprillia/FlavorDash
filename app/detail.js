import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { decodeJwt, TOKEN_STORAGE_KEY, validateToken } from "./middleware/auth";

const foodDetails = {
  Burger: {
    title: "Burger Classic",
    description:
      "Burger premium dengan roti lembut, daging tebal, keju, sayuran segar, dan saus special.",
    note: "Cocok untuk siapa pun yang ingin makan cepat dengan cita rasa penuh.",
  },
  Pizza: {
    title: "Pizza Neapolitan",
    description:
      "Adonan renyah, saus tomat segar, mozarella, dan daun basil harum.",
    note: "Nikmati pizza hangat dengan aroma Italia yang kaya.",
  },
  Sushi: {
    title: "Sushi Premium",
    description:
      "Potongan sushi segar dengan nasi pulen, ikan pilihan, dan kecap asin ringan.",
    note: "Sajian elegan untuk pengalaman makan sehat dan lezat.",
  },
};

export default function Detail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isReady, setIsReady] = useState(false);
  const [userData, setUserData] = useState(null);

  // Cek token pada saat halaman detail dibuka.
  useEffect(() => {
    async function protectRoute() {
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

      if (!token || !validateToken(token)) {
        router.replace("/login");
        return;
      }

      const decoded = decodeJwt(token);
      setUserData(decoded);
      setIsReady(true);
    }

    protectRoute();
  }, [router]);

  // Fungsi logout untuk menghapus token dan mengembalikan ke halaman login.
  const handleLogout = async () => {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    router.replace("/login");
  };

  if (!isReady) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>Memeriksa autentikasi...</Text>
      </View>
    );
  }

  const foodName = params.name ? decodeURIComponent(params.name) : "Menu";
  const item = foodDetails[foodName] || {
    title: foodName,
    description:
      "Detail makanan belum tersedia, tetapi Anda sudah berhasil masuk.",
    note: "Silakan kembali ke halaman utama untuk memilih menu lain.",
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Detail Menu</Text>
      <View style={styles.card}>
        <Text style={styles.foodTitle}>{item.title}</Text>
        <Text style={styles.foodDescription}>{item.description}</Text>
        <Text style={styles.foodNote}>{item.note}</Text>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.sectionTitle}>User Session</Text>
        <Text style={styles.profileText}>Username: {userData?.username}</Text>
        <Text style={styles.profileText}>Role: {userData?.role}</Text>
        <Text style={styles.profileText}>
          Token valid sampai: {new Date(userData?.exp).toLocaleTimeString()}
        </Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  card: {
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
  foodTitle: {
    color: "#0f172a",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },
  foodDescription: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  foodNote: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "700",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 6,
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
    marginBottom: 6,
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: "#ef4444",
    borderRadius: 14,
    paddingVertical: 14,
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
