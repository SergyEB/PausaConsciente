import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const reminderOptions = [
  {
    id: 'soft',
    label: 'Suaves: mensajes tranquilos y breves',
    value: 'Suaves',
  },
  {
    id: 'motivational',
    label: 'Motivacionales: mensajes positivos',
    value: 'Motivacionales',
  },
  {
    id: 'direct',
    label: 'Directos: avisos claros y concretos',
    value: 'Directos',
  },
];

const initialSwitches = [
  {
    id: 'notifications',
    label: 'Activar notificaciones',
    active: true,
  },
  {
    id: 'silentClasses',
    label: 'Silenciar durante clases',
    active: false,
  },
  {
    id: 'nightReminder',
    label: 'Recordatorio nocturno',
    active: true,
  },
];

export default function OnboardingRemindersScreen() {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState('Suaves');
  const [switches, setSwitches] = useState(initialSwitches);

  const toggleSwitch = (id: string) => {
    setSwitches((prevSwitches) =>
      prevSwitches.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const handleFinish = () => {
    router.push('../(tabs)/inicio');
  };

  return (
    <View style={styles.container}>
      {/* Bloque superior fijo */}
      <View style={styles.header}>
        
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.back()}
        >
          <ArrowLeft
            size={24}
            color={colors.foreground}
            strokeWidth={2.4}
          />
        </Pressable>

        <View style={styles.headerSpacer} />
        <View style={styles.headerSpacer} />
      
        <View style={styles.progressContainer}>
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
        </View>

        <Text style={styles.title}>
          ¿Cómo quieres recibir tus recordatorios?
        </Text>
      </View>

      {/* Bloque central scrolleable */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.optionsContainer}>
          {reminderOptions.map((option) => {
            const active = selectedType === option.value;

            return (
              <Pressable
                key={option.id}
                onPress={() => setSelectedType(option.value)}
                style={({ pressed }) => [
                  styles.card,
                  active ? styles.cardActive : styles.cardInactive,
                  pressed && styles.cardPressed,
                ]}
              >
                <View style={styles.optionRow}>
                  <View
                    style={[
                      styles.radioOuter,
                      active
                        ? styles.radioOuterActive
                        : styles.radioOuterInactive,
                    ]}
                  >
                    {active && <View style={styles.radioInner} />}
                  </View>

                  <Text style={styles.optionText}>{option.label}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.switchesContainer}>
          {switches.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => toggleSwitch(item.id)}
              style={({ pressed }) => [
                styles.switchRow,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.switchLabel}>{item.label}</Text>

              <View
                style={[
                  styles.switchTrack,
                  item.active
                    ? styles.switchTrackActive
                    : styles.switchTrackInactive,
                ]}
              >
                <View style={styles.switchThumb} />
              </View>
            </Pressable>
          ))}
        </View>

        <Text style={styles.footerMessage}>
          Tú decides el ritmo. La app solo te acompaña.
        </Text>
      </ScrollView>

      {/* Bloque inferior fijo */}
      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={handleFinish}
        >
          <Text style={styles.primaryButtonText}>
            Finalizar configuración
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const colors = {
  background: '#fafaf9',
  foreground: '#2d3748',
  card: '#ffffff',
  cardForeground: '#2d3748',
  primary: '#6ee7b7',
  primaryForeground: '#064e3b',
  border: '#e2e8f0',
  mutedForeground: '#64748b',
  switchBackground: '#cbd5e1',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },

  header: {
    paddingTop: 40,
  },

  progressContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 32,
  },

  progressActive: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },

  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 30,
    lineHeight: 36,
    color: colors.foreground,
    marginBottom: 32,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  optionsContainer: {
    gap: 12,
    marginBottom: 32,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },

  cardActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(110, 231, 183, 0.05)',
  },

  cardInactive: {
    borderColor: 'transparent',
  },

  cardPressed: {
    transform: [{ scale: 0.98 }],
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioOuterActive: {
    borderColor: colors.primary,
  },

  radioOuterInactive: {
    borderColor: colors.mutedForeground,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },

  optionText: {
    flex: 1,
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: colors.cardForeground,
  },

  switchesContainer: {
    gap: 16,
  },

  switchRow: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  switchLabel: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: colors.foreground,
  },

  switchTrack: {
    width: 48,
    height: 24,
    borderRadius: 999,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchTrackActive: {
    backgroundColor: colors.primary,
    justifyContent: 'flex-end',
  },

  switchTrackInactive: {
    backgroundColor: colors.switchBackground,
    justifyContent: 'flex-start',
  },

  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: colors.white,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  footerMessage: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: colors.mutedForeground,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },

  footer: {
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: colors.background,
  },

  primaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },

  primaryButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    lineHeight: 24,
    color: colors.primaryForeground,
  },

  pressed: {
    opacity: 0.7,
  },

  primaryButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  backButton: {
    width: 40,
    height: 40,
    marginLeft: -8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 40,
    height: 15,
  },
});