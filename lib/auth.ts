import { supabase } from "./supabase";

// Google Sign-In is a native module — only available in custom dev builds,
// not in Expo Go. We lazy-load it so the module doesn't crash on import.
let _GoogleSignin: any = null;
let _isSuccessResponse: any = null;
let _statusCodes: any = null;

function getGoogleSignIn() {
  if (!_GoogleSignin) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod =
        require("@react-native-google-signin/google-signin") as typeof import("@react-native-google-signin/google-signin");
      _GoogleSignin = mod.GoogleSignin;
      _isSuccessResponse = mod.isSuccessResponse;
      _statusCodes = mod.statusCodes;
    } catch {
      // Native module not available (e.g. running in Expo Go)
    }
  }
  return {
    GoogleSignin: _GoogleSignin,
    isSuccessResponse: _isSuccessResponse,
    statusCodes: _statusCodes,
  };
}

// Call once at app startup (inside AuthProvider)
export function configureGoogleSignIn() {
  const { GoogleSignin } = getGoogleSignIn();
  if (!GoogleSignin) return; // not available in Expo Go
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });
}

// ─── Magic Link ────────────────────────────────────────────────────────────────
// Sends a magic link to the user's email. The link will open the app via the
// deep-link scheme and the token is exchanged in the root layout's URL handler.
export async function signInWithMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: "makemydrivefun://auth/callback",
    },
  });
  return { error };
}

// ─── Google OAuth ──────────────────────────────────────────────────────────────
// Uses the native Google Sign-In SDK to get an ID token, then exchanges it
// with Supabase for a session via signInWithIdToken.
export async function signInWithGoogle() {
  const { GoogleSignin, isSuccessResponse, statusCodes } = getGoogleSignIn();

  if (!GoogleSignin) {
    return {
      data: null,
      error: new Error(
        "Google Sign-In is not available in Expo Go. Build a development client to use this feature.",
      ),
    };
  }

  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();

    if (!isSuccessResponse(response)) {
      return {
        data: null,
        error: new Error("Google sign-in returned no response"),
      };
    }

    const idToken = response.data.idToken;
    if (!idToken) {
      return {
        data: null,
        error: new Error("No ID token received from Google"),
      };
    }

    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });

    return { data, error };
  } catch (err: any) {
    if (err.code === statusCodes.SIGN_IN_CANCELLED) {
      return { data: null, error: new Error("Sign-in cancelled") };
    }
    if (err.code === statusCodes.IN_PROGRESS) {
      return { data: null, error: new Error("Sign-in already in progress") };
    }
    if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      return {
        data: null,
        error: new Error("Google Play Services not available"),
      };
    }
    return { data: null, error: err };
  }
}
// ─── Verify OTP ───────────────────────────────────────────────────────────────
// Called on the verify screen after the user types the 6-digit code from the
// magic link email.
export async function verifyOtp(email: string, token: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
  return { data, error };
}

// ─── Resend OTP ───────────────────────────────────────────────────────────────
export async function resendOtp(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: "makemydrivefun://auth/callback",
    },
  });
  return { error };
}
// ─── Sign Out ─────────────────────────────────────────────────────────────────
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}
