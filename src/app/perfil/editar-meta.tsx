// app/edit-goal.tsx
import { useRouter } from "expo-router";
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
  card: "#ffffff",
  primary: "#6ee7b7",
  primaryForeground: "#064e3b",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  border: "#e2e8f0",
  inputBackground: "#f8fafc",
};

export default function EditGoalScreen() {
  const router = useRouter();

  // Luego estos valores pueden venir de Firebase, Context o params.
  const currentState = {
    goal: "Hacer 3 pausas al día",
    reason: "Dormir mejor",
    remindersType: "Suaves",
  };

  const [goal, setGoal] = useState(currentState.goal);
  const [reason, setReason] = useState(currentState.reason);
  const [messageType, setMessageType] = useState(currentState.remindersType);

  const messageOptions = ["Suaves", "Motivacionales", "Directos"];

  const handleSave = () => {
    // Aquí luego puedes guardar en Firebase o Context.
    // Por ahora solo vuelve atrás.
    router.back();
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>

        <Text style={styles.headerTitle}>Editar motivo y meta</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Motivo personal */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Motivo personal</Text>

          <TextInput
            value={reason}
            onChangeText={setReason}
            placeholder="Escribe tu motivo"
            placeholderTextColor={colors.mutedForeground}
            style={styles.input}
          />
        </View>

        {/* Meta principal */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Meta principal</Text>

          <TextInput
            value={goal}
            onChangeText={setGoal}
            placeholder="Escribe tu meta"
            placeholderTextColor={colors.mutedForeground}
            style={styles.input}
          />
        </View>

        {/* Tipo de mensajes */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Tipo de mensajes</Text>

          <View style={styles.messageGrid}>
            {messageOptions.map((option) => {
              const isActive = messageType === option;

              return (
                <Pressable
                  key={option}
                  style={[
                    styles.messageOption,
                    isActive && styles.messageOptionActive,
                  ]}
                  onPress={() => setMessageType(option)}
                >
                  <Text
                    style={[
                      styles.messageOptionText,
                      isActive && styles.messageOptionTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Botones inferiores */}
      <View style={styles.bottomButtons}>
        <Pressable style={styles.primaryButton} onPress={handleSave}>
          <Text style={styles.primaryButtonText}>Guardar cambios</Text>
        </Pressable>

        <Pressable style={styles.ghostButton} onPress={() => router.back()}>
          <Text style={styles.ghostButtonText}>Cancelar</Text>
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

  // Header original: Header onBack title
  // flex items-center justify-between p-4 sticky top-0 bg-background/80
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

  // flex-1 pt-6 space-y-6 overflow-y-auto
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    gap: 24,
  },

  fieldGroup: {
    width: "100%",
  },

  // text-sm font-bold text-muted-foreground uppercase mb-2 block
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.mutedForeground,
    textTransform: "uppercase",
    marginBottom: 8,
  },

  // Input original:
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
  messageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  // py-2 text-center rounded-xl font-semibold border-2
  messageOption: {
    width: "48.7%",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  // active: border-primary bg-primary/10 text-primary
  messageOptionActive: {
    borderColor: colors.primary,
    backgroundColor: "rgba(110,231,183,0.1)",
  },

  messageOptionText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.mutedForeground,
    textAlign: "center",
  },

  messageOptionTextActive: {
    color: colors.primaryForeground,
  },

  // pt-4 mt-auto space-y-3
  bottomButtons: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 12,
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