import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, spacing } from "../constants/themes";

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Hero illustration — neutral background */}
      <View
        style={[styles.heroSection, { paddingTop: insets.top + spacing[6] }]}
      >
        <Image
          source={require("../assets/animations/1.png")}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      {/* Bottom content card — dark */}
      <View
        style={[styles.content, { paddingBottom: insets.bottom + spacing[6] }]}
      >
        {/* Label tag */}
        {/* <View style={styles.labelTag}>
          <Text style={styles.labelText}>YOUR DRIVE. YOUR WAY.</Text>
        </View> */}

        {/* Display heading */}
        <Text style={styles.display}>
          {"Make my drive fun. (twende side quests)"}
        </Text>

        {/* Body */}
        <Text style={styles.body}>
          Turn every road trip into an adventure. Discover stops, stories, and
          detours worth taking.
        </Text>

        {/* Primary CTA */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/(auth)/signup" as never)}
          activeOpacity={0.88}
        >
          <Text style={styles.primaryButtonText}>Get started</Text>
        </TouchableOpacity>

        {/* Secondary */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/(auth)/signin" as never)}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.muted,
  },
  heroSection: {
    flex: 1,
    backgroundColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing[6],
    position: "relative",
  },
  frameLabel: {
    position: "absolute",
    top: spacing[6],
    left: spacing[6],
    borderWidth: 1.5,
    borderColor: colors.mutedForeground,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: radius.sm,
  },
  frameLabelText: {
    fontFamily: "sans-medium",
    fontSize: 10,
    letterSpacing: 2,
    color: colors.mutedForeground,
  },
  heroImage: {
    width: "100%",
    height: 680,
  },
  content: {
    backgroundColor: colors.foreground,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[6],
    gap: spacing[3],
    borderTopWidth: 2,
    borderTopColor: colors.foreground,
  },
  labelTag: {
    alignSelf: "flex-start",
    borderWidth: 1.5,
    borderColor: colors.mutedForeground,
    paddingHorizontal: spacing[2] + 2,
    paddingVertical: spacing[1],
    borderRadius: radius.sm,
    marginBottom: spacing[1],
  },
  labelText: {
    fontFamily: "sans-medium",
    fontSize: 10,
    letterSpacing: 2,
    color: colors.mutedForeground,
  },
  display: {
    fontFamily: "sans-extrabold",
    fontSize: 44,
    lineHeight: 46,
    letterSpacing: -1.2,
    color: colors.card,
    marginBottom: spacing[1],
  },
  body: {
    fontFamily: "sans-regular",
    fontSize: 14,
    lineHeight: 23,
    color: colors.mutedForeground,
    marginBottom: spacing[2],
  },
  primaryButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.card,
    alignItems: "center",
  } as any,
  primaryButtonText: {
    fontFamily: "sans-bold",
    fontSize: 15,
    letterSpacing: 0.3,
    color: colors.foreground,
  },
  secondaryButton: {
    paddingVertical: spacing[4] - 2,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.mutedForeground,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontFamily: "sans-medium",
    fontSize: 14,
    letterSpacing: 0.2,
    color: colors.muted,
  },
});
