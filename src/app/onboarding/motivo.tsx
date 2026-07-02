import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useOnboarding } from '@/context/OnboardingContext';

const options = [
  'Dormir mejor',
  'Concentrarme en mis estudios',
  'Reducir ansiedad',
  'Evitar cansancio visual',
  'Tener mas tiempo para actividad fisica',
  'Pasar mas tiempo con familia o amigos',
  'Otro motivo',
];

export default function OnboardingReasonScreen() {
  const router = useRouter();
  const { onboarding, setReason } = useOnboarding();

  const handleSelect = (option: string) => {
    if (option === 'Otro motivo') {
      router.push('/onboarding/motivo-personalizado');
      return;
    }

    setReason(option);
    router.push('/onboarding/meta');
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

      <View style={styles.content}>
        <Text style={styles.title}>Por que quieres hacer pausas?</Text>
        <Text style={styles.subtitle}>
          Elige el motivo que mas se parece a tu objetivo.
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.optionsContent}
        >
          {options.map((option) => {
            const isSelected = onboarding.reason === option;

            return (
              <Pressable
                key={option}
                onPress={() => handleSelect(option)}
                style={({ pressed }) => [
                  styles.card,
                  isSelected && styles.cardSelected,
                  pressed && styles.cardPressed,
                ]}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
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
  mutedForeground: '#64748b',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 30,
    lineHeight: 36,
    color: colors.foreground,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.mutedForeground,
    marginBottom: 32,
  },
  optionsContent: {
    gap: 12,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.5)',
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(110, 231, 183, 0.08)',
  },
  cardPressed: {
    borderColor: colors.primary,
    transform: [{ scale: 0.98 }],
  },
  optionText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: colors.cardForeground,
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
