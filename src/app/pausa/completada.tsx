// app/pause-complete.tsx
import { useRouter } from 'expo-router';
import { Leaf, Zap } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
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
  muted: '#f1f5f9',
  mutedForeground: '#64748b',
  border: '#e2e8f0',
};

export default function PauseCompleteScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
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
  }, []);

  const energyAfter = profile?.gamification?.energy ?? 15;

  return (
    <View style={styles.screen}>
      <View style={styles.backgroundGlow} />

      <View style={styles.mainIconContainer}>
        <Leaf size={64} color={colors.primaryForeground} />
      </View>

      <Text style={styles.title}>Pausa completada</Text>

      <Text style={styles.pauseInfo}>20 minutos de pausa nocturna</Text>

      <Text style={styles.subtitle}>Tu planta gano energia.</Text>

      <View style={styles.rewardCard}>
        <View style={styles.rewardContent}>
          <View style={styles.rewardLeft}>
            <Zap size={24} color="#fbbf24" />
            <Text style={styles.rewardText}>+15 Energia</Text>
          </View>

          <View style={styles.energyTrack}>
            <View
              style={[
                styles.energyFill,
                { width: `${Math.min(energyAfter, 100)}%` },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push('../(tabs)/progreso')}
        >
          <Text style={styles.primaryButtonText}>Ver progreso</Text>
        </Pressable>

        <Pressable
          style={styles.ghostButton}
          onPress={() => router.replace('../(tabs)/inicio')}
        >
          <Text style={styles.ghostButtonText}>Volver al inicio</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backgroundGlow: {
    position: 'absolute',
    bottom: 0,
    width: '140%',
    height: '55%',
    backgroundColor: 'rgba(110,231,183,0.1)',
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
  },
  mainIconContainer: {
    width: 128,
    height: 128,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    zIndex: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.foreground,
    textAlign: 'center',
    marginBottom: 8,
    zIndex: 2,
  },
  pauseInfo: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.foreground,
    textAlign: 'center',
    marginBottom: 4,
    zIndex: 2,
  },
  subtitle: {
    fontSize: 16,
    color: colors.mutedForeground,
    textAlign: 'center',
    marginBottom: 32,
    zIndex: 2,
  },
  rewardCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  rewardContent: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  rewardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rewardText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.foreground,
  },
  energyTrack: {
    height: 8,
    width: 128,
    backgroundColor: colors.muted,
    borderRadius: 999,
    overflow: 'hidden',
  },
  energyFill: {
    height: '100%',
    backgroundColor: '#fbbf24',
    borderRadius: 999,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
    zIndex: 2,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 3,
  },
  primaryButtonText: {
    color: colors.primaryForeground,
    fontWeight: '600',
    fontSize: 16,
  },
  ghostButton: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ghostButtonText: {
    color: colors.mutedForeground,
    fontWeight: '600',
    fontSize: 16,
  },
});
