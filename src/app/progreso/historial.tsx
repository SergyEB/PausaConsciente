// app/history.tsx
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
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
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  destructive: "#ef4444",
  border: "#e2e8f0",
};

const filters = ["Hoy", "Semana", "Mes", "Completadas", "Pospuestas"];

const historyItems = [
  {
    type: "Pausa de estudio",
    time: "Hoy, 4:00 p. m.",
    duration: "10 min",
    status: "Completada",
  },
  {
    type: "Pausa visual",
    time: "Hoy, 1:15 p. m.",
    duration: "5 min",
    status: "Abandonada",
  },
  {
    type: "Pausa libre",
    time: "Ayer, 6:00 p. m.",
    duration: "15 min",
    status: "Completada",
  },
];

export default function HistoryScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("Hoy");

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>

        <Text style={styles.headerTitle}>Historial</Text>

        <View style={styles.headerRightSpace} />
      </View>

      {/* Filtros */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map((filter) => {
            const isActive = selectedFilter === filter;

            return (
              <Pressable
                key={filter}
                style={[
                  styles.filterChip,
                  isActive && styles.filterChipActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Lista */}
      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {historyItems.map((item, index) => {
          const isCompleted = item.status === "Completada";

          return (
            <View key={`${item.type}-${index}`} style={styles.card}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.type}</Text>

                <Text style={styles.itemSubtitle}>
                  {item.time} • {item.duration}
                </Text>
              </View>

              <Text
                style={[
                  styles.statusText,
                  isCompleted
                    ? styles.statusCompleted
                    : styles.statusAbandoned,
                ]}
              >
                {item.status}
              </Text>
            </View>
          );
        })}
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
  // flex items-center justify-between p-4 bg-background/80
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

  // flex gap-2 my-4 overflow-x-auto pb-2
  filtersWrapper: {
    marginVertical: 16,
  },

  filtersContainer: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    gap: 8,
  },

  // px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.muted,
  },

  // i === 0 ? bg-foreground text-background
  filterChipActive: {
    backgroundColor: colors.foreground,
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.mutedForeground,
  },

  filterTextActive: {
    color: colors.background,
  },

  listScroll: {
    flex: 1,
  },

  // flex-1 overflow-y-auto space-y-3 pb-6
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },

  // Card p-4 flex items-center justify-between
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  itemInfo: {
    flex: 1,
  },

  // font-bold
  itemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: 2,
  },

  // text-sm text-muted-foreground
  itemSubtitle: {
    fontSize: 14,
    color: colors.mutedForeground,
  },

  // text-xs font-bold uppercase
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  // text-primary
  statusCompleted: {
    color: colors.primaryForeground,
  },

  // text-destructive
  statusAbandoned: {
    color: colors.destructive,
  },
});
