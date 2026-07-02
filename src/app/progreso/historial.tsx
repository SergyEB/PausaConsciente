// app/history.tsx
import { useFocusEffect, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getPauseHistory, PauseHistoryItem } from '@/services/pauseService';

const colors = {
  background: '#fafaf9',
  foreground: '#2d3748',
  card: '#ffffff',
  primary: '#6ee7b7',
  primaryForeground: '#064e3b',
  muted: '#f1f5f9',
  mutedForeground: '#64748b',
  destructive: '#ef4444',
  border: '#e2e8f0',
};

const filters = ['Hoy', 'Semana', 'Mes', 'Completadas', 'Pospuestas'];

const formatTimeLabel = (date: Date | null) => {
  if (!date) {
    return 'Sin fecha';
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const itemDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffInDays = Math.floor(
    (today.getTime() - itemDay.getTime()) / (1000 * 60 * 60 * 24)
  );

  const formattedTime = date.toLocaleTimeString('es-CR', {
    hour: 'numeric',
    minute: '2-digit',
  });

  if (diffInDays === 0) {
    return `Hoy, ${formattedTime}`;
  }

  if (diffInDays === 1) {
    return `Ayer, ${formattedTime}`;
  }

  return `${date.toLocaleDateString('es-CR')}, ${formattedTime}`;
};

const isSameMonth = (first: Date, second: Date) =>
  first.getMonth() === second.getMonth() &&
  first.getFullYear() === second.getFullYear();

export default function HistoryScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('Hoy');
  const [historyItems, setHistoryItems] = useState<PauseHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadHistory = async () => {
        try {
          setIsLoading(true);
          const pauseHistory = await getPauseHistory();

          if (isActive) {
            setHistoryItems(pauseHistory);
          }
        } catch {
          if (isActive) {
            setHistoryItems([]);
          }
        } finally {
          if (isActive) {
            setIsLoading(false);
          }
        }
      };

      loadHistory();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const filteredHistory = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const currentDay = now.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const weekStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + mondayOffset
    );

    return historyItems.filter((item) => {
      const itemDate = item.date;

      if (selectedFilter === 'Completadas') {
        return item.status === 'Completada';
      }

      if (selectedFilter === 'Pospuestas') {
        return item.status === 'Abandonada';
      }

      if (!itemDate) {
        return false;
      }

      const normalizedItemDate = new Date(
        itemDate.getFullYear(),
        itemDate.getMonth(),
        itemDate.getDate()
      );

      if (selectedFilter === 'Hoy') {
        return normalizedItemDate.getTime() === today.getTime();
      }

      if (selectedFilter === 'Semana') {
        return normalizedItemDate >= weekStart && normalizedItemDate <= today;
      }

      if (selectedFilter === 'Mes') {
        return isSameMonth(itemDate, now);
      }

      return true;
    });
  }, [historyItems, selectedFilter]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>

        <Text style={styles.headerTitle}>Historial</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map((filter) => {
            const isActive = selectedFilter === filter;

            return (
              <Pressable
                key={filter}
                style={[
                  styles.filterChip,
                  isActive && styles.filterChipActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.emptyState}>
            <ActivityIndicator color={colors.mutedForeground} />
          </View>
        ) : filteredHistory.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No hay pausas para este filtro.</Text>
          </View>
        ) : (
          filteredHistory.map((item) => {
            const isCompleted = item.status === 'Completada';

            return (
              <View key={`${item.status}-${item.id}`} style={styles.card}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.type}</Text>

                  <Text style={styles.itemSubtitle}>
                    {formatTimeLabel(item.date)} • {item.duration} min
                  </Text>
                </View>

                <Text
                  style={[
                    styles.statusText,
                    isCompleted
                      ? styles.statusCompleted
                      : styles.statusAbandoned,
                  ]}
                >
                  {isCompleted ? 'Completada' : 'Pospuesta'}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(250,250,249,0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.foreground,
    textAlign: 'center',
  },
  headerRightSpace: {
    width: 40,
  },
  filtersWrapper: {
    marginVertical: 16,
  },
  filtersContainer: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.muted,
  },
  filterChipActive: {
    backgroundColor: colors.foreground,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.mutedForeground,
  },
  filterTextActive: {
    color: colors.background,
  },
  listScroll: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(226,232,240,0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 14,
    color: colors.mutedForeground,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusCompleted: {
    color: colors.primaryForeground,
  },
  statusAbandoned: {
    color: colors.destructive,
  },
  emptyState: {
    paddingVertical: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: colors.mutedForeground,
  },
});
