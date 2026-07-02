// app/settings.tsx
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Clock,
  HelpCircle,
  Moon,
  Shield,
  Volume2,
} from "lucide-react-native";
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
  secondary: "#e0e7ff",
  secondaryForeground: "#3730a3",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  accent: "#d1fae5",
  accentForeground: "#065f46",
  border: "#e2e8f0",
  switchBackground: "#cbd5e1",
};

export default function SettingsScreen() {
  const router = useRouter();

  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    darkMode: false,
    nightReminder: true,
    silenceDuringClasses: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const preferences = [
    {
      key: "notifications" as const,
      icon: Bell,
      label: "Notificaciones",
    },
    {
      key: "sound" as const,
      icon: Volume2,
      label: "Sonido",
    },
    {
      key: "darkMode" as const,
      icon: Moon,
      label: "Modo oscuro",
    },
    {
      key: "nightReminder" as const,
      icon: Clock,
      label: "Recordatorio nocturno",
    },
    {
      key: "silenceDuringClasses" as const,
      icon: BookOpen,
      label: "Silenciar durante clases",
    },
  ];

  const otherOptions = [
    {
      icon: Shield,
      label: "Privacidad",
      onPress: () => {},
    },
    {
      icon: HelpCircle,
      label: "Ayuda y soporte",
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>

        <Text style={styles.headerTitle}>Configuración</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Preferencias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>

          <View style={styles.card}>
            {preferences.map((item, index) => {
              const Icon = item.icon;
              const isActive = settings[item.key];
              const isLast = index === preferences.length - 1;

              return (
                <Pressable
                  key={item.key}
                  style={[
                    styles.preferenceRow,
                    isLast && styles.lastRow,
                  ]}
                  onPress={() => toggleSetting(item.key)}
                >
                  <View style={styles.rowLeft}>
                    <Icon size={20} color={colors.mutedForeground} />
                    <Text style={styles.rowText}>{item.label}</Text>
                  </View>

                  <View
                    style={[
                      styles.switchContainer,
                      isActive
                        ? styles.switchActive
                        : styles.switchInactive,
                    ]}
                  >
                    <View style={styles.switchCircle} />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Otros */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Otros</Text>

          <View style={styles.card}>
            {otherOptions.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === otherOptions.length - 1;

              return (
                <Pressable
                  key={item.label}
                  style={[
                    styles.otherRow,
                    isLast && styles.lastRow,
                  ]}
                  onPress={item.onPress}
                >
                  <Icon size={20} color={colors.mutedForeground} />
                  <Text style={styles.rowText}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>
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

  scroll: {
    flex: 1,
  },

  // flex-1 pt-4 space-y-6 overflow-y-auto pb-6
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 24,
  },

  section: {
    width: "100%",
  },

  // font-bold text-foreground mb-3 px-2
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: 12,
    paddingHorizontal: 8,
  },

  // Card original:
  // p-0 overflow-hidden bg-card rounded-2xl shadow border
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },

  // flex justify-between items-center p-4 border-b border-border
  preferenceRow: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // flex items-center gap-3
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  // font-medium
  rowText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.foreground,
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

  // flex items-center gap-3 p-4 border-b border-border
  otherRow: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  // last:border-0
  lastRow: {
    borderBottomWidth: 0,
  },
});