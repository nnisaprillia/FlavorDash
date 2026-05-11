import { useState } from "react";
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function FoodCard({ food, onPress }) {
  const [imageUri, setImageUri] = useState(food.image);
  const fallbackUri =
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image
        source={{ uri: imageUri || fallbackUri }}
        style={styles.image}
        resizeMode="cover"
        onError={() => setImageUri(fallbackUri)}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{food.name}</Text>

        <Text style={styles.description} numberOfLines={2}>
          {food.description}
        </Text>

        <Text style={styles.price}>Rp {food.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#ffffff",

    borderRadius: 20,

    padding: 16,

    marginBottom: 16,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.08,

    shadowRadius: 14,

    elevation: 5,

    width: width * 0.92,

    alignSelf: "center",
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  image: {
    width: 110,
    height: 110,

    borderRadius: 18,

    marginRight: 16,

    flex: 1,
  },

  info: {
    flex: 2,
    justifyContent: "space-between",
  },

  name: {
    color: "#0f172a",

    fontSize: 20,

    fontWeight: "700",

    marginBottom: 8,
  },

  description: {
    color: "#475569",

    fontSize: 14,

    lineHeight: 20,
  },

  price: {
    color: "#2563eb",

    fontSize: 16,

    fontWeight: "700",

    marginTop: 12,
  },
});
