import { useFonts } from "expo-font";
import * as Linking from "expo-linking";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import "./global.css";

SplashScreen.preventAutoHideAsync();

// Handles the deep-link that Supabase sends after a magic link is clicked.
// The URL looks like: makemydrivefun://auth/callback#access_token=...&refresh_token=...
async function handleAuthDeepLink(url: string) {
  if (!url.includes("auth/callback")) return;

  const fragment = url.split("#")[1];
  if (!fragment) return;

  const params = new URLSearchParams(fragment);
  const access_token = params.get("access_token");
  const refresh_token = params.get("refresh_token");

  if (access_token && refresh_token) {
    await supabase.auth.setSession({ access_token, refresh_token });
  }
}

function RootLayoutContent() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "sans-regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "sans-bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "sans-medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "sans-semibold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "sans-extrabold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "sans-light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Handle magic link deep links
  useEffect(() => {
    // App opened cold from a magic link tap
    Linking.getInitialURL().then((url) => {
      if (url) handleAuthDeepLink(url);
    });

    // App already open and a magic link is tapped
    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleAuthDeepLink(url);
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (isLoading || !fontsLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isSetDisplayName = segments.join("/") === "(auth)/set-display-name";

    if (session) {
      const metadata = session.user.user_metadata;
      const hasName = metadata?.full_name || metadata?.display_name;

      if (!hasName) {
        if (!isSetDisplayName) {
          router.replace("/(auth)/set-display-name" as never);
        }
      } else if (segments[0] !== "(tabs)") {
        router.replace("/(tabs)" as never);
      }
    } else {
      if (!inAuthGroup && segments[0] !== "onboarding") {
        router.replace("/onboarding" as never);
      }
    }
  }, [session, isLoading, fontsLoaded, segments]);

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}
