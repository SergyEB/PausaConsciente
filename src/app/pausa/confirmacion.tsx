// app/create-pause-confirm.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { Check } from "lucide-react-native";
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
  mutedForeground: "#64748b",
  border: "#e2e8f0",
};

export default function CreatePauseConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const pauseType = params.type?.toString() || "Pausa de estudio";
  const duration = params.duration?.toString() || "10";
  const startTime = params.startTime?.toString() || "4:00 p. m.";
  const frequency = params.frequency?.toString() || "Diaria";
  const activity = params.activity?.toString() || "Tomar agua";

  return (
    <View style={styles.screen}>
      {/* Fondo suave del gradiente original */}
      <View style={styles.backgroundGlow} />

      {/* Icono principal */}
      <View style={styles.iconContainer}>
        <Check size={48} color={colors.primaryForeground} strokeWidth={3} />
      </View>

      <Text style={styles.title}>¡Pausa creada!</Text>

      <Text style={styles.subtitle}>
        Tu {pauseType.toLowerCase()} quedó programada para las {startTime}.
      </Text>

      {/* Tarjeta resumen */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Duración</Text>
            <Text style={styles.summaryValue}>{duration} min</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Frecuencia</Text>
            <Text style={styles.summaryValue}>{frequency}</Text>
          </View>

          <View style={styles.summaryItemFull}>
            <Text style={styles.summaryLabel}>Actividad</Text>
            <Text style={styles.summaryValue}>{activity}</Text>
          </View>
        </View>
      </View>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.replace("../(tabs)/pausas")}
        >
          <Text style={styles.primaryButtonText}>Ver mis pausas</Text>
        </Pressable>

        <Pressable
          style={styles.ghostButton}
          onPress={() => router.replace("../(tabs)/inicio")}
        >
          <Text style={styles.ghostButtonText}>Ir al inicio</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // flex-1 flex flex-col p-6 items-center text-center justify-center
  // bg-gradient-to-t from-primary/10 to-background
  screen: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  // Simula el gradiente from-primary/10 to-background
  backgroundGlow: {
    position: "absolute",
    bottom: 0,
    width: "140%",
    height: "55%",
    backgroundColor: "rgba(110,231,183,0.1)",
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
  },

  // w-24 h-24 bg-primary text-primary-foreground rounded-full
  // flex items-center justify-center mb-6 shadow-xl shadow-primary/30
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 999,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
    zIndex: 2,
  },

  // text-3xl font-extrabold mb-2
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.foreground,
    textAlign: "center",
    marginBottom: 8,
    zIndex: 2,
  },

  // text-muted-foreground mb-8
  subtitle: {
    fontSize: 16,
    color: colors.mutedForeground,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
    zIndex: 2,
  },

  // Card: w-full text-left mb-8 border-none bg-white/60 backdrop-blur
  summaryCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
    zIndex: 2,
  },

  // grid grid-cols-2 gap-4
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },

  summaryItem: {
    width: "47%",
  },

  // col-span-2
  summaryItemFull: {
    width: "100%",
  },

  // text-xs text-muted-foreground uppercase font-bold mb-1
  summaryLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.mutedForeground,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  // font-semibold
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.foreground,
  },

  // w-full space-y-3
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