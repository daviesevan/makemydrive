import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PeelFilters from "../../components/peel-filters";
import RouteGemsCta from "../../components/route-gems-cta";
import TopBar from "../../components/topbar";
import { colors, radius, spacing } from "../../constants/themes";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { session } = useAuth();

  const displayName = session?.user.user_metadata.full_name;

  return (
    <View style={styles.root}>
      <TopBar displayName={displayName} />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing[8], paddingTop: spacing[6] },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <PeelFilters />
        <RouteGemsCta />

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
    </View>
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
