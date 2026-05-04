import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, radius, spacing } from "../constants/themes";
import { HeroIcon } from "./heroicons";

export default function RouteGemsCta() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [mbogi, setMbogi] = useState("2");

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Let's plan your next trip</Text>

      <View style={styles.searchPanel}>
        <View style={styles.searchRow}>
          <View style={styles.iconWrap}>
            <HeroIcon name="MagnifyingGlassIcon" size={18} color={colors.mutedForeground} />
          </View>
          <View style={styles.searchTextWrap}>
            <Text style={styles.fieldLabel}>Where to?</Text>
            <TextInput
              value={destination}
              onChangeText={setDestination}
              placeholder="Search destinations..."
              placeholderTextColor={colors.mutedForeground}
              style={styles.primaryInput}
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.metaRow}>
          <View style={styles.metaField}>
            <HeroIcon name="CalendarDaysIcon" size={18} color={colors.mutedForeground} />
            <View style={styles.metaTextWrap}>
              <Text style={styles.fieldLabel}>Dates</Text>
              <TextInput
                value={dates}
                onChangeText={setDates}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.mutedForeground}
                style={styles.dateInput}
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.metaSplit} />

          <View style={styles.metaField}>
            <HeroIcon name="UserGroupIcon" size={18} color={colors.mutedForeground} />
            <View style={styles.metaTextWrap}>
              <Text style={styles.fieldLabel}>Mbogi</Text>
              <TextInput
                value={mbogi}
                onChangeText={(value) => setMbogi(value.replace(/\D/g, ""))}
                placeholder="0"
                placeholderTextColor={colors.mutedForeground}
                style={styles.dateInput}
                keyboardType="number-pad"
                inputMode="numeric"
                maxLength={2}
              />
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.ctaButton} activeOpacity={0.88}>
        <Text style={styles.ctaText}>Find route with gems</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.foreground,
    borderRadius: 24,
    padding: spacing[6],
    gap: spacing[4],
  },
  heading: {
    fontFamily: "sans-bold",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.1,
    color: colors.card,
  },
  searchPanel: {
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[4],
    gap: spacing[2],
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  searchTextWrap: {
    flex: 1,
    gap: spacing[2],
  },
  fieldLabel: {
    fontFamily: "sans-regular",
    fontSize: 12,
    lineHeight: 16,
    color: colors.mutedForeground,
  },
  primaryInput: {
    fontFamily: "sans-semibold",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.1,
    color: colors.foreground,
    paddingVertical: 0,
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    opacity: 0.35,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaField: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[2],
  },
  metaTextWrap: {
    flex: 1,
    gap: spacing[2],
  },
  metaSplit: {
    width: 1,
    height: 42,
    backgroundColor: colors.border,
    opacity: 0.35,
    marginHorizontal: spacing[2],
  },
  dateInput: {
    fontFamily: "sans-semibold",
    fontSize: 14,
    lineHeight: 18,
    color: colors.foreground,
    paddingVertical: 0,
  },
  ctaButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.card,
    paddingVertical: spacing[4],
    alignItems: "center",
  },
  ctaText: {
    fontFamily: "sans-bold",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.1,
    color: colors.foreground,
  },
});
