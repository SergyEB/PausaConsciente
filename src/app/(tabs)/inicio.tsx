// app/(tabs)/index.tsx
import { useRouter } from "expo-router";
import { Check, Clock, Leaf, Play, User, Zap } from "lucide-react-native";
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
  cardForeground: "#2d3748",
  primary: "#6ee7b7",
  primaryForeground: "#064e3b",
  secondary: "#e0e7ff",
  secondaryForeground: "#3730a3",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  accent: "#d1fae5",
  accentForeground: "#065f46",
  border: "#e2e8f0",
};

export default function HomeScreen() {
  const router = useRouter();

  // Luego estos datos los puedes cambiar por Firebase/Auth/Context.
  const state = {
    user: { name: "Sergio" },
    goal: "Hacer 3 pausas al día",
    stats: {
      completedToday: 2,
      streak: 5,
      gardenLevel: 3,
      energy: 75,
    },
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hola, {state.user.name} 👋</Text>
          <Text style={styles.subtitle}>Listo para un descanso?</Text>
        </View>

        <Pressable
          style={styles.profileButton}
          onPress={() => router.push("/perfil")}
        >
          <User size={24} color={colors.accentForeground} />
        </Pressable>
      </View>

      {/* Meta de hoy */}
      <Pressable
        style={[styles.card, styles.goalCard]}
        onPress={() => router.push("../pausa/meta-actual")}
      >
        <View style={styles.goalContent}>
          <Text style={styles.goalLabel}>Meta de hoy</Text>
          <Text style={styles.goalTitle}>{state.goal}</Text>

          <View style={styles.nextPauseBadge}>
            <Clock size={16} color={colors.primaryForeground} />
            <Text style={styles.nextPauseText}>Próxima: 9:30 p. m.</Text>
          </View>
        </View>

        <Leaf
          size={120}
          color="rgba(0,0,0,0.05)"
          style={styles.goalLeaf}
        />
      </Pressable>

      {/* Estadísticas */}
      <View style={styles.statsGrid}>
        <View style={[styles.card, styles.statCard]}>
          <View style={styles.statIconAccent}>
            <Check size={20} color={colors.accentForeground} />
          </View>
          <Text style={styles.statNumber}>{state.stats.completedToday}</Text>
          <Text style={styles.statLabel}>Pausas hoy</Text>
        </View>

        <View style={[styles.card, styles.statCard]}>
          <View style={styles.statIconSecondary}>
            <Zap size={20} color={colors.secondaryForeground} />
          </View>
          <Text style={styles.statNumber}>{state.stats.streak} días</Text>
          <Text style={styles.statLabel}>Racha actual</Text>
        </View>
      </View>

      {/* Jardín */}
      <View style={styles.gardenCard}>
        <Pressable
        onPress={() => router.push("../jardin")}
        >


          <Text style={styles.gardenTitle}>Tu jardín crece</Text>
          <Text style={styles.gardenSubtitle}>
            Nivel {state.stats.gardenLevel} • {state.stats.energy}/100 energía
          </Text> 


        </Pressable>

      </View>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("../pausa/activa")}
        >
          <Play
            size={20}
            color={colors.primaryForeground}
            fill={colors.primaryForeground}
          />
          <Text style={styles.primaryButtonText}>Iniciar pausa ahora</Text>
        </Pressable>

        <Pressable
          style={styles.outlineButton}
          onPress={() => router.push("../pausa/crear")}
        >
          <Text style={styles.outlineButtonText}>Crear nueva pausa</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // flex-1 + bg-background
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // p-6 + pb-24
  content: {
    padding: 24,
    paddingBottom: 96,
  },

  // flex justify-between items-center mt-4 mb-8
  header: {
    marginTop: 16,
    marginBottom: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // text-2xl font-extrabold text-foreground
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.foreground,
  },

  // text-muted-foreground
  subtitle: {
    color: colors.mutedForeground,
    marginTop: 2,
  },

  // w-12 h-12 bg-accent rounded-full flex items-center justify-center
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },

  // Card base: bg-card rounded-2xl p-5 shadow border
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },

  // bg-primary text-primary-foreground border-none mb-6 relative overflow-hidden
  goalCard: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    marginBottom: 24,
    overflow: "hidden",
    position: "relative",
  },

  // relative z-10
  goalContent: {
    zIndex: 2,
  },

  // text-primary-foreground/80 text-sm font-semibold uppercase tracking-wider mb-1
  goalLabel: {
    color: "rgba(6,78,59,0.8)",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },

  // text-2xl font-bold mb-4
  goalTitle: {
    color: colors.primaryForeground,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },

  // flex items-center gap-2 text-sm bg-black/10 w-fit px-3 py-1.5 rounded-full
  nextPauseBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  nextPauseText: {
    fontSize: 14,
    color: colors.primaryForeground,
  },

  // absolute -bottom-6 -right-6 -rotate-12
  goalLeaf: {
    position: "absolute",
    right: -24,
    bottom: -24,
    transform: [{ rotate: "-12deg" }],
  },

  // grid grid-cols-2 gap-4 mb-8
  statsGrid: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },

  // flex flex-col items-center text-center p-4
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },

  // w-10 h-10 rounded-full bg-accent
  statIconAccent: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  // w-10 h-10 rounded-full bg-secondary
  statIconSecondary: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  // text-2xl font-bold
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.foreground,
  },

  // text-xs text-muted-foreground uppercase font-semibold
  statLabel: {
    fontSize: 12,
    color: colors.mutedForeground,
    textTransform: "uppercase",
    fontWeight: "600",
    textAlign: "center",
  },

  // bg-background border-2 border-border/60 border-dashed rounded-[2rem] p-6 ...
  gardenCard: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: "rgba(226,232,240,0.6)",
    borderStyle: "dashed",
    borderRadius: 32,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    overflow: "hidden",
  },


  // text-lg font-bold mb-1
  gardenTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: 4,
  },

  // text-muted-foreground text-sm mb-4
  gardenSubtitle: {
    color: colors.mutedForeground,
    fontSize: 14,
    marginBottom: 16,
  },

  // space-y-3
  buttonsContainer: {
    gap: 12,
  },

  // Button primary: w-full py-3.5 px-4 rounded-full bg-primary
  primaryButton: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 3,
  },

  primaryButtonText: {
    color: colors.primaryForeground,
    fontWeight: "600",
    fontSize: 16,
  },

  // Button outline: border-2 border-border text-foreground
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