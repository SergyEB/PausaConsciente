// app/create-pause-activity.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { createUserPause } from '@/services/pauseService';

const colors = {
  background: '#fafaf9',
  foreground: '#2d3748',
  primary: '#6ee7b7',
  primaryForeground: '#064e3b',
  muted: '#f1f5f9',
  mutedForeground: '#64748b',
  border: '#e2e8f0',
};

const activities = [
  'Respirar',
  'Caminar',
  'Estirar',
  'Tomar agua',
  'Descansar la vista',
  'Prepararse para dormir',
  'Ordenar el escritorio',
];

export default function CreatePauseActivityScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedActivity, setSelectedActivity] = useState('Tomar agua');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSavePause = async () => {
    const type = params.type?.toString() || 'Pausa de estudio';
    const duration = Number(params.duration?.toString() || '10');
    const startTime = params.startTime?.toString() || '16:00';
    const frequency = params.frequency?.toString() || 'Diaria';
    const activeDays = (params.activeDays?.toString() || '0,1,2,3,4')
      .split(',')
      .filter(Boolean)
      .map((day) => Number(day));

    try {
      setIsSaving(true);
      setError('');

      await createUserPause({
        type,
        duration,
        startTime,
        frequency,
        activeDays,
        activity: selectedActivity,
        active: true,
      });

      router.push({
        pathname: '../pausa/confirmacion',
        params: {
          type,
          duration: duration.toString(),
          startTime,
          frequency,
          activeDays: activeDays.join(','),
          activity: selectedActivity,
        },
      });
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'No se pudo guardar la pausa.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>

        <Text style={styles.headerTitle}>Actividad (Opcional)</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          Elige una actividad para tu pausa. Puede ayudarte a desconectarte
          mejor.
        </Text>

        <View style={styles.activitiesContainer}>
          {activities.map((activity) => {
            const isSelected = selectedActivity === activity;

            return (
              <Pressable
                key={activity}
                style={[
                  styles.activityChip,
                  isSelected && styles.activityChipSelected,
                ]}
                onPress={() => setSelectedActivity(activity)}
              >
                <Text
                  style={[
                    styles.activityText,
                    isSelected && styles.activityTextSelected,
                  ]}
                >
                  {activity}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            isSaving && styles.primaryButtonDisabled,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={handleSavePause}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <Text style={styles.primaryButtonText}>Guardar pausa</Text>
          )}
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
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  description: {
    fontSize: 16,
    color: colors.mutedForeground,
    lineHeight: 24,
    marginBottom: 24,
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  activityChipSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(110,231,183,0.1)',
  },
  activityText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.mutedForeground,
  },
  activityTextSelected: {
    color: colors.primaryForeground,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
    marginTop: 20,
    textAlign: 'center',
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: colors.background,
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
  primaryButtonDisabled: {
    opacity: 0.8,
  },
  primaryButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: colors.primaryForeground,
    fontWeight: '600',
    fontSize: 16,
  },
});
