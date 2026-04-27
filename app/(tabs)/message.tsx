import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius, spacing } from "../../constants/themes";

const THREADS = [
  {
    id: 1,
    name: "Nairobi Roadsters",
    lastMsg: "Who's down for Nakuru this weekend?",
    time: "2m",
    unread: 3,
    avatarColor: "#C9A96E",
  },
  {
    id: 2,
    name: "Alex K.",
    lastMsg: "Shared a route with you 📍",
    time: "1h",
    unread: 1,
    avatarColor: "#6E9E8F",
  },
  {
    id: 3,
    name: "Coastal Crew",
    lastMsg: "Mombasa road trip locked in 🔥",
    time: "3h",
    unread: 0,
    avatarColor: "#A96E6E",
  },
  {
    id: 4,
    name: "Priya M.",
    lastMsg: "Thanks for the tip on Hell's Gate!",
    time: "Yesterday",
    unread: 0,
    avatarColor: "#6E8FA9",
  },
];

export default function MessageScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + spacing[6],
          paddingBottom: insets.bottom + spacing[8],
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.heading}>Messages</Text>
          <Text style={styles.sub}>Your travel crew.</Text>
        </View>
        <TouchableOpacity style={styles.newButton} activeOpacity={0.8}>
          <Text style={styles.newButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Thread list */}
      <View style={styles.threadList}>
        {THREADS.map((thread, index) => (
          <TouchableOpacity
            key={thread.id}
            style={[
              styles.threadCard,
              index < THREADS.length - 1 && styles.threadCardBorder,
            ]}
            activeOpacity={0.75}
          >
            {/* Avatar */}
            <View
              style={[styles.avatar, { backgroundColor: thread.avatarColor }]}
            >
              <Text style={styles.avatarText}>{thread.name[0]}</Text>
            </View>

            {/* Content */}
            <View style={styles.threadContent}>
              <View style={styles.threadTop}>
                <Text style={styles.threadName}>{thread.name}</Text>
                <Text style={styles.threadTime}>{thread.time}</Text>
              </View>
              <View style={styles.threadBottom}>
                <Text
                  style={[
                    styles.threadMsg,
                    thread.unread > 0 && styles.threadMsgUnread,
                  ]}
                  numberOfLines={1}
                >
                  {thread.lastMsg}
                </Text>
                {thread.unread > 0 ? (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{thread.unread}</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing[6],
    gap: spacing[6],
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  heading: {
    fontFamily: "sans-extrabold",
    fontSize: 34,
    letterSpacing: -1,
    color: colors.foreground,
  },
  sub: {
    fontFamily: "sans-regular",
    fontSize: 14,
    color: colors.mutedForeground,
    marginTop: spacing[1],
  },
  newButton: {
    backgroundColor: colors.foreground,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radius.md,
    marginTop: spacing[1],
  },
  newButtonText: {
    fontFamily: "sans-semibold",
    fontSize: 13,
    color: colors.accent,
    letterSpacing: 0.2,
  },
  threadList: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: "hidden",
  },
  threadCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    gap: spacing[3],
  },
  threadCardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "sans-bold",
    fontSize: 16,
    color: colors.card,
  },
  threadContent: {
    flex: 1,
    gap: spacing[1],
  },
  threadTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  threadName: {
    fontFamily: "sans-bold",
    fontSize: 15,
    color: colors.foreground,
    letterSpacing: -0.2,
  },
  threadTime: {
    fontFamily: "sans-regular",
    fontSize: 11,
    color: colors.mutedForeground,
  },
  threadBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[2],
  },
  threadMsg: {
    flex: 1,
    fontFamily: "sans-regular",
    fontSize: 13,
    color: colors.mutedForeground,
  },
  threadMsgUnread: {
    fontFamily: "sans-semibold",
    color: colors.foreground,
  },
  unreadBadge: {
    backgroundColor: colors.accent,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  unreadText: {
    fontFamily: "sans-bold",
    fontSize: 10,
    color: colors.foreground,
  },
});
