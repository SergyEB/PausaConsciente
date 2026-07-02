import { useRouter } from 'expo-router';
import { ArrowLeft, Lock, User } from 'lucide-react-native';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push('/')}
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
        <Text style={styles.title}>Bienvenido de nuevo</Text>

        <Text style={styles.subtitle}>Nos alegra verte por aquí.</Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <User
              size={20}
              color={colors.mutedForeground}
              strokeWidth={2}
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor={colors.mutedForeground}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock
              size={20}
              color={colors.mutedForeground}
              strokeWidth={2}
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor={colors.mutedForeground}
              secureTextEntry
            />
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.forgotButton,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push('/(auth)/recuperar-contrasena')}
        >
          <Text style={styles.forgotText}>¿Olvidé mi contraseña?</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={() => router.push('../(tabs)/inicio')}
        >
          <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes cuenta? </Text>

        <Pressable
          onPress={() => router.push('/(auth)/registro')}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Text style={styles.footerLink}>Crear cuenta</Text>
        </Pressable>
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

  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 30,
    lineHeight: 38,
    color: colors.foreground,
    marginBottom: 8,
  },

  subtitle: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.mutedForeground,
    marginBottom: 40,
  },

  form: {
    gap: 16,
    marginBottom: 20,
  },

  inputContainer: {
    width: '100%',
    height: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    lineHeight: 22,
    color: colors.foreground,
    paddingVertical: 0,
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 40,
  },

  forgotText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary,
  },

  primaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },

  primaryButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    lineHeight: 24,
    color: colors.primaryForeground,
  },

  footer: {
    paddingBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  footerText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.mutedForeground,
  },

  footerLink: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    lineHeight: 24,
    color: colors.primary,
  },

  pressed: {
    opacity: 0.7,
  },

  primaryButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});