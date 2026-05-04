import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, spacing } from "../constants/themes";
import { HeroIcon } from "./heroicons";

export default function RouteGemsCta() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [mbogi, setMbogi] = useState("2");

  return (
    <View style={styles.outerShell}>
      <View style={styles.card}>
        <View style={styles.searchRow}>
          <View style={[styles.iconWrap, styles.topIconWrap]}>
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

        <View style={styles.metaRow}>
          <View style={styles.metaCard}>
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

          <View style={styles.metaCard}>
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

        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.88}>
          <Text style={styles.ctaText}>Explore Trips</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerShell: {
    backgroundColor: "#E9ECE7",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#d8ddd4",
    padding: spacing[4],
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: spacing[3],
    gap: spacing[4],
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  searchRow: {
    backgroundColor: "#D9E0D5",
    borderRadius: 16,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  iconWrap: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  topIconWrap: {
    marginTop: spacing[2],
  },
  searchTextWrap: {
    flex: 1,
    gap: spacing[1],
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
  metaRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing[2],
  },
  metaCard: {
    flex: 1,
    backgroundColor: "#D9E0D5",
    borderRadius: 12,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[3],
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing[2],
  },
  metaTextWrap: {
    flex: 1,
    gap: spacing[1],
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
    borderRadius: 14,
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
