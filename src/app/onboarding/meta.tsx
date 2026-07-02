import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const goals = [
  'Hacer 3 pausas al día',
  'No usar el celular 30 minutos antes de dormir',
  'Descansar la vista cada 45 minutos',
  'Hacer pausas durante el estudio',
  'Reducir el uso nocturno',
];

export default function OnboardingGoalScreen() {
  const router = useRouter();

  const handleSelectGoal = () => {
    router.push('/onboarding/momento-apoyo');
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
        <View style={styles.progressContainer}>
          <View style={styles.progressActive} />
          <View style={styles.progressActive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
        </View>

        <Text style={styles.title}>Define tu primera meta</Text>

        <Text style={styles.subtitle}>Puedes cambiarla después.</Text>

        <View style={styles.goalsContainer}>
          {goals.map((goal) => (
            <Pressable
              key={goal}
              onPress={handleSelectGoal}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
            >
              <Text style={styles.goalText}>{goal}</Text>
            </Pressable>
          ))}
        </View>
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
    marginBottom: 8,
  },

  subtitle: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.mutedForeground,
    marginBottom: 32,
  },

  goalsContainer: {
    gap: 12,
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
    transform: [{ scale: 0.98 }],
  },

  goalText: {
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