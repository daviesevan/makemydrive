import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, spacing } from "../../constants/themes";

const RECENT_SEARCHES = [
  { id: 1, label: "Naivasha", type: "Town" },
  { id: 2, label: "Nairobi → Mombasa", type: "Route" },
  { id: 3, label: "Hell's Gate NP", type: "Park" },
];

export default function MapsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* Map placeholder */}
      <View style={styles.mapPlaceholder}>
        <View style={styles.mapGrid}>
          {Array.from({ length: 30 }).map((_, i) => (
            <View key={i} style={styles.mapCell} />
          ))}
        </View>
        <View style={styles.mapOverlay}>
          <Text style={styles.mapEmoji}>🗺️</Text>
          <Text style={styles.mapPlaceholderText}>
            Interactive map coming soon
          </Text>
        </View>
        {/* Floating search */}
        <View style={[styles.floatingSearch, { top: insets.top + spacing[4] }]}>
          <TouchableOpacity style={styles.searchPill} activeOpacity={0.8}>
            <Text style={styles.searchPillText}>Search a place or route…</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />

        <Text style={styles.sheetHeading}>Plan your route</Text>

        {/* Recent */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionLabel}>RECENT SEARCHES</Text>
          {RECENT_SEARCHES.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.recentRow,
                index < RECENT_SEARCHES.length - 1 && styles.recentRowBorder,
              ]}
              activeOpacity={0.75}
            >
              <View style={styles.recentIcon}>
                <Text style={styles.recentIconText}>🕐</Text>
              </View>
              <View style={styles.recentContent}>
                <Text style={styles.recentLabel}>{item.label}</Text>
                <Text style={styles.recentType}>{item.type}</Text>
              </View>
              <Text style={styles.recentChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start button */}
        <TouchableOpacity style={styles.startButton} activeOpacity={0.85}>
          <Text style={styles.startButtonText}>Drop a pin →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#D4CEBC",
    position: "relative",
    overflow: "hidden",
  },
  mapGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  mapCell: {
    width: "10%",
    aspectRatio: 1,
    borderWidth: 0.5,
    borderColor: "#C5BFA8",
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
  },
  mapEmoji: {
    fontSize: 48,
  },
  mapPlaceholderText: {
    fontFamily: "sans-semibold",
    fontSize: 14,
    color: colors.mutedForeground,
    letterSpacing: 0.2,
  },
  floatingSearch: {
    position: "absolute",
    left: spacing[4],
    right: spacing[4],
  },
  searchPill: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    borderWidth: 1.5,
    borderColor: colors.border,
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  },
  searchPillText: {
    fontFamily: "sans-regular",
    fontSize: 14,
    color: colors.mutedForeground,
  },
  bottomSheet: {
    backgroundColor: colors.foreground,
    borderTopWidth: 2,
    borderTopColor: colors.foreground,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[3],
    paddingBottom: spacing[6],
    gap: spacing[4],
  },
  sheetHandle: {
    width: 36,
    height: 4,
    backgroundColor: "#3a3630",
    borderRadius: 2,
    alignSelf: "center",
  },
  sheetHeading: {
    fontFamily: "sans-extrabold",
    fontSize: 22,
    letterSpacing: -0.5,
    color: colors.card,
  },
  recentSection: {
    gap: 0,
    backgroundColor: "#1c1a18",
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2a2824",
  },
  sectionLabel: {
    fontFamily: "sans-semibold",
    fontSize: 10,
    letterSpacing: 2,
    color: colors.mutedForeground,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[2],
  },
  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    gap: spacing[3],
  },
  recentRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#2a2824",
  },
  recentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#242018",
    alignItems: "center",
    justifyContent: "center",
  },
  recentIconText: {
    fontSize: 16,
  },
  recentContent: {
    flex: 1,
    gap: 2,
  },
  recentLabel: {
    fontFamily: "sans-semibold",
    fontSize: 14,
    color: colors.card,
    letterSpacing: -0.2,
  },
  recentType: {
    fontFamily: "sans-regular",
    fontSize: 11,
    color: colors.mutedForeground,
  },
  recentChevron: {
    fontFamily: "sans-regular",
    fontSize: 20,
    color: colors.mutedForeground,
  },
  startButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing[4],
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.card,
  },
  startButtonText: {
    fontFamily: "sans-bold",
    fontSize: 15,
    letterSpacing: 0.3,
    color: colors.foreground,
  },
});
