// app/create-pause-type.tsx
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  BookOpen,
  Eye,
  Leaf,
  Moon,
  Zap,
} from "lucide-react-native";
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
  mutedForeground: "#64748b",
  accent: "#d1fae5",
  accentForeground: "#065f46",
  border: "#e2e8f0",
};

const pauseTypes = [
  {
    name: "Pausa de estudio",
    icon: BookOpen,
  },
  {
    name: "Pausa nocturna",
    icon: Moon,
  },
  {
    name: "Pausa visual",
    icon: Eye,
  },
  {
    name: "Pausa de actividad física",
    icon: Zap,
  },
  {
    name: "Pausa libre",
    icon: Leaf,
  },
];

export default function CreatePauseTypeScreen() {
  const router = useRouter();

  const handleSelectPause = (pauseName: string) => {
    router.push({
      pathname: "../pausa/configurar",
      params: {
        type: pauseName,
      },
    });
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>

        <Text style={styles.headerTitle}>Crear pausa</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Elige el tipo de pausa que necesitas.</Text>

        <View style={styles.optionsContainer}>
          {pauseTypes.map((pause) => {
            const Icon = pause.icon;

            return (
              <Pressable
                key={pause.name}
                style={({ pressed }) => [
                  styles.card,
                  styles.optionCard,
                  pressed && styles.optionCardPressed,
                ]}
                onPress={() => handleSelectPause(pause.name)}
              >
                <View style={styles.iconContainer}>
                  <Icon size={20} color={colors.accentForeground} />
                </View>

                <Text style={styles.optionText}>{pause.name}</Text>
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

  // Header original:
  // flex items-center justify-between p-4 sticky top-0 bg-background/80
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(250,250,249,0.8)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  scroll: {
    flex: 1,
  },

  // p-6 + flex-1 pt-4
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },

  // text-xl font-bold mb-6
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: 24,
  },

  // space-y-3
  optionsContainer: {
    gap: 12,
  },

  // Card base:
  // bg-card text-card-foreground rounded-2xl p-5 shadow border border-border/50
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

  // flex items-center gap-4
  optionCard: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  // equivalente a active:scale-95 / hover:border-primary en móvil
  optionCardPressed: {
    borderColor: colors.primary,
    transform: [{ scale: 0.98 }],
  },

  // w-10 h-10 rounded-full bg-accent text-accent-foreground
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },

  // font-semibold
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.foreground,
    flex: 1,
  },
});