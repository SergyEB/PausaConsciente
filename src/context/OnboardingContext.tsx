import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import {
  OnboardingData,
  OnboardingReminderSettings,
} from '@/services/userService';

type OnboardingContextValue = {
  onboarding: OnboardingData;
  setReason: (reason: string) => void;
  setGoal: (goal: string) => void;
  setSupportTime: (supportTime: string) => void;
  setReminderType: (reminderType: string) => void;
  setReminderSettings: (settings: OnboardingReminderSettings) => void;
  resetOnboarding: () => void;
};

const defaultReminderSettings: OnboardingReminderSettings = {
  notifications: true,
  silentClasses: false,
  nightReminder: true,
};

const defaultOnboarding: OnboardingData = {
  reason: '',
  goal: '',
  supportTime: '',
  reminderType: 'Suaves',
  reminderSettings: defaultReminderSettings,
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboarding, setOnboarding] = useState<OnboardingData>(defaultOnboarding);

  const value = useMemo(
    () => ({
      onboarding,
      setReason: (reason: string) =>
        setOnboarding((current) => ({ ...current, reason })),
      setGoal: (goal: string) =>
        setOnboarding((current) => ({ ...current, goal })),
      setSupportTime: (supportTime: string) =>
        setOnboarding((current) => ({ ...current, supportTime })),
      setReminderType: (reminderType: string) =>
        setOnboarding((current) => ({ ...current, reminderType })),
      setReminderSettings: (reminderSettings: OnboardingReminderSettings) =>
        setOnboarding((current) => ({ ...current, reminderSettings })),
      resetOnboarding: () => setOnboarding(defaultOnboarding),
    }),
    [onboarding]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboarding debe usarse dentro de OnboardingProvider.');
  }

  return context;
}
