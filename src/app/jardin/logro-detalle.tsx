// app/achievement-buho.tsx
import { useRouter } from "expo-router";
import { ArrowLeft, Moon } from "lucide-react-native";
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
  mutedForeground: "#64748b",
};

export default function AchievementBuhoScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>

        <View style={styles.headerCenterSpace} />

        <View style={styles.headerRightSpace} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Moon size={64} color={colors.primaryForeground} />
        </View>

        <Text style={styles.title}>Búho</Text>

        <Text style={styles.dateText}>Obtenido el 15 de Octubre</Text>

        <Text style={styles.description}>
          Descanso nocturno: completaste una pausa antes de dormir, ayudando a
          tu mente a relajarse.
        </Text>

        <View style={styles.bottomButtonContainer}>
          <Pressable style={styles.primaryButton} onPress={() => router.back()}>
            <Text style={styles.primaryButtonText}>Volver a logros</Text>
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

  // Header sin título: Header onBack
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

  headerCenterSpace: {
    flex: 1,
  },

  // w-10
  headerRightSpace: {
    width: 40,
  },

  // flex-1 flex flex-col items-center justify-center w-full
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  // w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mb-6
  iconCircle: {
    width: 128,
    height: 128,
    borderRadius: 999,
    backgroundColor: "rgba(110,231,183,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  // text-3xl font-extrabold mb-2
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.foreground,
    marginBottom: 8,
  },

  // text-sm font-bold text-muted-foreground uppercase mb-6
  dateText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.mutedForeground,
    textTransform: "uppercase",
    marginBottom: 24,
    textAlign: "center",
  },

  // text-lg text-foreground px-4 mb-12
  description: {
    fontSize: 18,
    color: colors.foreground,
    textAlign: "center",
    lineHeight: 27,
    marginBottom: 48,
    paddingHorizontal: 16,
  },

  // w-full mt-auto pb-6
  bottomButtonContainer: {
    width: "100%",
    marginTop: "auto",
    paddingBottom: 24,
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
});