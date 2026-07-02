// app/(tabs)/pauses.tsx
import { useRouter } from "expo-router";
import { BookOpen, Clock, Moon, Plus } from "lucide-react-native";
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
  switchBackground: "#cbd5e1",
};

export default function PausesScreen() {
  const router = useRouter();

  // Luego esto lo puedes cambiar por datos reales de Firebase o Context.
  const state = {
    pauses: [
      {
        id: 1,
        type: "Pausa nocturna",
        time: "9:30 p. m.",
        duration: 20,
        active: true,
      },
      {
        id: 2,
        type: "Pausa para estudiar",
        time: "4:00 p. m.",
        duration: 10,
        active: true,
      },
    ],
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>Mis pausas</Text>
          <Text style={styles.subtitle}>Rutinas para desconectar</Text>
        </View>

        {/* Lista de pausas */}
        <View style={styles.list}>
          {state.pauses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Clock
                size={48}
                color={colors.mutedForeground}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>
                Aún no tienes pausas planificadas
              </Text>
            </View>
          ) : (
            state.pauses.map((pause) => (
              <View key={pause.id} style={[styles.card, styles.pauseCard]}>
                <View style={styles.pauseInfo}>
                  <View style={styles.pauseIconContainer}>
                    {pause.type.toLowerCase().includes("nocturna") ? (
                      <Moon size={24} color={colors.accentForeground} />
                    ) : (
                      <BookOpen size={24} color={colors.accentForeground} />
                    )}
                  </View>

                  <View>
                    <Text style={styles.pauseTitle}>{pause.type}</Text>
                    <Text style={styles.pauseSubtitle}>
                      {pause.time} • {pause.duration} min
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.switchContainer,
                    pause.active
                      ? styles.switchActive
                      : styles.switchInactive,
                  ]}
                >
                  <View style={styles.switchCircle} />
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Botón inferior */}
      <View style={styles.bottomButtonContainer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("../pausa/crear")}
        >
          <Plus size={20} color={colors.primaryForeground} />
          <Text style={styles.primaryButtonText}>Crear pausa</Text>
        </Pressable>
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

  scroll: {
    flex: 1,
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
    color: colors.mutedForeground,
    fontSize: 16,
  },

  // space-y-4 flex-1
  list: {
    gap: 16,
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

  // p-4 flex items-center justify-between
  pauseCard: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // flex items-center gap-4
  pauseInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },

  // w-12 h-12 bg-accent rounded-full flex items-center justify-center
  pauseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
  },

  // font-bold text-foreground
  pauseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.foreground,
  },

  // text-sm text-muted-foreground
  pauseSubtitle: {
    fontSize: 14,
    color: colors.mutedForeground,
    marginTop: 2,
  },

  // w-12 h-6 rounded-full flex items-center px-1
  switchContainer: {
    width: 48,
    height: 24,
    borderRadius: 999,
    paddingHorizontal: 4,
    justifyContent: "center",
  },

  // bg-primary justify-end
  switchActive: {
    backgroundColor: colors.primary,
    alignItems: "flex-end",
  },

  // bg-switch-background justify-start
  switchInactive: {
    backgroundColor: colors.switchBackground,
    alignItems: "flex-start",
  },

  // w-4 h-4 rounded-full bg-white shadow-sm
  switchCircle: {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  // text-center py-20 text-muted-foreground
  emptyContainer: {
    paddingVertical: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  // opacity-20 mx-auto mb-4
  emptyIcon: {
    opacity: 0.2,
    marginBottom: 16,
  },

  emptyText: {
    color: colors.mutedForeground,
    fontSize: 16,
    textAlign: "center",
  },

  // mt-4, pero fijo abajo para que quede como el prototipo con tabs
  bottomButtonContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: colors.background,
  },

  // Button primary: bg-primary rounded-full py-3.5 px-4 shadow
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
});