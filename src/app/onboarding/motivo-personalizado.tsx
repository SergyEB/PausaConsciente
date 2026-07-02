import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useOnboarding } from '@/context/OnboardingContext';

export default function OnboardingCustomScreen() {
  const router = useRouter();
  const { onboarding, setReason } = useOnboarding();
  const [reason, setLocalReason] = useState(
    onboarding.reason === 'Otro motivo' ? '' : onboarding.reason
  );

  const handleSave = () => {
    const trimmedReason = reason.trim();

    if (!trimmedReason) {
      return;
    }

    setReason(trimmedReason);
    router.push('/onboarding/meta');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.foreground} strokeWidth={2.4} />
        </Pressable>

        <View style={styles.headerSpacer} />
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Escribe tu propio motivo</Text>

        <TextInput
          style={styles.textArea}
          value={reason}
          onChangeText={setLocalReason}
          placeholder="Ejemplo: Quiero dejar de usar el celular tan tarde porque me cuesta dormir."
          placeholderTextColor={colors.mutedForeground}
          multiline
          textAlignVertical="top"
        />

        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              !reason.trim() && styles.primaryButtonDisabled,
              pressed && styles.primaryButtonPressed,
            ]}
            onPress={handleSave}
            disabled={!reason.trim()}
          >
            <Text style={styles.primaryButtonText}>Guardar motivo</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.ghostButton,
              pressed && styles.pressed,
            ]}
            onPress={() => router.back()}
          >
            <Text style={styles.ghostButtonText}>Volver</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const colors = {
  background: '#fafaf9',
  foreground: '#2d3748',
  primary: '#6ee7b7',
  primaryForeground: '#064e3b',
  border: '#e2e8f0',
  inputBackground: '#f8fafc',
  mutedForeground: '#64748b',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  header: {
    height: 56,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    marginLeft: -8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 30,
    lineHeight: 36,
    color: colors.foreground,
    marginBottom: 24,
  },
  textArea: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
    padding: 16,
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.foreground,
  },
  buttonsContainer: {
    marginTop: 32,
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    lineHeight: 24,
    color: colors.primaryForeground,
  },
  ghostButton: {
    width: '100%',
    height: 52,
    borderRadius: 999,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    lineHeight: 24,
    color: colors.mutedForeground,
  },
  pressed: {
    opacity: 0.7,
  },
  primaryButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
