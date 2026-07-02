// app/(tabs)/garden.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import { Award, Leaf } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getCurrentUserProfile, UserProfile } from '@/services/userService';

const colors = {
  background: '#fafaf9',
  foreground: '#2d3748',
  card: '#ffffff',
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

const gardenImages = {
  1: require('../../../assets/images/jardin-1.png'),
  2: require('../../../assets/images/jardin-2.png'),
  3: require('../../../assets/images/jardin.png'),
} as const;

export default function GardenScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProfile = async () => {
        try {
          const userProfile = await getCurrentUserProfile();

          if (isActive) {
            setProfile(userProfile);
          }
        } catch {
          if (isActive) {
            setProfile(null);
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
    stats: profile?.gamification ?? {
      level: 1,
      experience: 0,
      energy: 0,
      gardenImageLevel: 1,
    },
  };

  const imageLevel = Math.min(3, Math.max(1, state.stats.gardenImageLevel));

  return (
    <LinearGradient
      colors={['rgba(224,231,255,0.35)', 'rgba(209,250,229,0.45)']}
      style={styles.screen}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Mi jardin</Text>
          <Text style={styles.subtitle}>Nivel {state.stats.level}</Text>
        </View>

        <Pressable
          style={styles.achievementsButton}
          onPress={() => router.push('../jardin/logros')}
        >
          <Award size={18} color={colors.foreground} />
          <Text style={styles.achievementsButtonText}>Logros</Text>
        </Pressable>
      </View>

      <View style={styles.gardenContainer}>
        <Image
          source={gardenImages[imageLevel as keyof typeof gardenImages]}
          style={styles.gardenImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.energyCard}>
        <View style={styles.energyHeader}>
          <View>
            <Text style={styles.energyLabel}>Energia</Text>

            <Text style={styles.energyNumber}>
              {state.stats.energy}
              <Text style={styles.energyTotal}>/100</Text>
            </Text>
          </View>

          <View style={styles.rewardContainer}>
            <Text style={styles.rewardSmallText}>Proxima recompensa</Text>

            <View style={styles.rewardRow}>
              <Leaf size={14} color={colors.foreground} />
              <Text style={styles.rewardText}>Nueva planta</Text>
            </View>
          </View>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(state.stats.energy, 100)}%` },
            ]}
          />
        </View>

        <Text style={styles.energyDescription}>
          Cada pausa completada ayuda a tu jardin a crecer.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    paddingBottom: 96,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  header: {
    paddingTop: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.foreground,
    marginBottom: 4,
  },
  subtitle: {
    color: colors.mutedForeground,
    fontSize: 16,
  },
  achievementsButton: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: 'rgba(255,255,255,0.55)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  achievementsButtonText: {
    color: colors.foreground,
    fontWeight: '600',
    fontSize: 14,
  },
  gardenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
    marginTop: 8,
    marginBottom: 16,
  },
  gardenImage: {
    width: '100%',
    maxWidth: 310,
    height: 310,
    zIndex: 3,
  },
  energyCard: {
    backgroundColor: 'rgba(255,255,255,0.86)',
    borderRadius: 16,
    padding: 20,
    marginTop: 'auto',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
  },
  energyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  energyLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.mutedForeground,
    textTransform: 'uppercase',
  },
  energyNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.foreground,
  },
  energyTotal: {
    fontSize: 14,
    color: colors.mutedForeground,
  },
  rewardContainer: {
    alignItems: 'flex-end',
  },
  rewardSmallText: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginBottom: 4,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.foreground,
  },
  progressTrack: {
    height: 12,
    width: '100%',
    backgroundColor: colors.muted,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  energyDescription: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: 16,
    fontWeight: '500',
  },
});
