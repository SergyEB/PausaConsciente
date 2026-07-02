// app/goal-detail.tsx
import { useRouter } from "expo-router";
import { ArrowLeft, Award, Smile } from "lucide-react-native";
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

export default function GoalDetailScreen() {
  const router = useRouter();

  // Luego estos datos los puedes traer desde Context, Firebase o params.
  const state = {
    goal: "Hacer 3 pausas al día",
    reason: "Dormir mejor",
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>

        <Text style={styles.headerTitle}>Tu meta actual</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Icono principal */}
        <View style={styles.iconContainer}>
          <Award size={40} color={colors.primaryForeground} />
        </View>

        {/* Meta */}
        <Text style={styles.goalTitle}>{state.goal}</Text>

        <Text style={styles.reasonText}>Motivo: {state.reason}</Text>

        {/* Recomendación */}
        <View style={styles.recommendationCard}>
          <View style={styles.recommendationRow}>
            <View style={styles.recommendationIcon}>
              <Smile size={24} color={colors.accentForeground} />
            </View>

            <View style={styles.recommendationTextContainer}>
              <Text style={styles.recommendationTitle}>Recomendación</Text>

              <Text style={styles.recommendationText}>
                Estás trabajando en dormir mejor. Una pausa nocturna puede
                ayudarte a desconectarte poco a poco.
              </Text>
            </View>
          </View>
        </View>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.outlineButton}
            onPress={() => router.push("../perfil/editar-meta")}
          >
            <Text style={styles.outlineButtonText}>Editar meta</Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push("../(tabs)/inicio")}
          >
            <Text style={styles.primaryButtonText}>Volver al inicio</Text>
          </Pressable>
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

  // Header original: flex items-center justify-between p-4
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

  // flex-1 pt-6 flex flex-col items-center text-center
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: "center",
  },

  // w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: "rgba(110,231,183,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  // text-2xl font-bold mb-2
  goalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.foreground,
    textAlign: "center",
    marginBottom: 8,
  },

  // text-muted-foreground mb-8
  reasonText: {
    fontSize: 16,
    color: colors.mutedForeground,
    textAlign: "center",
    marginBottom: 32,
  },

  // Card w-full text-left bg-accent/30 border-none mb-8
  recommendationCard: {
    width: "100%",
    backgroundColor: "rgba(209,250,229,0.3)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 0,
  },

  // flex gap-4
  recommendationRow: {
    flexDirection: "row",
    gap: 16,
  },

  // mt-1 text-accent-foreground
  recommendationIcon: {
    marginTop: 4,
  },

  recommendationTextContainer: {
    flex: 1,
  },

  // font-bold text-foreground mb-1
  recommendationTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: 4,
  },

  // text-sm text-muted-foreground leading-relaxed
  recommendationText: {
    fontSize: 14,
    color: colors.mutedForeground,
    lineHeight: 22,
  },

  // w-full space-y-3 mt-auto
  buttonsContainer: {
    width: "100%",
    gap: 12,
    marginTop: "auto",
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

  // Button primary: bg-primary text-primary-foreground rounded-full
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
});