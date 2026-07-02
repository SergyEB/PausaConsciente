import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const options = [
  'Dormir mejor',
  'Concentrarme en mis estudios',
  'Reducir ansiedad',
  'Evitar cansancio visual',
  'Tener más tiempo para actividad física',
  'Pasar más tiempo con familia o amigos',
  'Otro motivo',
];

export default function OnboardingReasonScreen() {
  const router = useRouter();

  const handleSelect = (option: string) => {
    if (option === 'Otro motivo') {
      router.push('/onboarding/motivo-personalizado');
      return;
    }

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
                <ArrowLeft
                  size={24}
                  color={colors.foreground}
                  strokeWidth={2.4}
                />
              </Pressable>
      
              <View style={styles.headerSpacer} />
              <View style={styles.headerSpacer} />
            </View>
      <View style={styles.content}>
        <Text style={styles.title}>¿Por qué quieres hacer pausas?</Text>

        <Text style={styles.subtitle}>
          Elige el motivo que más se parece a tu objetivo.
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.optionsContent}
        >
          {options.map((option) => (
            <Pressable
              key={option}
              onPress={() => handleSelect(option)}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          ))}
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
  border: '#e2e8f0',
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
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },

  cardPressed: {
    borderColor: colors.primary,
    transform: [{ scale: 0.95 }],
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