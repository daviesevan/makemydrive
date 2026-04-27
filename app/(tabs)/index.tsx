import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, spacing } from "../../constants/themes";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "../../lib/auth";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const email = session?.user.email ?? "";
  const displayName = email.split("@")[0] ?? "Traveller";

  async function handleSignOut() {
    setLoading(true);
    setError(null);
    const { error } = await signOut();
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.replace("/(auth)/signin" as never);
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + spacing[6],
          paddingBottom: insets.bottom + spacing[8],
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Top bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>Hey, {displayName} 👋</Text>
          <Text style={styles.sub}>Ready for your next adventure?</Text>
        </View>
        <TouchableOpacity
          style={[styles.signOutBtn, loading && { opacity: 0.5 }]}
          onPress={handleSignOut}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={colors.card} size="small" />
          ) : (
            <Text style={styles.signOutText}>Sign out</Text>
          )}
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Hero CTA card */}
      <View style={styles.heroCTA}>
        <Text style={styles.heroLabel}>WHERE TO?</Text>
        <Text style={styles.heroHeading}>{"Start a\ndrive."}</Text>
        <Text style={styles.heroBody}>
          {
            "Drop a destination and we\u2019ll find the stories worth stopping for."
          }
        </Text>
        <TouchableOpacity style={styles.startButton} activeOpacity={0.85}>
          <Text style={styles.startButtonText}>Plan my route →</Text>
        </TouchableOpacity>
      </View>

      {/* Section */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>TRENDING STOPS</Text>
        <View style={styles.cardRow}>
          {STOPS.map((stop) => (
            <TouchableOpacity
              key={stop.id}
              style={styles.stopCard}
              activeOpacity={0.8}
            >
              <View
                style={[styles.stopThumb, { backgroundColor: stop.color }]}
              />
              <Text style={styles.stopName}>{stop.name}</Text>
              <Text style={styles.stopMeta}>{stop.meta}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const STOPS = [
  { id: 1, name: "Hell's Gate", meta: "2h from Nairobi", color: "#C9A96E" },
  { id: 2, name: "Lake Nakuru", meta: "3h from Nairobi", color: "#6E9E8F" },
  { id: 3, name: "Amboseli", meta: "4h from Nairobi", color: "#A96E6E" },
];

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing[6],
    gap: spacing[6],
  },
  topBar: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
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
  signOutBtn: {
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radius.md,
  },
  signOutText: {
    fontFamily: "sans-semibold",
    fontSize: 12,
    color: colors.mutedForeground,
    letterSpacing: 0.2,
  },
  errorBox: {
    backgroundColor: "#3d1515",
    borderWidth: 1,
    borderColor: "#dc2626",
    borderRadius: radius.md,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  errorText: {
    fontFamily: "sans-regular",
    fontSize: 13,
    color: "#ff8080",
  },
  heroCTA: {
    backgroundColor: colors.foreground,
    borderRadius: radius.lg,
    padding: spacing[6],
    gap: spacing[3],
  },
  heroLabel: {
    fontFamily: "sans-semibold",
    fontSize: 10,
    letterSpacing: 2,
    color: colors.mutedForeground,
  },
  heroHeading: {
    fontFamily: "sans-extrabold",
    fontSize: 44,
    lineHeight: 46,
    letterSpacing: -1.2,
    color: colors.card,
  },
  heroBody: {
    fontFamily: "sans-regular",
    fontSize: 14,
    lineHeight: 22,
    color: colors.mutedForeground,
  },
  startButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing[4],
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.card,
    marginTop: spacing[1],
  },
  startButtonText: {
    fontFamily: "sans-bold",
    fontSize: 15,
    letterSpacing: 0.3,
    color: colors.foreground,
  },
  section: {
    gap: spacing[3],
  },
  sectionLabel: {
    fontFamily: "sans-semibold",
    fontSize: 10,
    letterSpacing: 2,
    color: colors.mutedForeground,
  },
  cardRow: {
    gap: spacing[3],
  },
  stopCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  stopThumb: {
    height: 100,
    width: "100%",
  },
  stopName: {
    fontFamily: "sans-bold",
    fontSize: 16,
    color: colors.foreground,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    letterSpacing: -0.3,
  },
  stopMeta: {
    fontFamily: "sans-regular",
    fontSize: 12,
    color: colors.mutedForeground,
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
    paddingTop: spacing[1],
  },
});
