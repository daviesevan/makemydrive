import { ActivityIndicator, View } from "react-native";
import { colors } from "../constants/themes";

export default function Index() {
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
