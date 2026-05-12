import { useEffect, useState } from "react";

import { useRouter } from "expo-router";

import axios from "axios";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import FoodCard from "../components/FoodCard";

export default function Home() {
  const router = useRouter();

  const [foods, setFoods] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      console.log("🔄 Fetching foods from MockAPI...");
      const response = await axios.get(
        "https://6a01dc5836fb6ad04de1dc56.mockapi.io/foods",
      );

      console.log("✅ API Response:", response.status);

      // Transform data dari MockAPI (array langsung)
      if (Array.isArray(response.data) && response.data.length > 0) {
        const fallbackImage =
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80";

        const imageOverride = {
          "chicken katsu":
            "https://images.unsplash.com/photo-1604908176997-431f4d3b3c4f?auto=format&fit=crop&w=800&q=80",
          "nasi goreng special":
            "https://images.unsplash.com/photo-1604908554027-0a5e8a6e8c0f?auto=format&fit=crop&w=800&q=80",
          "hotdog classic":
            "https://images.unsplash.com/photo-1612392062798-74d3f5c53a8b?auto=format&fit=crop&w=800&q=80",
        };

        const transformedFoods = response.data
          .slice(0, 10)
          .map((food, index) => {
            const normalizedName =
              typeof food.name === "string"
                ? food.name.trim().toLowerCase()
                : "";
            const imageUrl =
              imageOverride[normalizedName] ||
              (typeof food.image === "string" && food.image.startsWith("http")
                ? food.image
                : typeof food.imageUrl === "string" &&
                    food.imageUrl.startsWith("http")
                  ? food.imageUrl
                  : fallbackImage);

            return {
              id: food.id || `food-${index}`,
              name: food.name || food.title || "Unknown Food",
              description:
                food.description || food.category || "Delicious food",
              price:
                food.price ||
                `Rp ${(Math.floor(Math.random() * 50) + 30).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}.000`,
              image: imageUrl,
            };
          });

        console.log("📊 Using API data:", transformedFoods.length, "items");
        setFoods(transformedFoods);
      } else {
        console.log(
          "⚠️ API returned invalid data structure, using static data",
        );
        setFoods(staticFoodMenu);
      }
    } catch (error) {
      console.log("❌ API Error:", error.message);
      console.log("📊 Using static fallback data");
      setFoods(staticFoodMenu);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.container}>
      <Text style={styles.title}>FlavorDash</Text>

      <Text style={styles.subtitle}>
        Katalog makanan modern dengan Flexbox dan Expo Router test.
      </Text>

      <View style={styles.menuList}>
        {Array.isArray(foods) && foods.length > 0 ? (
          foods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onPress={() =>
                router.push({
                  pathname: "/detail",
                  params: {
                    id: String(food.id),
                    name: String(food.name),
                    description: String(food.description),
                    price: String(food.price),
                    image: String(food.image),
                  },
                })
              }
            />
          ))
        ) : (
          <Text style={styles.noDataText}>Tidak ada data makanan tersedia</Text>
        )}
      </View>

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>Petunjuk</Text>

        <Text style={styles.noteText}>
          Tekan kartu makanan untuk melihat halaman detail. Jika belum login,
          pengguna akan diarahkan ke halaman login.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  page: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    color: "#111827",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 6,
  },

  subtitle: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 18,
  },

  menuList: {
    gap: 16,
  },

  noteBox: {
    backgroundColor: "#ffffff",

    borderRadius: 20,

    padding: 18,

    marginTop: 24,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.08,

    shadowRadius: 24,

    elevation: 6,
  },

  noteTitle: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  noteText: {
    color: "#475569",
    fontSize: 14,
    lineHeight: 20,
  },

  profileButton: {
    backgroundColor: "#2563eb",
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 18,
    marginHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },

  profileButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  noDataText: {
    color: "#64748b",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
