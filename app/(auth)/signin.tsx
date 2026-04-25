import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
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
import { signInWithGoogle, signInWithMagicLink } from "../../lib/auth";

export default function SignInScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleMagicLink() {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email to continue.");
      return;
    }
    setError(null);
    setLoading(true);
    const { error } = await signInWithMagicLink(trimmed);
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push({
      pathname: "/(auth)/verify",
      params: { email: trimmed },
    } as never);
  }

  async function handleGoogle() {
    setError(null);
    setGoogleLoading(true);
    const { error } = await signInWithGoogle();
    setGoogleLoading(false);
    if (error && error.message !== "Sign-in cancelled") {
      setError(error.message);
    }
    // On success the AuthContext listener fires and session updates automatically
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />

      {/* Hero section with image */}
      <View style={styles.heroSection}>
        <Image
          source={require("../../assets/animations/1.png")}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      {/* Dark content card */}
      <View
        style={[styles.content, { paddingBottom: insets.bottom + spacing[8] }]}
      >
        <Text style={styles.heading}>{"Welcome\nback."}</Text>
        <Text style={styles.subheading}>
          Enter your email and we&apos;ll send a magic link.
        </Text>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Email field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>EMAIL</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(v) => {
              setEmail(v);
              setError(null);
            }}
            placeholder="you@example.com"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="send"
            onSubmitEditing={handleMagicLink}
          />
        </View>

        {/* Primary CTA */}
        <TouchableOpacity
          style={[
            styles.primaryButton,
            (loading || googleLoading) && styles.buttonDisabled,
          ]}
          onPress={handleMagicLink}
          disabled={loading || googleLoading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color={colors.primary} size="small" />
          ) : (
            <Text style={styles.primaryButtonText}>Send magic link</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google */}
        <TouchableOpacity
          style={[
            styles.googleButton,
            (loading || googleLoading) && styles.buttonDisabled,
          ]}
          onPress={handleGoogle}
          disabled={loading || googleLoading}
          activeOpacity={0.85}
        >
          {googleLoading ? (
            <ActivityIndicator color={colors.card} size="small" />
          ) : (
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          )}
        </TouchableOpacity>

        {/* Footer link */}
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/signup")}
          activeOpacity={0.7}
        >
          <Text style={styles.footerText}>
            No account?{"  "}
            <Text style={styles.footerLink}>Create one</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  },
  heroImage: {
    width: "100%",
    height: 280,
    alignSelf: "center",
  },
  content: {
    backgroundColor: colors.foreground,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[6],
    gap: spacing[4],
    borderTopWidth: 2,
    borderTopColor: colors.foreground,
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
    marginTop: -spacing[2],
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
    marginTop: spacing[2],
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
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2a2824",
  },
  dividerText: {
    fontFamily: "sans-semibold",
    fontSize: 10,
    letterSpacing: 2,
    color: colors.mutedForeground,
  },
  googleButton: {
    paddingVertical: spacing[4],
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#2a2824",
  },
  googleButtonText: {
    fontFamily: "sans-semibold",
    fontSize: 15,
    color: colors.card,
    letterSpacing: 0.2,
  },
  footerText: {
    fontFamily: "sans-regular",
    fontSize: 13,
    color: colors.mutedForeground,
    textAlign: "center",
    paddingBottom: spacing[2],
  },
  footerLink: {
    fontFamily: "sans-semibold",
    color: colors.accent,
  },
});
