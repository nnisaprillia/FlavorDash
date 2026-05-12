import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from "@expo/vector-icons";

import { useLocalSearchParams, useRouter } from "expo-router";

import { useEffect, useState } from "react";

import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { TOKEN_STORAGE_KEY, validateToken } from "./middleware/auth";

const { width } = Dimensions.get("window");

export default function Detail() {
  const router = useRouter();

  const params = useLocalSearchParams();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function protectRoute() {
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

      if (!token || !validateToken(token)) {
        router.replace("/login");
        return;
      }

      setIsReady(true);
    }

    protectRoute();
  }, [router]);

  if (!isReady) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>Memeriksa autentikasi...</Text>
      </View>
    );
  }

  const fallbackImage =
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80";

  const food = {
    name: typeof params.name === "string" ? params.name : "Unknown Food",

    description:
      typeof params.description === "string"
        ? params.description
        : "Deskripsi makanan belum tersedia.",

    image:
      typeof params.image === "string" && params.image.startsWith("http")
        ? params.image
        : fallbackImage,

    price: typeof params.price === "string" ? params.price : "0",
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: food.image || fallbackImage,
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* <Pressable style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </Pressable> */}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.foodTitle}>{food.name}</Text>

              <Text style={styles.subtitle}>
                Premium Food • Fresh & Delicious
              </Text>
            </View>

            <View style={styles.ratingBox}>
              <MaterialIcons name="star" size={18} color="#facc15" />

              <Text style={styles.ratingText}>4.9</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoCard}>
              <MaterialIcons name="delivery-dining" size={22} color="#2563eb" />

              <Text style={styles.infoTitle}>Delivery</Text>

              <Text style={styles.infoValue}>20-30 Min</Text>
            </View>

            <View style={styles.infoCard}>
              <MaterialIcons name="restaurant" size={22} color="#10b981" />

              <Text style={styles.infoTitle}>Category</Text>

              <Text style={styles.infoValue}>Food</Text>
            </View>

            <View style={styles.infoCard}>
              <MaterialIcons
                name="local-fire-department"
                size={22}
                color="#ef4444"
              />

              <Text style={styles.infoTitle}>Calories</Text>

              <Text style={styles.infoValue}>450 Kcal</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>

            <Text style={styles.description}>{food.description}</Text>
          </View>

          <View style={styles.noteBox}>
            <MaterialIcons name="tips-and-updates" size={22} color="#2563eb" />

            <Text style={styles.noteText}>
              Dibuat menggunakan bahan berkualitas premium dengan cita rasa
              modern dan tampilan elegan.
            </Text>
          </View>

          <View style={styles.bottomBar}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Price</Text>

              <Text style={styles.price}>Rp {food.price}</Text>
            </View>

            <Pressable style={styles.orderButton}>
              <MaterialIcons name="shopping-bag" size={20} color="#ffffff" />

              <Text style={styles.orderButtonText}>Order Now</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  priceContainer: {
    flex: 1,
    marginRight: 5,
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

  heroContainer: {
    position: "relative",
  },

  heroImage: {
    width: width,
    height: 320,
  },

  backButton: {
    position: "absolute",
    top: 55,
    left: 20,

    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "rgba(0,0,0,0.35)",

    justifyContent: "center",
    alignItems: "center",
  },

  contentContainer: {
    marginTop: -30,

    backgroundColor: "#f8fafc",

    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,

    padding: 24,
    paddingBottom: 40,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 24,
  },

  foodTitle: {
    color: "#0f172a",
    fontSize: 30,
    fontWeight: "800",
  },

  subtitle: {
    color: "#64748b",
    fontSize: 15,
    marginTop: 6,
  },

  ratingBox: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#ffffff",

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 14,
  },

  ratingText: {
    color: "#0f172a",
    fontWeight: "700",
    marginLeft: 4,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 28,
  },

  infoCard: {
    flex: 1,

    backgroundColor: "#ffffff",

    paddingVertical: 18,

    borderRadius: 20,

    alignItems: "center",

    marginHorizontal: 4,
  },

  infoTitle: {
    color: "#64748b",
    fontSize: 13,
    marginTop: 8,
  },

  infoValue: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    color: "#0f172a",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
  },

  description: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 28,
  },

  noteBox: {
    flexDirection: "row",

    backgroundColor: "#eff6ff",

    padding: 18,

    borderRadius: 20,

    marginBottom: 32,
  },

  noteText: {
    flex: 1,

    color: "#1e3a8a",

    fontSize: 15,

    lineHeight: 24,

    marginLeft: 12,
  },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#ffffff",

    padding: 20,

    borderRadius: 24,
  },

  priceLabel: {
    color: "#64748b",
    fontSize: 14,
  },

  price: {
    color: "#2563eb",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 4,
  },

  orderButton: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#2563eb",

    paddingHorizontal: 24,
    paddingVertical: 16,

    borderRadius: 18,
  },

  orderButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
