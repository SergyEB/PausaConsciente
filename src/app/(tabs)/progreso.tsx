// app/(tabs)/progress.tsx
import { useFocusEffect, useRouter } from 'expo-router';
import { Award, Zap } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getProgressStats } from '@/services/pauseService';

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
  border: '#e2e8f0',
  switchBackground: '#cbd5e1',
};

const emptyProgressState = {
  totalPauses: 0,
  totalMinutes: 0,
  streak: 0,
  weeklyTotal: 0,
  weeklyData: [
    { name: 'L', pausas: 0 },
    { name: 'M', pausas: 0 },
    { name: 'M', pausas: 0 },
    { name: 'J', pausas: 0 },
    { name: 'V', pausas: 0 },
    { name: 'S', pausas: 0 },
    { name: 'D', pausas: 0 },
  ],
  maxWeeklyPauses: 1,
};

export default function ProgressScreen() {
  const router = useRouter();
  const [stats, setStats] = useState(emptyProgressState);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProgress = async () => {
        try {
          setIsLoading(true);
          const progressStats = await getProgressStats();

          if (isActive) {
            setStats(progressStats);
          }
        } catch {
          if (isActive) {
            setStats(emptyProgressState);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      };

      loadProgress();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const currentDay = new Date().getDay();
  const highlightedIndex = currentDay === 0 ? 6 : currentDay - 1;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Tu progreso</Text>
        <Text style={styles.subtitle}>
          Esta semana has completado {stats.weeklyTotal} pausas.
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.card, styles.smallStatCard]}>
          <Text style={styles.statLabel}>Pausas</Text>
          <Text style={styles.bigNumber}>{stats.totalPauses}</Text>
        </View>

        <View style={[styles.card, styles.smallStatCard]}>
          <Text style={styles.statLabel}>Minutos</Text>
          <Text style={styles.bigNumber}>{stats.totalMinutes}</Text>
        </View>

        <View style={[styles.card, styles.streakCard]}>
          <View>
            <Text style={styles.statLabel}>Racha</Text>
            <View style={styles.streakRow}>
              <Text style={styles.bigNumber}>{stats.streak} dias</Text>
              <Zap size={24} color="#fbbf24" />
            </View>
          </View>

          <View style={styles.awardIconContainer}>
            <Award size={24} color={colors.secondaryForeground} />
          </View>
        </View>
      </View>

      <View style={[styles.card, styles.chartCard]}>
        <Text style={styles.chartTitle}>Pausas esta semana</Text>

        <View style={styles.chartContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.mutedForeground} />
            </View>
          ) : (
            stats.weeklyData.map((item, index) => {
              const barHeight = Math.max(
                (item.pausas / stats.maxWeeklyPauses) * 130,
                8
              );
              const isHighlighted =
                item.pausas > 0 && index === highlightedIndex;

              return (
                <View key={`${item.name}-${index}`} style={styles.barItem}>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: barHeight,
                          backgroundColor: isHighlighted
                            ? colors.primary
                            : colors.switchBackground,
                        },
                      ]}
                    />
                  </View>

                  <Text style={styles.barLabel}>{item.name}</Text>
                </View>
              );
            })
          )}
        </View>
      </View>

      <Pressable
        style={styles.outlineButton}
        onPress={() => router.push('../progreso/historial')}
      >
        <Text style={styles.outlineButtonText}>Ver historial</Text>
      </Pressable>
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
    fontSize: 16,
    color: colors.mutedForeground,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
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
  smallStatCard: {
    width: '47.5%',
    padding: 16,
  },
  statLabel: {
    fontSize: 14,
    color: colors.mutedForeground,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  bigNumber: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.foreground,
  },
  streakCard: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  awardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartCard: {
    padding: 20,
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: 16,
  },
  chartContainer: {
    height: 192,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barItem: {
    flex: 1,
    alignItems: 'center',
  },
  barTrack: {
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 22,
    borderRadius: 4,
  },
  barLabel: {
    fontSize: 12,
    color: colors.mutedForeground,
    marginTop: 10,
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
