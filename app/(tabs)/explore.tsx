import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, spacing } from "../../constants/themes";

const CATEGORIES = [
  { id: 1, label: "Scenic Routes", icon: "🏔️", count: 24 },
  { id: 2, label: "Hidden Gems", icon: "💎", count: 18 },
  { id: 3, label: "Wildlife Spots", icon: "🦓", count: 31 },
  { id: 4, label: "Food Stops", icon: "🍢", count: 42 },
  { id: 5, label: "Cultural Sites", icon: "🏛️", count: 15 },
  { id: 6, label: "Waterfalls", icon: "💧", count: 9 },
];

const FEATURED = [
  {
    id: 1,
    title: "Maasai Mara Loop",
    distance: "~5h",
    color: "#C9A96E",
    tag: "POPULAR",
  },
  {
    id: 2,
    title: "Rift Valley Views",
    distance: "~2h",
    color: "#6E8FA9",
    tag: "SCENIC",
  },
  {
    id: 3,
    title: "Coastal Road",
    distance: "~6h",
    color: "#6E9E8F",
    tag: "EPIC",
  },
];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Explore</Text>
        <Text style={styles.sub}>Discover drives worth taking.</Text>
      </View>

      {/* Search bar placeholder */}
      <TouchableOpacity style={styles.searchBar} activeOpacity={0.7}>
        <Text style={styles.searchText}>Search destinations, stops…</Text>
      </TouchableOpacity>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>BROWSE BY</Text>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              activeOpacity={0.8}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={styles.categoryName}>{cat.label}</Text>
              <Text style={styles.categoryCount}>{cat.count}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured routes */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>FEATURED DRIVES</Text>
        <View style={styles.featuredList}>
          {FEATURED.map((route) => (
            <TouchableOpacity
              key={route.id}
              style={styles.featuredCard}
              activeOpacity={0.85}
            >
              <View
                style={[styles.featuredThumb, { backgroundColor: route.color }]}
              >
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>{route.tag}</Text>
                </View>
              </View>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredTitle}>{route.title}</Text>
                <Text style={styles.featuredMeta}>{route.distance} drive</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing[6],
    gap: spacing[6],
  },
  header: {
    gap: spacing[1],
  },
  heading: {
    fontFamily: "sans-extrabold",
    fontSize: 34,
    letterSpacing: -1,
    color: colors.foreground,
  },
  sub: {
    fontFamily: "sans-regular",
    fontSize: 14,
    color: colors.mutedForeground,
  },
  searchBar: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
  },
  searchText: {
    fontFamily: "sans-regular",
    fontSize: 14,
    color: colors.mutedForeground,
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
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[3],
  },
  categoryCard: {
    width: "47%",
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[2],
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontFamily: "sans-semibold",
    fontSize: 14,
    color: colors.foreground,
    letterSpacing: -0.2,
  },
  categoryCount: {
    fontFamily: "sans-regular",
    fontSize: 12,
    color: colors.mutedForeground,
  },
  featuredList: {
    gap: spacing[3],
  },
  featuredCard: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  featuredThumb: {
    height: 120,
    justifyContent: "flex-end",
    padding: spacing[3],
  },
  tagBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.foreground,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: radius.sm,
  },
  tagText: {
    fontFamily: "sans-semibold",
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.accent,
  },
  featuredInfo: {
    padding: spacing[4],
    gap: spacing[1],
  },
  featuredTitle: {
    fontFamily: "sans-bold",
    fontSize: 16,
    letterSpacing: -0.3,
    color: colors.foreground,
  },
  featuredMeta: {
    fontFamily: "sans-regular",
    fontSize: 12,
    color: colors.mutedForeground,
  },
});
