// app/(tabs)/progress.tsx
import { useRouter } from "expo-router";
import { Award, Zap } from "lucide-react-native";
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
  secondary: "#e0e7ff",
  secondaryForeground: "#3730a3",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  border: "#e2e8f0",
  switchBackground: "#cbd5e1",
};

export default function ProgressScreen() {
  const router = useRouter();

  const state = {
    stats: {
      completedToday: 2,
      minutesRested: 35,
      streak: 5,
    },
  };

  const data = [
    { name: "L", pausas: 2 },
    { name: "M", pausas: 3 },
    { name: "M", pausas: 1 },
    { name: "J", pausas: 4 },
    { name: "V", pausas: 2 },
    { name: "S", pausas: 0 },
    { name: "D", pausas: 0 },
  ];

  const maxPausas = 4;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Tu progreso</Text>
        <Text style={styles.subtitle}>
          Esta semana has completado 12 pausas.
        </Text>
      </View>

      {/* Tarjetas superiores */}
      <View style={styles.statsGrid}>
        <View style={[styles.card, styles.smallStatCard]}>
          <Text style={styles.statLabel}>Pausas</Text>
          <Text style={styles.bigNumber}>{state.stats.completedToday}</Text>
        </View>

        <View style={[styles.card, styles.smallStatCard]}>
          <Text style={styles.statLabel}>Minutos</Text>
          <Text style={styles.bigNumber}>{state.stats.minutesRested}</Text>
        </View>

        <View style={[styles.card, styles.streakCard]}>
          <View>
            <Text style={styles.statLabel}>Racha</Text>
            <View style={styles.streakRow}>
              <Text style={styles.bigNumber}>{state.stats.streak} días</Text>
              <Zap size={24} color="#fbbf24" />
            </View>
          </View>

          <View style={styles.awardIconContainer}>
            <Award size={24} color={colors.secondaryForeground} />
          </View>
        </View>
      </View>

      {/* Gráfico semanal */}
      <View style={[styles.card, styles.chartCard]}>
        <Text style={styles.chartTitle}>Pausas esta semana</Text>

        <View style={styles.chartContainer}>
          {data.map((item, index) => {
            const barHeight = Math.max((item.pausas / maxPausas) * 130, 8);
            const isHighlighted = index === 1;

            return (
              <View key={`${item.name}-${index}`} style={styles.barItem}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        backgroundColor: isHighlighted
                          ? colors.primary
                          : colors.switchBackground,
                      },
                    ]}
                  />
                </View>

                <Text style={styles.barLabel}>{item.name}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Botón historial */}
      <Pressable
        style={styles.outlineButton}
        onPress={() => router.push("../progreso/historial")}
      >
        <Text style={styles.outlineButtonText}>Ver historial</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // flex-1 bg-background
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // p-6 pb-24
  content: {
    padding: 24,
    paddingBottom: 96,
  },

  // pt-4 mb-6
  header: {
    paddingTop: 16,
    marginBottom: 24,
  },

  // text-2xl font-extrabold mb-1
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.foreground,
    marginBottom: 4,
  },

  // text-muted-foreground
  subtitle: {
    fontSize: 16,
    color: colors.mutedForeground,
  },

  // grid grid-cols-2 gap-4 mb-6
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
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

  // p-4
  smallStatCard: {
    width: "47.5%",
    padding: 16,
  },

  // text-sm text-muted-foreground font-semibold uppercase mb-1
  statLabel: {
    fontSize: 14,
    color: colors.mutedForeground,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
  },

  // text-3xl font-black
  bigNumber: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.foreground,
  },

  // col-span-2 p-4 flex items-center justify-between
  streakCard: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // flex items-center gap-2
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  // w-12 h-12 bg-secondary rounded-full flex items-center justify-center
  awardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  // p-5 mb-6
  chartCard: {
    padding: 20,
    marginBottom: 24,
  },

  // font-bold mb-4
  chartTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: 16,
  },

  // h-48 w-full
  chartContainer: {
    height: 192,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 12,
  },

  barItem: {
    flex: 1,
    alignItems: "center",
  },

  barTrack: {
    height: 150,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  // radius [4,4,4,4]
  bar: {
    width: 22,
    borderRadius: 4,
  },

  barLabel: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: 10,
  },

  // Button outline: border-2 border-border rounded-full
  outlineButton: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  outlineButtonText: {
    color: colors.foreground,
    fontWeight: "600",
    fontSize: 16,
  },
});