// app/create-pause-activity.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
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
  primary: "#6ee7b7",
  primaryForeground: "#064e3b",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  border: "#e2e8f0",
};

const activities = [
  "Respirar",
  "Caminar",
  "Estirar",
  "Tomar agua",
  "Descansar la vista",
  "Prepararse para dormir",
  "Ordenar el escritorio",
];

export default function CreatePauseActivityScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedActivity, setSelectedActivity] = useState("Tomar agua");

  const handleSavePause = () => {
    router.push({
      pathname: "../pausa/confirmacion",
      params: {
        type: params.type?.toString() || "Pausa de estudio",
        duration: params.duration?.toString() || "10",
        startTime: params.startTime?.toString() || "16:00",
        frequency: params.frequency?.toString() || "Diaria",
        activeDays: params.activeDays?.toString() || "0,1,2,3,4",
        activity: selectedActivity,
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

        <Text style={styles.headerTitle}>Actividad (Opcional)</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          Elige una actividad para tu pausa. Puede ayudarte a desconectarte
          mejor.
        </Text>

        <View style={styles.activitiesContainer}>
          {activities.map((activity) => {
            const isSelected = selectedActivity === activity;

            return (
              <Pressable
                key={activity}
                style={[
                  styles.activityChip,
                  isSelected && styles.activityChipSelected,
                ]}
                onPress={() => setSelectedActivity(activity)}
              >
                <Text
                  style={[
                    styles.activityText,
                    isSelected && styles.activityTextSelected,
                  ]}
                >
                  {activity}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Botón inferior */}
      <View style={styles.bottomContainer}>
        <Pressable style={styles.primaryButton} onPress={handleSavePause}>
          <Text style={styles.primaryButtonText}>Guardar pausa</Text>
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

  // Header original: flex items-center justify-between p-4 bg-background/80
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

  // flex-1 pt-4
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },

  // text-muted-foreground mb-6
  description: {
    fontSize: 16,
    color: colors.mutedForeground,
    lineHeight: 24,
    marginBottom: 24,
  },

  // flex flex-wrap gap-2
  activitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  // px-4 py-2.5 rounded-full font-semibold border-2
  activityChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: "transparent",
  },

  // selected: border-primary bg-primary/10 text-primary
  activityChipSelected: {
    borderColor: colors.primary,
    backgroundColor: "rgba(110,231,183,0.1)",
  },

  activityText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.mutedForeground,
  },

  activityTextSelected: {
    color: colors.primaryForeground,
  },

  // pt-4 mt-auto
  bottomContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: colors.background,
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