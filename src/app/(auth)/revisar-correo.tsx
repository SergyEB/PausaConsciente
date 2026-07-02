import { useRouter } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function CheckEmailScreen() {
  const router = useRouter();

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
          <ArrowLeft
            size={24}
            color={colors.foreground}
            strokeWidth={2.4}
          />
        </Pressable>

        <View style={styles.headerSpacer} />
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.messageContainer}>
          <View style={styles.successIconContainer}>
            <Check
              size={40}
              color={colors.accentForeground}
              strokeWidth={2.4}
            />
          </View>

          <Text style={styles.title}>Revisa tu correo</Text>

          <Text style={styles.description}>
            Te hemos enviado un enlace para crear una nueva contraseña.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.outlineButton,
              pressed && styles.outlineButtonPressed,
            ]}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.outlineButtonText}>
              Volver al inicio de sesión
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const colors = {
  background: '#fafaf9',
  foreground: '#2d3748',
  accent: '#d1fae5',
  accentForeground: '#065f46',
  border: '#e2e8f0',
  mutedForeground: '#64748b',
  muted: '#f1f5f9',
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

  messageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },

  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 20,
    lineHeight: 28,
    color: colors.foreground,
    textAlign: 'center',
    marginBottom: 8,
  },

  description: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.mutedForeground,
    textAlign: 'center',
    marginBottom: 32,
  },

  outlineButton: {
    width: '100%',
    height: 52,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  outlineButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    lineHeight: 24,
    color: colors.foreground,
  },

  pressed: {
    opacity: 0.7,
  },

  outlineButtonPressed: {
    backgroundColor: colors.muted,
  },
});