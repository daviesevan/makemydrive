import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing } from "../constants/themes";
import { HeroIcon } from "./heroicons";

type FilterItem = {
  id: string;
  label: string;
  icon: React.ComponentProps<typeof HeroIcon>["name"];
};

const FILTERS: FilterItem[] = [
  { id: "scenic-routes", label: "Scenic Routes", icon: "MapIcon" },
  { id: "hidden-gems", label: "Hidden Gems", icon: "SparklesIcon" },
  { id: "wildlife-spots", label: "Wildlife Spots", icon: "BugAntIcon" },
  { id: "food-stops", label: "Food Stops", icon: "CakeIcon" },
  { id: "cultural-sites", label: "Cultural Sites", icon: "BuildingLibraryIcon" },
  { id: "waterfalls", label: "Waterfalls", icon: "BeakerIcon" },
];

export default function PeelFilters() {
  const [activeId, setActiveId] = useState<string>(FILTERS[0].id);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {FILTERS.map((filter) => {
          const active = filter.id === activeId;

          return (
            <TouchableOpacity
              key={filter.id}
              style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}
              onPress={() => setActiveId(filter.id)}
              activeOpacity={0.85}
            >
              <HeroIcon
                name={filter.icon}
                size={18}
                color={active ? colors.card : colors.mutedForeground}
              />
              <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: spacing[1],
  },
  row: {
    gap: spacing[3],
    paddingRight: spacing[2],
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  pillActive: {
    backgroundColor: colors.foreground,
  },
  pillInactive: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  label: {
    fontFamily: "sans-semibold",
    fontSize: 12,
  },
  labelActive: {
    color: colors.card,
  },
  labelInactive: {
    color: colors.foreground,
  },
});
