// app/(tabs)/pauses.tsx
import { useFocusEffect, useRouter } from 'expo-router';
import { BookOpen, Clock, Moon, Plus } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getUserPauses, UserPause } from '@/services/pauseService';

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
  switchBackground: '#cbd5e1',
};

export default function PausesScreen() {
  const router = useRouter();
  const [pauses, setPauses] = useState<UserPause[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadPauses = async () => {
        try {
          setIsLoading(true);
          const userPauses = await getUserPauses();

          if (isActive) {
            setPauses(userPauses);
          }
        } catch {
          if (isActive) {
            setPauses([]);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      };

      loadPauses();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Mis pausas</Text>
          <Text style={styles.subtitle}>Rutinas para desconectar</Text>
        </View>

        <View style={styles.list}>
          {isLoading ? (
            <View style={styles.emptyContainer}>
              <ActivityIndicator color={colors.mutedForeground} />
            </View>
          ) : pauses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Clock
                size={48}
                color={colors.mutedForeground}
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyText}>
                Aun no tienes pausas planificadas
              </Text>
            </View>
          ) : (
            pauses.map((pause) => (
              <View key={pause.id} style={[styles.card, styles.pauseCard]}>
                <View style={styles.pauseInfo}>
                  <View style={styles.pauseIconContainer}>
                    {pause.type.toLowerCase().includes('nocturna') ? (
                      <Moon size={24} color={colors.accentForeground} />
                    ) : (
                      <BookOpen size={24} color={colors.accentForeground} />
                    )}
                  </View>

                  <View>
                    <Text style={styles.pauseTitle}>{pause.type}</Text>
                    <Text style={styles.pauseSubtitle}>
                      {pause.startTime} • {pause.duration} min
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.switchContainer,
                    pause.active
                      ? styles.switchActive
                      : styles.switchInactive,
                  ]}
                >
                  <View style={styles.switchCircle} />
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push('../pausa/crear')}
        >
          <Plus size={20} color={colors.primaryForeground} />
          <Text style={styles.primaryButtonText}>Crear pausa</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 96,
  },
  header: {
    paddingTop: 16,
    marginBottom: 24,
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
  list: {
    gap: 16,
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
  pauseCard: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pauseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  pauseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.foreground,
  },
  pauseSubtitle: {
    fontSize: 14,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  switchContainer: {
    width: 48,
    height: 24,
    borderRadius: 999,
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
  switchActive: {
    backgroundColor: colors.primary,
    alignItems: 'flex-end',
  },
  switchInactive: {
    backgroundColor: colors.switchBackground,
    alignItems: 'flex-start',
  },
  switchCircle: {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyContainer: {
    paddingVertical: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    opacity: 0.2,
    marginBottom: 16,
  },
  emptyText: {
    color: colors.mutedForeground,
    fontSize: 16,
    textAlign: 'center',
  },
  bottomButtonContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: colors.background,
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
});
