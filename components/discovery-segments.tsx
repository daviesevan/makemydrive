import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing } from "../constants/themes";

type Segment = {
  id: string;
  label: string;
};

const SEGMENTS: Segment[] = [
  { id: "trending", label: "Trending" },
  { id: "top-picks", label: "Top Picks" },
  { id: "nearby", label: "Nearby" },
];

export default function DiscoverySegments() {
  const [active, setActive] = useState<string>(SEGMENTS[0].id);

  return (
    <View style={styles.shell}>
      {SEGMENTS.map((segment) => {
        const isActive = active === segment.id;

        return (
          <TouchableOpacity
            key={segment.id}
            onPress={() => setActive(segment.id)}
            style={[styles.segment, isActive && styles.segmentActive]}
            activeOpacity={0.85}
          >
            <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>
              {segment.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: colors.background,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing[2],
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  segment: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[2],
    alignItems: "center",
    justifyContent: "center",
  },
  segmentActive: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.foreground,
  },
  segmentText: {
    fontFamily: "sans-semibold",
    fontSize: 12,
    lineHeight: 16,
    color: colors.foreground,
    letterSpacing: -0.1,
  },
  segmentTextActive: {
    fontFamily: "sans-bold",
  },
});
