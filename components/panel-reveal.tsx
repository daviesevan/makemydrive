import { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { colors, radius, spacing } from "../constants/themes";

interface PanelRevealProps {
  children: React.ReactNode;
  label?: string;
}

export function PanelReveal({ children, label = "panel" }: PanelRevealProps) {
  const [open, setOpen] = useState(false);
  const translateY = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  function toggle() {
    const toOpen = !open;
    setOpen(toOpen);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: toOpen ? 0 : 1,
        duration: toOpen ? 400 : 350,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: toOpen ? 1 : 0,
        duration: toOpen ? 400 : 350,
        useNativeDriver: true,
      }),
    ]).start();
  }

  const animatedStyle = {
    opacity,
    transform: [
      {
        translateY: translateY.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 60],
        }),
      },
    ],
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggle}
        activeOpacity={0.8}
        style={styles.trigger}
      >
        <Text style={styles.triggerText}>
          {open ? `Hide ${label}` : `Show ${label}`}
        </Text>
      </TouchableOpacity>

      <View style={styles.clipper}>
        <Animated.View style={[styles.panel, animatedStyle]}>
          {children}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    alignSelf: "flex-start",
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  triggerText: {
    fontFamily: "sans-semibold",
    fontSize: 13,
    color: colors.foreground,
    letterSpacing: 0.2,
  },
  clipper: {
    overflow: "hidden",
  },
  panel: {
    paddingTop: spacing[3],
  },
});