import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../constants/themes";
import { HeroIcon } from "./heroicons";
import { NotificationBadge } from "./notification-bell";

type TopBarProps = {
  displayName?: string;
};

const TopBar: React.FC<TopBarProps> = ({ displayName }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.topBar, { paddingTop: insets.top + spacing[2] }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.greeting} numberOfLines={1} ellipsizeMode="tail">
          Hey, {displayName} <Text accessibilityLabel="waving hand">👋</Text>
        </Text>
        <Text style={styles.sub}>Ready for your next adventure?</Text>
      </View>

      <View style={styles.topBarRight}>
        <NotificationBadge
          count={1}
          onPress={() => router.push("/(tabs)/message")}
        >
          <HeroIcon name="BellIcon" size={26} color={colors.mutedForeground} />
        </NotificationBadge>

        <TouchableOpacity
          onPress={() => router.push("/profile" as never)}
          activeOpacity={0.7}
        >
          <HeroIcon
            name="UserCircleIcon"
            size={32}
            color={colors.foreground}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[4],
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[3],
    backgroundColor: colors.background,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[4],
  },
  greeting: {
    fontFamily: "sans-extrabold",
    fontSize: 22,
    letterSpacing: -0.5,
    color: colors.foreground,
  },
  sub: {
    fontFamily: "sans-regular",
    fontSize: 13,
    color: colors.mutedForeground,
    marginTop: spacing[1],
  },
});

export default TopBar;