import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, spacing } from "../../constants/themes";
import { supabase } from "../../lib/supabase";

export default function SetDisplayNameScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name.");
      return;
    }
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      data: { full_name: trimmed, display_name: trimmed },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Force refresh session so AuthContext and _layout catch the new metadata
    await supabase.auth.refreshSession();
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />

      <View
        style={[
          styles.content,
          { paddingTop: insets.top + spacing[12], paddingBottom: insets.bottom + spacing[8] },
        ]}
      >
        <Text style={styles.heading}>{"What should\nwe call you?"}</Text>
        <Text style={styles.subheading}>
          Your display name is visible to others when you share trips.
        </Text>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Name field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>FULL NAME</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(v) => {
              setName(v);
              setError(null);
            }}
            placeholder="John Doe"
            placeholderTextColor={colors.mutedForeground}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleSave}
            autoFocus
          />
        </View>

        <View style={{ flex: 1 }} />

        {/* Primary CTA */}
        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color={colors.primary} size="small" />
          ) : (
            <Text style={styles.primaryButtonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.foreground,
  },
  content: {
    flex: 1,
    backgroundColor: colors.foreground,
    paddingHorizontal: spacing[6],
    gap: spacing[6],
  },
  heading: {
    fontFamily: "sans-extrabold",
    fontSize: 44,
    lineHeight: 46,
    letterSpacing: -1.2,
    color: colors.card,
  },
  subheading: {
    fontFamily: "sans-regular",
    fontSize: 14,
    lineHeight: 22,
    color: colors.mutedForeground,
    marginTop: -spacing[4],
  },
  errorBox: {
    backgroundColor: "#3d1515",
    borderWidth: 1,
    borderColor: colors.destructive,
    borderRadius: radius.md,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  errorText: {
    fontFamily: "sans-regular",
    fontSize: 13,
    color: "#ff8080",
  },
  fieldGroup: {
    gap: spacing[2],
  },
  fieldLabel: {
    fontFamily: "sans-semibold",
    fontSize: 10,
    letterSpacing: 2,
    color: colors.mutedForeground,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: colors.mutedForeground,
    paddingVertical: spacing[3],
    fontFamily: "sans-regular",
    fontSize: 16,
    color: colors.card,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing[4],
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.card,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    fontFamily: "sans-bold",
    fontSize: 15,
    letterSpacing: 0.3,
    color: colors.primary,
  },
});