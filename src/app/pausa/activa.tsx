// app/pause-timer.tsx
import { useRouter } from "expo-router";
import { Leaf } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

import { completePause } from '@/services/pauseService';

const colors = {
  background: "#fafaf9",
  foreground: "#2d3748",
  primary: "#6ee7b7",
  primaryForeground: "#064e3b",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  accent: "#d1fae5",
  accentForeground: "#065f46",
  border: "#e2e8f0",
};

const PAUSE_DURATION = 20 * 60;

export default function PauseTimerScreen() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(PAUSE_DURATION);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const progress = (PAUSE_DURATION - timeLeft) / PAUSE_DURATION;

  const circleSize = 256;
  const strokeWidth = 8;
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - circumference * progress;

  const handleFinishPause = async () => {
    try {
      setIsFinishing(true);
      await completePause({
        type: 'Pausa consciente',
        duration: Math.floor(PAUSE_DURATION / 60),
      });
      router.push('../pausa/completada');
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pausa en curso</Text>

      {/* Círculo de progreso */}
      <View style={styles.timerContainer}>
        <Svg
          width={circleSize}
          height={circleSize}
          style={styles.progressCircle}
        >
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke={colors.border}
            strokeWidth={strokeWidth}
            fill="none"
          />

          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke={colors.primary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            
          />
        </Svg>

        <View style={styles.timeTextContainer}>
          <Text style={styles.timeText}>
            {minutes}:{seconds}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>
        Estás haciendo esta pausa para descansar mejor.
      </Text>

      <View style={styles.leafIconContainer}>
        <Leaf size={32} color={colors.accentForeground} />
      </View>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.outlineButton}
          onPress={() => router.push("../pausa/actividad-sugerida")}
        >
          <Text style={styles.outlineButtonText}>Ver actividad sugerida</Text>
        </Pressable>

        <Pressable
          style={styles.primaryButton}
          onPress={handleFinishPause}
          disabled={isFinishing}
        >
          {isFinishing ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <Text style={styles.primaryButtonText}>Finalizar pausa</Text>
          )}
        </Pressable>

        <Pressable
          style={styles.ghostButton}
          onPress={() => router.push("../pausa/abandonada")}
        >
          <Text style={styles.ghostButtonText}>Abandonar pausa</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // flex-1 flex flex-col items-center justify-center p-6 bg-background
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  // text-xl font-bold mb-12
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.foreground,
    marginBottom: 48,
  },

  // relative w-64 h-64 flex items-center justify-center mb-8
  timerContainer: {
    width: 256,
    height: 256,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
  },

  progressCircle: {
    position: "absolute",
  },

  timeTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  // text-6xl font-black font-mono tracking-tighter text-foreground
  timeText: {
    fontSize: 56,
    fontWeight: "900",
    color: colors.foreground,
    letterSpacing: -2,
    fontVariant: ["tabular-nums"],
  },

  // text-muted-foreground mb-4
  description: {
    fontSize: 16,
    color: colors.mutedForeground,
    textAlign: "center",
    marginBottom: 16,
  },

  // w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-12
  leafIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
  },

  // w-full space-y-3 mt-auto
  buttonsContainer: {
    width: "100%",
    gap: 12,
    marginTop: "auto",
  },

  // Button outline
  outlineButton: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  outlineButtonText: {
    color: colors.foreground,
    fontWeight: "600",
    fontSize: 16,
  },

  // Button primary
  primaryButton: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 3,
  },

  primaryButtonText: {
    color: colors.primaryForeground,
    fontWeight: "600",
    fontSize: 16,
  },

  // Button ghost
  ghostButton: {
    width: "100%",
    backgroundColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  ghostButtonText: {
    color: colors.mutedForeground,
    fontWeight: "600",
    fontSize: 16,
  },
});
