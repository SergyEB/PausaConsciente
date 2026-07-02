// app/(tabs)/index.tsx
import { useFocusEffect, useRouter } from 'expo-router';
import { Check, Clock, Leaf, Play, User, Zap } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getCurrentUserProfile, UserProfile } from '@/services/userService';
import { getPauseStats } from '@/services/pauseService';

const colors = {
  background: '#fafaf9',
  foreground: '#2d3748',
  card: '#ffffff',
  cardForeground: '#2d3748',
  primary: '#6ee7b7',
  primaryForeground: '#064e3b',
  secondary: '#e0e7ff',
  secondaryForeground: '#3730a3',
  muted: '#f1f5f9',
  mutedForeground: '#64748b',
  accent: '#d1fae5',
  accentForeground: '#065f46',
  border: '#e2e8f0',
};

export default function HomeScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [completedToday, setCompletedToday] = useState(0);
  const [streak, setStreak] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProfile = async () => {
        try {
          const [userProfile, pauseStats] = await Promise.all([
            getCurrentUserProfile(),
            getPauseStats(),
          ]);

          if (isActive) {
            setProfile(userProfile);
            setCompletedToday(pauseStats.completedToday);
            setStreak(pauseStats.streak);
          }
        } catch {
          if (isActive) {
            setProfile(null);
            setCompletedToday(0);
            setStreak(0);
          }
        }
      };

      loadProfile();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const state = {
    user: { name: profile?.name?.trim() || 'Usuario' },
    goal: profile?.onboarding?.goal || 'Define tu primera meta',
    nextSupport:
      profile?.onboarding?.supportTime || 'Configura cuando necesitas mas apoyo',
    subtitle:
      profile?.onboarding?.reason || 'Listo para un descanso?',
    stats: {
      completedToday,
      streak,
      gardenLevel: 3,
      energy: 75,
    },
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hola, {state.user.name}</Text>
          <Text style={styles.subtitle}>{state.subtitle}</Text>
        </View>

        <Pressable
          style={styles.profileButton}
          onPress={() => router.push('/perfil')}
        >
          <User size={24} color={colors.accentForeground} />
        </Pressable>
      </View>

      <Pressable
        style={[styles.card, styles.goalCard]}
        onPress={() => router.push('../pausa/meta-actual')}
      >
        <View style={styles.goalContent}>
          <Text style={styles.goalLabel}>Meta de hoy</Text>
          <Text style={styles.goalTitle}>{state.goal}</Text>

          <View style={styles.nextPauseBadge}>
            <Clock size={16} color={colors.primaryForeground} />
            <Text style={styles.nextPauseText}>{state.nextSupport}</Text>
          </View>
        </View>

        <Leaf
          size={120}
          color="rgba(0,0,0,0.05)"
          style={styles.goalLeaf}
        />
      </Pressable>

      <View style={styles.statsGrid}>
        <View style={[styles.card, styles.statCard]}>
          <View style={styles.statIconAccent}>
            <Check size={20} color={colors.accentForeground} />
          </View>
          <Text style={styles.statNumber}>{state.stats.completedToday}</Text>
          <Text style={styles.statLabel}>Pausas hoy</Text>
        </View>

        <View style={[styles.card, styles.statCard]}>
          <View style={styles.statIconSecondary}>
            <Zap size={20} color={colors.secondaryForeground} />
          </View>
          <Text style={styles.statNumber}>{state.stats.streak} dias</Text>
          <Text style={styles.statLabel}>Racha actual</Text>
        </View>
      </View>

      <View style={styles.gardenCard}>
        <Pressable onPress={() => router.push('../jardin')}>
          <Text style={styles.gardenTitle}>Tu jardín crece</Text>
          <Text style={styles.gardenSubtitle}>
            Nivel {state.stats.gardenLevel} {state.stats.energy}/100 energí­a
          </Text>
        </Pressable>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push('../pausa/activa')}
        >
          <Play
            size={20}
            color={colors.primaryForeground}
            fill={colors.primaryForeground}
          />
          <Text style={styles.primaryButtonText}>Iniciar pausa ahora</Text>
        </Pressable>

        <Pressable
          style={styles.outlineButton}
          onPress={() => router.push('../pausa/crear')}
        >
          <Text style={styles.outlineButtonText}>Crear nueva pausa</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 96,
  },
  header: {
    marginTop: 16,
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.foreground,
  },
  subtitle: {
    color: colors.mutedForeground,
    marginTop: 2,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  goalCard: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    marginBottom: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  goalContent: {
    zIndex: 2,
  },
  goalLabel: {
    color: 'rgba(6,78,59,0.8)',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  goalTitle: {
    color: colors.primaryForeground,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  nextPauseBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  nextPauseText: {
    fontSize: 14,
    color: colors.primaryForeground,
  },
  goalLeaf: {
    position: 'absolute',
    right: -24,
    bottom: -24,
    transform: [{ rotate: '-12deg' }],
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  statIconAccent: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIconSecondary: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.foreground,
  },
  statLabel: {
    fontSize: 12,
    color: colors.mutedForeground,
    textTransform: 'uppercase',
    fontWeight: '600',
    textAlign: 'center',
  },
  gardenCard: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: 'rgba(226,232,240,0.6)',
    borderStyle: 'dashed',
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  gardenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: 4,
  },
  gardenSubtitle: {
    color: colors.mutedForeground,
    fontSize: 14,
    marginBottom: 16,
  },
  buttonsContainer: {
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 3,
  },
  primaryButtonText: {
    color: colors.primaryForeground,
    fontWeight: '600',
    fontSize: 16,
  },
  outlineButton: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  outlineButtonText: {
    color: colors.foreground,
    fontWeight: '600',
    fontSize: 16,
  },
});
