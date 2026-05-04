import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/themes";

interface NotificationBadgeProps {
  children: React.ReactNode;
  count?: number;
  onPress?: () => void;
}

export function NotificationBadge({
  children,
  count = 1,
  onPress,
}: NotificationBadgeProps) {
  const [visible, setVisible] = useState(true);

  function handlePress() {
    setVisible((v) => !v);
    onPress?.();
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={styles.wrapper}
    >
      {children}
      {visible && count > 0 ? (
        <View style={styles.badge}>
          {/* intentionally no Text for a clean dot; swap in Text if you want the count */}
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
});