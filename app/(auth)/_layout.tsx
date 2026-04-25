import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerTransparent: true,
        headerTitle: "",
        headerBackTitle: "",
        headerTintColor: "#777268",
        headerShadowVisible: false,
      }}
    />
  );
}
