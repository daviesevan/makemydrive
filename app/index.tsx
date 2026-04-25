import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../constants/themes";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.muted,
        }}
      >
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (session) {
    return <Redirect href={"/(tabs)/" as never} />;
  }

  return <Redirect href="/onboarding" />;
}
