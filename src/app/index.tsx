import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoBox}>
          <Image
            source={require("../../assets/images/hoja.png")}
            style={styles.leafImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>PausaConsciente</Text>

        <Text style={styles.subtitle}>
          Pequeñas pausas para una vida digital más consciente.
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Comenzar</Text>
      </Pressable>
    </View>
  );
}

const colors = {
  background: "#fafaf9",
  foreground: "#2d3748",
  mutedForeground: "#64748b",
  primary: "#6ee7b7",
  accent: "#d1fae5",
  primaryForeground: "#064e3b",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 48,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  logoBox: {
    width: 128,
    height: 128,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "12deg" }],
    marginBottom: 28,

    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },

  leafImage: {
    width: 68,
    height: 68,
    transform: [{ rotate: "-12deg" }],
  },

  title: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 28,
    lineHeight: 34,
    color: colors.foreground,
    textAlign: "center",
    letterSpacing: -0.5,
  },

  subtitle: {
    fontFamily: "Nunito_500Medium",
    fontSize: 17,
    lineHeight: 26,
    color: colors.mutedForeground,
    textAlign: "center",
    marginTop: 14,
    paddingHorizontal: 8,
    maxWidth: 310,
  },

  button: {
    width: "100%",
    height: 50,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 15,
    color: colors.primaryForeground,
  },
});