// app/(tabs)/garden.tsx
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Award, Leaf } from "lucide-react-native";
import {
  Image,
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
  secondary: "#e0e7ff",
  secondaryForeground: "#3730a3",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  accent: "#d1fae5",
  accentForeground: "#065f46",
  border: "#e2e8f0",
};

export default function GardenScreen() {
  const router = useRouter();

  const state = {
    stats: {
      gardenLevel: 3,
      energy: 75,
    },
  };

  return (
    <LinearGradient
      colors={["rgba(224,231,255,0.35)", "rgba(209,250,229,0.45)"]}
      style={styles.screen}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Mi jardín</Text>
          <Text style={styles.subtitle}>Nivel {state.stats.gardenLevel}</Text>
        </View>

        <Pressable
          style={styles.achievementsButton}
          onPress={() => router.push("../progreso/logros")}
        >
          <Award size={18} color={colors.foreground} />
          <Text style={styles.achievementsButtonText}>Logros</Text>
        </Pressable>
      </View>

      {/* Imagen del jardín */}
      <View style={styles.gardenContainer}>
 

        <Image
          source={require("../../../assets/images/jardin.png")}
          style={styles.gardenImage}
          resizeMode="contain"
        />

     
      </View>

      {/* Tarjeta de energía */ }
      <View style={styles.energyCard}>
        <View style={styles.energyHeader}>
          <View>
            <Text style={styles.energyLabel}>Energía</Text>

            <Text style={styles.energyNumber}>
              {state.stats.energy}
              <Text style={styles.energyTotal}>/100</Text>
            </Text>
          </View>

          <View style={styles.rewardContainer}>
            <Text style={styles.rewardSmallText}>Próxima recompensa</Text>

            <View style={styles.rewardRow}>
              <Leaf size={14} color={colors.foreground} />
              <Text style={styles.rewardText}>Nueva planta</Text>
            </View>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${state.stats.energy}%` },
            ]}
          />
        </View>

        <Text style={styles.energyDescription}>
          Cada pausa completada ayuda a tu jardín a crecer.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // flex-1 p-6 pb-24 relative overflow-hidden bg-gradient-to-b
  screen: {
    flex: 1,
    padding: 24,
    paddingBottom: 96,
    backgroundColor: colors.background,
    overflow: "hidden",
  },

  // pt-4 mb-4 relative z-10 flex justify-between items-center
  header: {
    paddingTop: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
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
    color: colors.mutedForeground,
    fontSize: 16,
  },

  // Button outline w-auto px-4 h-10 py-0 rounded-full bg-white/50
  achievementsButton: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: "rgba(255,255,255,0.55)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  achievementsButtonText: {
    color: colors.foreground,
    fontWeight: "600",
    fontSize: 14,
  },

  // flex-1 flex flex-col items-center justify-center relative z-10
  gardenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 2,
    marginTop: 8,
    marginBottom: 16,
  },

  // reemplaza el blur blanco del prototipo, para que la imagen no se vea pegada al fondo
  imageGlow: {
    width: 290,
    height: 290,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.42)",
    position: "absolute",
  },

  // Imagen central del jardín
  gardenImage: {
    width: "100%",
    maxWidth: 310,
    height: 310,
    zIndex: 3,
  },

  // sombra inferior para dar profundidad
  shadowOval: {
    width: 180,
    height: 18,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.10)",
    marginTop: -18,
  },

  // relative z-10 bg-white/80 backdrop-blur border-none mt-auto
  energyCard: {
    backgroundColor: "rgba(255,255,255,0.86)",
    borderRadius: 16,
    padding: 20,
    marginTop: "auto",
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
  },

  // flex justify-between items-end mb-2
  energyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 8,
  },

  // text-sm font-bold text-muted-foreground uppercase
  energyLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.mutedForeground,
    textTransform: "uppercase",
  },

  // text-2xl font-black
  energyNumber: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.foreground,
  },

  // text-sm text-muted-foreground
  energyTotal: {
    fontSize: 14,
    color: colors.mutedForeground,
  },

  // text-right
  rewardContainer: {
    alignItems: "flex-end",
  },

  // text-xs text-muted-foreground mb-1
  rewardSmallText: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginBottom: 4,
  },

  // font-bold text-sm flex items-center justify-end gap-1
  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },

  rewardText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.foreground,
  },

  // h-3 w-full bg-muted rounded-full overflow-hidden
  progressTrack: {
    height: 12,
    width: "100%",
    backgroundColor: colors.muted,
    borderRadius: 999,
    overflow: "hidden",
  },

  // h-full bg-primary
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 999,
  },

  // text-center text-xs text-muted-foreground mt-4 font-medium
  energyDescription: {
    textAlign: "center",
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: 16,
    fontWeight: "500",
  },
});