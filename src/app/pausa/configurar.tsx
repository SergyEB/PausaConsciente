// app/create-pause-config.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  inputBackground: "#f8fafc",
};

export default function CreatePauseConfigScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [duration, setDuration] = useState(10);
  const [startTime, setStartTime] = useState("16:00");
  const [frequency, setFrequency] = useState("Diaria");
  const [activeDays, setActiveDays] = useState([0, 1, 2, 3, 4]);

  const durations = [5, 10, 15, 20];
  const frequencies = ["Una vez", "Diaria", "Entre semana", "Personalizada"];
  const days = ["L", "M", "M", "J", "V", "S", "D"];

  const toggleDay = (index: number) => {
    setActiveDays((prev) => {
      if (prev.includes(index)) {
        return prev.filter((day) => day !== index);
      }

      return [...prev, index];
    });
  };

  const handleContinue = () => {
    router.push({
      pathname: "../pausa/actividad",
      params: {
        type: params.type?.toString() || "Pausa de estudio",
        duration: duration.toString(),
        startTime,
        frequency,
        activeDays: activeDays.join(","),
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

        <Text style={styles.headerTitle}>Configura tu pausa</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Duración */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duración</Text>

          <View style={styles.durationRow}>
            {durations.map((minutes) => {
              const isActive = duration === minutes;

              return (
                <Pressable
                  key={minutes}
                  style={[
                    styles.durationOption,
                    isActive && styles.optionActive,
                  ]}
                  onPress={() => setDuration(minutes)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isActive && styles.optionTextActive,
                    ]}
                  >
                    {minutes}m
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Hora de inicio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hora de inicio</Text>

          <TextInput
            value={startTime}
            onChangeText={setStartTime}
            placeholder="16:00"
            placeholderTextColor={colors.mutedForeground}
            style={styles.input}
          />
        </View>

        {/* Frecuencia */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frecuencia</Text>

          <View style={styles.frequencyGrid}>
            {frequencies.map((item) => {
              const isActive = frequency === item;

              return (
                <Pressable
                  key={item}
                  style={[
                    styles.frequencyOption,
                    isActive && styles.optionActive,
                  ]}
                  onPress={() => setFrequency(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isActive && styles.optionTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Días activos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Días activos</Text>

          <View style={styles.daysRow}>
            {days.map((day, index) => {
              const isActive = activeDays.includes(index);

              return (
                <Pressable
                  key={`${day}-${index}`}
                  style={[
                    styles.dayCircle,
                    isActive ? styles.dayActive : styles.dayInactive,
                  ]}
                  onPress={() => toggleDay(index)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isActive ? styles.dayTextActive : styles.dayTextInactive,
                    ]}
                  >
                    {day}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Botón inferior */}
      <View style={styles.bottomContainer}>
        <Pressable style={styles.primaryButton} onPress={handleContinue}>
          <Text style={styles.primaryButtonText}>Continuar</Text>
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

  // Header: flex items-center justify-between p-4 bg-background/80
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

  scroll: {
    flex: 1,
  },

  // flex-1 pt-4 space-y-8 overflow-y-auto
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 32,
  },

  section: {
    width: "100%",
  },

  // font-bold text-foreground mb-3
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: 12,
  },

  // flex gap-2
  durationRow: {
    flexDirection: "row",
    gap: 8,
  },

  // flex-1 py-2 text-center rounded-xl font-semibold border-2
  durationOption: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },

  // w-full bg-input-background border border-border rounded-xl px-4 py-3.5
  input: {
    width: "100%",
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.foreground,
  },

  // grid grid-cols-2 gap-2
  frequencyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  // py-3 text-center rounded-xl font-semibold border-2
  frequencyOption: {
    width: "48.7%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },

  // active: border-primary bg-primary/10 text-primary
  optionActive: {
    borderColor: colors.primary,
    backgroundColor: "rgba(110,231,183,0.1)",
  },

  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.mutedForeground,
    textAlign: "center",
  },

  optionTextActive: {
    color: colors.primaryForeground,
  },

  // flex justify-between
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  // bg-primary text-primary-foreground
  dayActive: {
    backgroundColor: colors.primary,
  },

  // bg-muted text-muted-foreground
  dayInactive: {
    backgroundColor: colors.muted,
  },

  dayText: {
    fontSize: 14,
    fontWeight: "700",
  },

  dayTextActive: {
    color: colors.primaryForeground,
  },

  dayTextInactive: {
    color: colors.mutedForeground,
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