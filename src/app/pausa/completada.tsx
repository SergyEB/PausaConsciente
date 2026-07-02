// app/pause-complete.tsx
import { useRouter } from "expo-router";
import { Leaf, Zap } from "lucide-react-native";
import {
  Pressable,
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

export default function PauseCompleteScreen() {
  const router = useRouter();

  const energyBefore = 60;
  const energyAfter = 75;

  return (
    <View style={styles.screen}>
      {/* Fondo suave */}
      <View style={styles.backgroundGlow} />

      {/* Icono principal */}
      <View style={styles.mainIconContainer}>
        <Leaf size={64} color={colors.primaryForeground} />
      </View>

      <Text style={styles.title}>¡Pausa completada!</Text>

      <Text style={styles.pauseInfo}>20 minutos de pausa nocturna</Text>

      <Text style={styles.subtitle}>Tu planta ganó energía.</Text>

      {/* Tarjeta recompensa */}
      <View style={styles.rewardCard}>
        <View style={styles.rewardContent}>
          <View style={styles.rewardLeft}>
            <Zap size={24} color="#fbbf24" />
            <Text style={styles.rewardText}>+15 Energía</Text>
          </View>

          <View style={styles.energyTrack}>
            <View
              style={[
                styles.energyFill,
                { width: `${energyAfter}%` },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("../(tabs)/progreso")}
        >
          <Text style={styles.primaryButtonText}>Ver progreso</Text>
        </Pressable>

        <Pressable
          style={styles.ghostButton}
          onPress={() => router.replace("../(tabs)/inicio")}
        >
          <Text style={styles.ghostButtonText}>Volver al inicio</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // flex-1 flex flex-col p-6 items-center text-center justify-center
  // bg-gradient-to-t from-primary/10 to-background relative overflow-hidden
  screen: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  // Simula el bg-gradient-to-t from-primary/10 to-background
  backgroundGlow: {
    position: "absolute",
    bottom: 0,
    width: "140%",
    height: "55%",
    backgroundColor: "rgba(110,231,183,0.1)",
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
  },

  // w-32 h-32 bg-primary rounded-[2rem] flex items-center justify-center
  // text-primary-foreground mb-6 shadow-xl shadow-primary/30 z-10
  mainIconContainer: {
    width: 128,
    height: 128,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    zIndex: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },

  // text-4xl font-extrabold mb-2 z-10
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.foreground,
    textAlign: "center",
    marginBottom: 8,
    zIndex: 2,
  },

  // text-lg text-foreground font-medium mb-1 z-10
  pauseInfo: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.foreground,
    textAlign: "center",
    marginBottom: 4,
    zIndex: 2,
  },

  // text-muted-foreground mb-8 z-10
  subtitle: {
    fontSize: 16,
    color: colors.mutedForeground,
    textAlign: "center",
    marginBottom: 32,
    zIndex: 2,
  },

  // Card: w-full mb-10 z-10 bg-white/80 backdrop-blur
  rewardCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    zIndex: 2,
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },

  // flex items-center justify-between p-2
  rewardContent: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },

  // flex items-center gap-3
  rewardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  // font-bold text-lg
  rewardText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.foreground,
  },

  // h-2 w-32 bg-muted rounded-full overflow-hidden
  energyTrack: {
    height: 8,
    width: 128,
    backgroundColor: colors.muted,
    borderRadius: 999,
    overflow: "hidden",
  },

  // h-full bg-yellow-500
  energyFill: {
    height: "100%",
    backgroundColor: "#fbbf24",
    borderRadius: 999,
  },

  // w-full space-y-3 z-10
  buttonsContainer: {
    width: "100%",
    gap: 12,
    zIndex: 2,
  },

  // Button primary
  primaryButton: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 3,
  },

  primaryButtonText: {
    color: colors.primaryForeground,
    fontWeight: "600",
    fontSize: 16,
  },

  // Button ghost
  ghostButton: {
    width: "100%",
    backgroundColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  ghostButtonText: {
    color: colors.mutedForeground,
    fontWeight: "600",
    fontSize: 16,
  },
});