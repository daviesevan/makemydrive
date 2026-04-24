import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Text className="text-blue-600">Onboarding.</Text>
      <Link href="/onboarding" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#F2C94C",
            paddingVertical: 14,
            paddingHorizontal: 28,
            borderWidth: 2,
            borderColor: "#151412",
          }}
        >
          <Text
            style={{ fontFamily: "sans-bold", fontSize: 14, color: "#151412" }}
          >
            View Onboarding →
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
