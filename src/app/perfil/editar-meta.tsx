// app/edit-goal.tsx
import { useFocusEffect, useRouter } from 'expo-router';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  getCurrentUserProfile,
  updateUserOnboarding,
} from '@/services/userService';

const colors = {
  background: '#fafaf9',
  foreground: '#2d3748',
  card: '#ffffff',
  primary: '#6ee7b7',
  primaryForeground: '#064e3b',
  muted: '#f1f5f9',
  mutedForeground: '#64748b',
  border: '#e2e8f0',
  inputBackground: '#f8fafc',
};

const reasonOptions = [
  'Dormir mejor',
  'Concentrarme en mis estudios',
  'Reducir ansiedad',
  'Evitar cansancio visual',
  'Tener mas tiempo para actividad fisica',
  'Pasar mas tiempo con familia o amigos',
];

const goalOptions = [
  'Hacer 3 pausas al dia',
  'No usar el celular 30 minutos antes de dormir',
  'Descansar la vista cada 45 minutos',
  'Hacer pausas durante el estudio',
  'Reducir el uso nocturno',
];

export default function EditGoalScreen() {
  const router = useRouter();
  const [goal, setGoal] = useState('');
  const [reason, setReason] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isReasonOpen, setIsReasonOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(false);

  const messageOptions = ['Suaves', 'Motivacionales', 'Directos'];
  const availableReasonOptions = reasonOptions.includes(reason) || !reason
    ? reasonOptions
    : [reason, ...reasonOptions];
  const availableGoalOptions = goalOptions.includes(goal) || !goal
    ? goalOptions
    : [goal, ...goalOptions];

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProfile = async () => {
        try {
          const profile = await getCurrentUserProfile();

          if (isActive) {
            setGoal(profile.onboarding?.goal ?? '');
            setReason(profile.onboarding?.reason ?? '');
            setMessageType(profile.onboarding?.reminderType ?? 'Suaves');
          }
        } catch {
          if (isActive) {
            setGoal('');
            setReason('');
            setMessageType('Suaves');
          }
        }
      };

      loadProfile();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleSave = async () => {
    try {
      await updateUserOnboarding({
        goal: goal.trim(),
        reason: reason.trim(),
        reminderType: messageType,
      });

      router.back();
    } catch (error) {
      console.error('No se pudo actualizar el onboarding del usuario.', error);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>

        <Text style={styles.headerTitle}>Editar motivo y meta</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Motivo personal</Text>

          <Pressable
            style={styles.dropdownTrigger}
            onPress={() => setIsReasonOpen((current) => !current)}
          >
            <Text style={styles.dropdownTriggerText}>
              {reason || 'Selecciona un motivo'}
            </Text>
            {isReasonOpen ? (
              <ChevronUp size={18} color={colors.mutedForeground} />
            ) : (
              <ChevronDown size={18} color={colors.mutedForeground} />
            )}
          </Pressable>

          {isReasonOpen ? (
            <View style={styles.selectionGrid}>
              {availableReasonOptions.map((option) => {
                const isActive = reason === option;

                return (
                  <Pressable
                    key={option}
                    style={[
                      styles.selectionOption,
                      isActive && styles.selectionOptionActive,
                    ]}
                    onPress={() => {
                      setReason(option);
                      setIsReasonOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.selectionOptionText,
                        isActive && styles.selectionOptionTextActive,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Meta principal</Text>

          <Pressable
            style={styles.dropdownTrigger}
            onPress={() => setIsGoalOpen((current) => !current)}
          >
            <Text style={styles.dropdownTriggerText}>
              {goal || 'Selecciona una meta'}
            </Text>
            {isGoalOpen ? (
              <ChevronUp size={18} color={colors.mutedForeground} />
            ) : (
              <ChevronDown size={18} color={colors.mutedForeground} />
            )}
          </Pressable>

          {isGoalOpen ? (
            <View style={styles.selectionGrid}>
              {availableGoalOptions.map((option) => {
                const isActive = goal === option;

                return (
                  <Pressable
                    key={option}
                    style={[
                      styles.selectionOption,
                      isActive && styles.selectionOptionActive,
                    ]}
                    onPress={() => {
                      setGoal(option);
                      setIsGoalOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.selectionOptionText,
                        isActive && styles.selectionOptionTextActive,
                      ]}
                    >
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Tipo de mensajes</Text>

          <View style={styles.messageGrid}>
            {messageOptions.map((option) => {
              const isActive = messageType === option;

              return (
                <Pressable
                  key={option}
                  style={[
                    styles.messageOption,
                    isActive && styles.messageOptionActive,
                  ]}
                  onPress={() => setMessageType(option)}
                >
                  <Text
                    style={[
                      styles.messageOptionText,
                      isActive && styles.messageOptionTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <Pressable style={styles.primaryButton} onPress={handleSave}>
          <Text style={styles.primaryButtonText}>Guardar cambios</Text>
        </Pressable>

        <Pressable style={styles.ghostButton} onPress={() => router.back()}>
          <Text style={styles.ghostButtonText}>Cancelar</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(250,250,249,0.8)',
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
    paddingTop: 24,
    paddingBottom: 24,
    gap: 24,
  },
  fieldGroup: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.mutedForeground,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  dropdownTrigger: {
    width: '100%',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  dropdownTriggerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.foreground,
  },
  selectionGrid: {
    gap: 12,
    marginTop: 12,
  },
  selectionOption: {
    width: '100%',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  selectionOptionActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(110,231,183,0.1)',
  },
  selectionOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.foreground,
  },
  selectionOptionTextActive: {
    color: colors.primaryForeground,
  },
  messageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  messageOption: {
    width: '48.7%',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageOptionActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(110,231,183,0.1)',
  },
  messageOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.mutedForeground,
    textAlign: 'center',
  },
  messageOptionTextActive: {
    color: colors.primaryForeground,
  },
  bottomButtons: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 12,
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
