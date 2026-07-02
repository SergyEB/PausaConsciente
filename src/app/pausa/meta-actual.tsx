// app/goal-detail.tsx
import { useFocusEffect, useRouter } from 'expo-router';
import { ArrowLeft, Award, Smile } from 'lucide-react-native';
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
  border: '#e2e8f0',
};

const getRecommendationFromReason = (reason: string) => {
  switch (reason) {
    case 'Dormir mejor':
      return 'Una pausa nocturna y lejos de pantallas puede ayudarte a desconectarte poco a poco antes de dormir.';
    case 'Concentrarme en mis estudios':
      return 'Una pausa breve entre bloques de estudio puede ayudarte a recuperar foco y volver con mas claridad.';
    case 'Reducir ansiedad':
      return 'Una pausa con respiracion guiada puede ayudarte a bajar el ritmo y volver con mas calma.';
    case 'Evitar cansancio visual':
      return 'Descansar la vista unos minutos y mirar a la distancia puede reducir la fatiga visual.';
    case 'Tener mas tiempo para actividad fisica':
      return 'Una pausa activa corta durante el dia puede ayudarte a incorporar movimiento sin esperar al final de la jornada.';
    case 'Pasar mas tiempo con familia o amigos':
      return 'Reservar una pausa sin celular puede darte un espacio real para conectar con las personas que te importan.';
    default:
      return `Tu motivo es ${reason.toLowerCase()}. Intenta que tu proxima pausa sea pequena, intencional y alineada con ese objetivo.`;
  }
};

export default function GoalDetailScreen() {
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
    goal: profile?.onboarding?.goal || 'Define tu primera meta',
    reason: profile?.onboarding?.reason || 'Pendiente',
    recommendation: getRecommendationFromReason(
      profile?.onboarding?.reason || 'tu bienestar'
    ),
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.foreground} />
        </Pressable>

        <Text style={styles.headerTitle}>Tu meta actual</Text>

        <View style={styles.headerRightSpace} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <Award size={40} color={colors.primaryForeground} />
        </View>

        <Text style={styles.goalTitle}>{state.goal}</Text>

        <Text style={styles.reasonText}>Motivo: {state.reason}</Text>

        <View style={styles.recommendationCard}>
          <View style={styles.recommendationRow}>
            <View style={styles.recommendationIcon}>
              <Smile size={24} color={colors.accentForeground} />
            </View>

            <View style={styles.recommendationTextContainer}>
              <Text style={styles.recommendationTitle}>Recomendacion</Text>

              <Text style={styles.recommendationText}>
                {state.recommendation}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.outlineButton}
            onPress={() => router.push('../perfil/editar-meta')}
          >
            <Text style={styles.outlineButtonText}>Editar meta</Text>
          </Pressable>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push('../(tabs)/inicio')}
          >
            <Text style={styles.primaryButtonText}>Volver al inicio</Text>
          </Pressable>
        </View>
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
  },
  headerRightSpace: {
    width: 40,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: 'rgba(110,231,183,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  goalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.foreground,
    textAlign: 'center',
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 16,
    color: colors.mutedForeground,
    textAlign: 'center',
    marginBottom: 32,
  },
  recommendationCard: {
    width: '100%',
    backgroundColor: 'rgba(209,250,229,0.3)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 0,
  },
  recommendationRow: {
    flexDirection: 'row',
    gap: 16,
  },
  recommendationIcon: {
    marginTop: 4,
  },
  recommendationTextContainer: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    color: colors.mutedForeground,
    lineHeight: 22,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
    marginTop: 'auto',
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
});
