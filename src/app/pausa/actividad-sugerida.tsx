// app/pause-activity.tsx
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Check,
  Droplets,
} from "lucide-react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const colors = {
  background: "#fafaf9",
  foreground: "#2d3748",
  primary: "#6ee7b7",
  primaryForeground: "#064e3b",
  secondary: "#e0e7ff",
  secondaryForeground: "#3730a3",
  mutedForeground: "#64748b",
  border: "#e2e8f0",
};

export default function PauseActivityScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>

        <Text style={styles.headerTitle}>Actividad sugerida</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <View style={styles.content}>
        {/* Icono principal */}
        <View style={styles.activityIconContainer}>
          <Droplets size={48} color={colors.secondaryForeground} />
        </View>

        <Text style={styles.title}>Toma un vaso de agua</Text>

        <Text style={styles.description}>
          Hidratarte ayuda a mantener la concentración y reduce la fatiga.
        </Text>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.back()}
          >
            <Check size={20} color={colors.primaryForeground} />
            <Text style={styles.primaryButtonText}>Lo hice</Text>
          </Pressable>

          <Pressable
            style={styles.outlineButton}
            onPress={() => router.back()}
          >
            <Text style={styles.outlineButtonText}>Cambiar actividad</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // flex-1 bg-background
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header original:
  // flex items-center justify-between p-4 bg-background/80
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
    textAlign: "center",
  },

  // w-10
  headerRightSpace: {
    width: 40,
  },

  // flex-1 pt-12 flex flex-col items-center text-center
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: "center",
  },

  // w-32 h-32 bg-secondary rounded-full flex items-center justify-center mb-8
  activityIconContainer: {
    width: 128,
    height: 128,
    borderRadius: 999,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },

  // text-3xl font-bold mb-4
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.foreground,
    textAlign: "center",
    marginBottom: 16,
  },

  // text-muted-foreground text-lg mb-12 px-4
  description: {
    fontSize: 18,
    color: colors.mutedForeground,
    textAlign: "center",
    lineHeight: 27,
    marginBottom: 48,
    paddingHorizontal: 16,
  },

  // w-full space-y-3 mt-auto
  buttonsContainer: {
    width: "100%",
    gap: 12,
    marginTop: "auto",
  },

  // Button primary
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
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 3,
  },

  primaryButtonText: {
    color: colors.primaryForeground,
    fontWeight: "600",
    fontSize: 16,
  },

  // Button outline
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