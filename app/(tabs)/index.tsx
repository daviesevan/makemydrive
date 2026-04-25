import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../../constants/themes";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "../../lib/auth";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignOut() {
    setLoading(true);
    setError(null);
    const { error } = await signOut();
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.replace("/(auth)/signin" as never);
  }

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.topBar}>
        <Text style={styles.logo}>makemydrivefun</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.greeting}>{session?.user.email ?? "Welcome"}</Text>
        <Text style={styles.sub}>You're signed in.</Text>
      </View>

      <View style={styles.footer}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.signOutBtn, loading && styles.signOutBtnDisabled]}
          onPress={handleSignOut}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={colors.foreground} size="small" />
          ) : (
            <Text style={styles.signOutText}>Sign out</Text>
          )}
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
  topBar: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
    borderBottomWidth: 1.5,
    borderBottomColor: colors.border,
  },
  logo: {
    fontFamily: "sans-extrabold",
    fontSize: 16,
    letterSpacing: -0.5,
    color: colors.foreground,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing[6],
    justifyContent: "center",
    gap: spacing[2],
  },
  greeting: {
    fontFamily: "sans-bold",
    fontSize: 20,
    color: colors.foreground,
    letterSpacing: -0.4,
  },
  sub: {
    fontFamily: "sans-regular",
    fontSize: 14,
    color: colors.mutedForeground,
  },
  footer: {
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[6],
    gap: spacing[3],
  },
  errorText: {
    fontFamily: "sans-regular",
    fontSize: 13,
    color: "#ff6b6b",
    textAlign: "center",
  },
  signOutBtn: {
    backgroundColor: colors.foreground,
    paddingVertical: spacing[4],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.foreground,
  },
  signOutBtnDisabled: {
    opacity: 0.5,
  },
  signOutText: {
    fontFamily: "sans-bold",
    fontSize: 15,
    color: colors.background,
    letterSpacing: 0.2,
  },
});
