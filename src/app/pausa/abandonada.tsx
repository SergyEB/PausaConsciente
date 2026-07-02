// app/pause-abandoned.tsx
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
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

export default function PauseAbandonedScreen() {
  const router = useRouter();

  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const reasons = [
    "Estaba ocupado",
    "Quería seguir usando el celular",
    "No era buen momento",
    "Otro motivo",
  ];

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Icono principal */}
        <View style={styles.iconContainer}>
          <Heart size={48} color={colors.mutedForeground} />
        </View>

        <Text style={styles.title}>No pasa nada</Text>

        <Text style={styles.subtitle}>
          Puedes intentarlo de nuevo más tarde. Sin presiones.
        </Text>

        {/* Motivo opcional */}
        <View style={styles.reasonsContainer}>
          <Text style={styles.reasonsTitle}>¿Qué ocurrió? (Opcional)</Text>

          <View style={styles.reasonsList}>
            {reasons.map((reason) => {
              const isSelected = selectedReason === reason;

              return (
                <Pressable
                  key={reason}
                  style={[
                    styles.reasonOption,
                    isSelected && styles.reasonOptionSelected,
                  ]}
                  onPress={() => setSelectedReason(reason)}
                >
                  <Text
                    style={[
                      styles.reasonText,
                      isSelected && styles.reasonTextSelected,
                    ]}
                  >
                    {reason}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Botón inferior */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.replace("../(tabs)/inicio")}
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

  scroll: {
    flex: 1,
  },

  // flex-1 p-6 items-center text-center justify-center
  content: {
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  // w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 999,
    backgroundColor: colors.muted,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  // text-3xl font-bold mb-2
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.foreground,
    textAlign: "center",
    marginBottom: 8,
  },

  // text-muted-foreground mb-8
  subtitle: {
    fontSize: 16,
    color: colors.mutedForeground,
    textAlign: "center",
    marginBottom: 32,
  },

  // w-full text-left mb-8
  reasonsContainer: {
    width: "100%",
    marginBottom: 32,
  },

  // font-bold text-sm text-muted-foreground uppercase mb-3 px-2
  reasonsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.mutedForeground,
    textTransform: "uppercase",
    marginBottom: 12,
    paddingHorizontal: 8,
  },

  // space-y-2
  reasonsList: {
    gap: 8,
  },

  // p-3.5 border-2 border-border rounded-xl font-medium
  reasonOption: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: "transparent",
  },

  // equivalente al hover/selección visual
  reasonOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: "rgba(110,231,183,0.1)",
  },

  reasonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.foreground,
  },

  reasonTextSelected: {
    color: colors.primaryForeground,
    fontWeight: "700",
  },

  // w-full space-y-3 mt-auto
  buttonContainer: {
    width: "100%",
    marginTop: "auto",
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