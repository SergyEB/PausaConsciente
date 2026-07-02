// app/(tabs)/profile.tsx
import { useFocusEffect, useRouter } from 'expo-router';
import {
  ChevronRight,
  LogOut,
  Settings,
  Shield,
  Zap,
} from 'lucide-react-native';
import { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getCurrentUserProfile, UserProfile } from '@/services/userService';

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
  destructive: '#ef4444',
  border: '#e2e8f0',
};

export default function ProfileScreen() {
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
    user: {
      name: profile?.name?.trim() || 'Usuario',
      email: profile?.email?.trim() || '',
    },
    reason: profile?.onboarding?.reason || 'Pendiente',
    goal: profile?.onboarding?.goal || 'Pendiente',
    stats: {
      streak: 5,
    },
  };

  const userEmail = state.user.email || 'usuario@pausaconsciente.com';
  const initial = state.user.name.charAt(0).toUpperCase();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>

        <View style={styles.profileTextContainer}>
          <Text style={styles.userName}>{state.user.name}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>

      <View style={[styles.card, styles.configCard]}>
        <View style={styles.configHeader}>
          <Text style={styles.configTitle}>Tu configuracion actual</Text>

          <Pressable
            style={styles.editButton}
            onPress={() => router.push('../perfil/editar-meta')}
          >
            <Text style={styles.editButtonText}>Editar</Text>
          </Pressable>
        </View>

        <View style={styles.configList}>
          <View>
            <Text style={styles.configLabel}>Motivo</Text>
            <Text style={styles.configValue}>{state.reason}</Text>
          </View>

          <View>
            <Text style={styles.configLabel}>Meta principal</Text>
            <Text style={styles.configValue}>{state.goal}</Text>
          </View>

          <View>
            <Text style={styles.configLabel}>Racha</Text>

            <View style={styles.streakRow}>
              <Text style={styles.configValue}>{state.stats.streak} dias</Text>
              <Zap size={14} color="#fbbf24" />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.optionsList}>
        <Pressable
          style={[styles.card, styles.optionCard]}
          onPress={() => router.push('../perfil/configuracion')}
        >
          <View style={styles.optionLeft}>
            <Settings size={20} color={colors.mutedForeground} />
            <Text style={styles.optionText}>Configuracion general</Text>
          </View>

          <ChevronRight size={20} color={colors.mutedForeground} />
        </Pressable>

        <Pressable style={[styles.card, styles.optionCard]}>
          <View style={styles.optionLeft}>
            <Shield size={20} color={colors.mutedForeground} />
            <Text style={styles.optionText}>Privacidad</Text>
          </View>

          <ChevronRight size={20} color={colors.mutedForeground} />
        </Pressable>

        <Pressable
          style={[styles.card, styles.logoutCard]}
          onPress={() => router.replace('/')}
        >
          <View style={styles.optionLeft}>
            <LogOut size={20} color={colors.destructive} />
            <Text style={styles.logoutText}>Cerrar sesion</Text>
          </View>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.accentForeground,
    fontSize: 24,
    fontWeight: '700',
  },
  profileTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.foreground,
  },
  userEmail: {
    fontSize: 16,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  configCard: {
    padding: 20,
    marginBottom: 24,
  },
  configHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  configTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.foreground,
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.muted,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.mutedForeground,
  },
  configList: {
    gap: 16,
  },
  configLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.mutedForeground,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  configValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.foreground,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  optionsList: {
    gap: 8,
  },
  optionCard: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.foreground,
  },
  logoutCard: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'rgba(239,68,68,0.2)',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.destructive,
  },
});
