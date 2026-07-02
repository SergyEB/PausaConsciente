import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useOnboarding } from '@/context/OnboardingContext';

const times = [
  'Antes de dormir',
  'Mientras estudio',
  'Durante la tarde',
  'En la manana',
  'Todo el dia',
];

export default function OnboardingTimeScreen() {
  const router = useRouter();
  const { onboarding, setSupportTime } = useOnboarding();

  const handleSelectTime = (time: string) => {
    setSupportTime(time);
    router.push('/onboarding/recordatorios');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.foreground} strokeWidth={2.4} />
        </Pressable>

        <View style={styles.headerSpacer} />
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressActive} />
        <View style={styles.progressActive} />
        <View style={styles.progressActive} />
        <View style={styles.progressInactive} />
      </View>

      <Text style={styles.title}>Cuando necesitas mas apoyo?</Text>

      <View style={styles.optionsContainer}>
        {times.map((time) => {
          const isSelected = onboarding.supportTime === time;

          return (
            <Pressable
              key={time}
              style={({ pressed }) => [
                styles.card,
                isSelected && styles.cardSelected,
                pressed && styles.cardPressed,
              ]}
              onPress={() => handleSelectTime(time)}
            >
              <Text style={styles.cardText}>{time}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const colors = {
  background: '#fafaf9',
  foreground: '#2d3748',
  primary: '#6ee7b7',
  border: '#e2e8f0',
  card: '#ffffff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
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
  progressInactive: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.border,
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 30,
    lineHeight: 36,
    color: colors.foreground,
    letterSpacing: -0.4,
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(110, 231, 183, 0.08)',
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  cardText: {
    fontFamily: 'Nunito_500Medium',
    fontSize: 16,
    lineHeight: 24,
    color: colors.foreground,
  },
  backButton: {
    width: 40,
    height: 40,
    marginLeft: -8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  header: {
    height: 56,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
});
