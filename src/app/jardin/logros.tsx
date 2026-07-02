// app/achievements.tsx
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Check,
  Eye,
  Moon,
  Smile,
  Zap,
} from "lucide-react-native";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const colors = {
  background: "#fafaf9",
  foreground: "#2d3748",
  card: "#ffffff",
  primary: "#6ee7b7",
  primaryForeground: "#064e3b",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  border: "#e2e8f0",
};

type Achievement = {
  name: string;
  desc: string;
  unlocked: boolean;
  Icon: React.ElementType;
};

export default function AchievementsScreen() {
  const router = useRouter();

  const badges: Achievement[] = [
    {
      name: "Primera pausa",
      desc: "Completaste tu primera pausa.",
      Icon: Check,
      unlocked: true,
    },
    {
      name: "Tripleta",
      desc: "Tres pausas en un día.",
      Icon: Zap,
      unlocked: true,
    },
    {
      name: "Constancia",
      desc: "Tres días seguidos.",
      Icon: Calendar,
      unlocked: true,
    },
    {
      name: "Búho",
      desc: "Primera pausa nocturna.",
      Icon: Moon,
      unlocked: true,
    },
    {
      name: "Vista lince",
      desc: "Primera pausa visual.",
      Icon: Eye,
      unlocked: false,
    },
    {
      name: "Zen",
      desc: "Una semana cuidando tu descanso.",
      Icon: Smile,
      unlocked: false,
    },
  ];

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>

        <Text style={styles.headerTitle}>Mis logros</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {badges.map((badge) => {
            const Icon = badge.Icon;

            return (
              <Pressable
                key={badge.name}
                disabled={!badge.unlocked}
                style={[
                  styles.card,
                  styles.achievementCard,
                  !badge.unlocked && styles.lockedCard,
                ]}
                onPress={() => {
                  if (badge.name === "Búho") {
                    router.push("../jardin/logro-detalle");
                  } else {
                    router.push("../jardin/logro-detalle");
                  }
                }}
              >
                <View
                  style={[
                    styles.iconCircle,
                    badge.unlocked
                      ? styles.unlockedIconCircle
                      : styles.lockedIconCircle,
                  ]}
                >
                  <Icon
                    size={32}
                    color={
                      badge.unlocked
                        ? colors.primaryForeground
                        : colors.mutedForeground
                    }
                  />
                </View>

                <Text style={styles.achievementName}>{badge.name}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // flex-1 bg-background
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header: flex items-center justify-between p-4
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(250,250,249,0.8)",
  },

  // p-2 -ml-2 rounded-full
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -8,
  },

  // text-lg font-semibold text-foreground
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.foreground,
  },

  // w-10
  headerRightSpace: {
    width: 40,
  },

  scroll: {
    flex: 1,
  },

  // flex-1 pt-4 grid grid-cols-2 gap-4 overflow-y-auto pb-6
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },

  // grid grid-cols-2 gap-4
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },

  // Card base: bg-card rounded-2xl p-5 shadow border
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },

  // flex flex-col items-center text-center p-4
  achievementCard: {
    width: "47.5%",
    padding: 16,
    alignItems: "center",
  },

  // opacity-50 grayscale
  lockedCard: {
    opacity: 0.5,
  },

  // w-16 h-16 rounded-full flex items-center justify-center mb-3
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  // bg-primary/20 text-primary
  unlockedIconCircle: {
    backgroundColor: "rgba(110,231,183,0.2)",
  },

  // bg-muted text-muted-foreground
  lockedIconCircle: {
    backgroundColor: colors.muted,
  },

  // font-bold text-sm mb-1
  achievementName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.foreground,
    textAlign: "center",
    marginBottom: 4,
  },
});