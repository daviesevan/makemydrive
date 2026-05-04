import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, spacing } from "../../constants/themes";
import { resendOtp, verifyOtp } from "../../lib/auth";

const RESEND_COOLDOWN = 60; // seconds

export default function VerifyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const [resending, setResending] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startCooldown() {
    setCooldown(RESEND_COOLDOWN);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const handleVerify = useCallback(
    async (token: string) => {
      if (!email) return;
      setError(null);
      setLoading(true);
      const { error } = await verifyOtp(email, token);
      setLoading(false);
      if (error) {
        setError("Invalid or expired code. Try again.");
        setCode("");
        inputRef.current?.focus();
        return;
      }
      // Session is now set — AuthContext listener fires and updates navigation
    },
    [email],
  );

  // Start countdown on mount
  useEffect(() => {
    startCooldown();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Auto-verify once 6 digits are entered
  useEffect(() => {
    if (code.length === 6) handleVerify(code);
  }, [code, handleVerify]);

  async function handleResend() {
    if (!email || cooldown > 0) return;
    setError(null);
    setResending(true);
    const { error } = await resendOtp(email);
    setResending(false);
    if (error) {
      setError(error.message);
      return;
    }
    setCode("");
    startCooldown();
  }

  // Build the 6 display boxes from the current code string
  const digits = code.split("").concat(Array(6).fill("")).slice(0, 6);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/animations/verify.png")}
          style={styles.headerIcon}
          resizeMode="contain"
        />
      </View>

      {/* Dark content card */}
      <View
        style={[styles.content, { paddingBottom: insets.bottom + spacing[8] }]}
      >
        <Text style={styles.heading}>{"Check your\ninbox."}</Text>
        <Text style={styles.subheading}>
          {"We sent a 6-digit code to\n"}
          <Text style={styles.emailHighlight}>{email}</Text>
        </Text>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* OTP display — tapping focuses the hidden input */}
        <TouchableOpacity
          style={styles.otpRow}
          onPress={() => inputRef.current?.focus()}
          activeOpacity={1}
        >
          {digits.map((digit, i) => (
            <View
              key={i}
              style={[
                styles.otpBox,
                digit ? styles.otpBoxFilled : null,
                i === code.length && !loading ? styles.otpBoxActive : null,
              ]}
            >
              {loading && i === 0 && !digit ? (
                <ActivityIndicator color={colors.accent} size="small" />
              ) : (
                <Text style={styles.otpDigit}>{digit}</Text>
              )}
            </View>
          ))}
        </TouchableOpacity>

        {/* Hidden input that drives the OTP display */}
        <TextInput
          ref={inputRef}
          style={styles.hiddenInput}
          value={code}
          onChangeText={(v) => {
            const cleaned = v.replace(/\D/g, "").slice(0, 6);
            setCode(cleaned);
            setError(null);
          }}
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
          caretHidden
          selectTextOnFocus={false}
        />

        <Text style={styles.hint}>
          Tap the boxes above, then type your code.
        </Text>

        {/* Resend */}
        <TouchableOpacity
          onPress={handleResend}
          disabled={cooldown > 0 || resending}
          activeOpacity={0.7}
          style={styles.resendButton}
        >
          {resending ? (
            <ActivityIndicator color={colors.mutedForeground} size="small" />
          ) : (
            <Text
              style={[styles.resendText, cooldown > 0 && styles.resendDisabled]}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
            </Text>
          )}
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
  header: {
    flex: 1,
    paddingHorizontal: spacing[6],
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    width: "100%",
    height: 300,
    alignSelf: "center",
    marginTop: -spacing[6],
  },
  sprocketStrip: {
    flexDirection: "row",
    gap: spacing[3],
    alignSelf: "flex-start",
    paddingBottom: spacing[4],
  },
  sprocketHole: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: colors.mutedForeground,
  },
  content: {
    backgroundColor: colors.foreground,
    paddingHorizontal: spacing[6],
    paddingTop: spacing[8],
    gap: spacing[5],
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
  emailHighlight: {
    fontFamily: "sans-semibold",
    color: colors.accent,
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
  otpRow: {
    flexDirection: "row",
    gap: spacing[2],
    justifyContent: "space-between",
  },
  otpBox: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 52,
    borderWidth: 1.5,
    borderColor: "#2a2824",
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1c1a18",
  },
  otpBoxFilled: {
    borderColor: colors.mutedForeground,
    backgroundColor: "#242018",
  },
  otpBoxActive: {
    borderColor: colors.accent,
    borderWidth: 2,
  },
  otpDigit: {
    fontFamily: "sans-bold",
    fontSize: 22,
    color: colors.card,
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
  hint: {
    fontFamily: "sans-regular",
    fontSize: 12,
    color: "#3a3630",
    textAlign: "center",
    marginTop: -spacing[2],
  },
  resendButton: {
    alignSelf: "center",
    paddingVertical: spacing[2],
  },
  resendText: {
    fontFamily: "sans-semibold",
    fontSize: 14,
    color: colors.accent,
    letterSpacing: 0.2,
  },
  resendDisabled: {
    color: colors.mutedForeground,
  },
});
