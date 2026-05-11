import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#ffffff" },
        headerTintColor: "#111827",
        headerTitleStyle: { fontWeight: "700" },
        contentStyle: { backgroundColor: "#f8fafc" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "FlavorDash - Katalog Makanan",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "Masuk ke FlavorDash",
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "Detail Akun",
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          title: "Informasi",
        }}
      />
    </Stack>
  );
}
