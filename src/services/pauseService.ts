import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

import { auth, db } from '@/services/firebaseConfig';

export type UserPause = {
  id: string;
  type: string;
  duration: number;
  startTime: string;
  frequency: string;
  activeDays: number[];
  activity: string;
  active: boolean;
  createdAt?: unknown;
};

export type CompletedPause = {
  id: string;
  type: string;
  duration: number;
  completedAt?: {
    toDate?: () => Date;
  };
};

export type AbandonedPause = {
  id: string;
  type: string;
  duration: number;
  reason?: string;
  abandonedAt?: {
    toDate?: () => Date;
  };
};

export type PauseHistoryItem = {
  id: string;
  type: string;
  duration: number;
  status: 'Completada' | 'Abandonada';
  date: Date | null;
  reason?: string;
};

type CreatePauseParams = Omit<UserPause, 'id' | 'createdAt'>;

const getCurrentUserId = () => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('No hay un usuario autenticado.');
  }

  return currentUser.uid;
};

export const createUserPause = async (pause: CreatePauseParams) => {
  const uid = getCurrentUserId();

  await addDoc(collection(db, 'users', uid, 'pauses'), {
    ...pause,
    createdAt: serverTimestamp(),
  });
};

export const getUserPauses = async () => {
  const uid = getCurrentUserId();
  const pausesQuery = query(
    collection(db, 'users', uid, 'pauses'),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(pausesQuery);

  return snapshot.docs.map((pauseDoc) => ({
    id: pauseDoc.id,
    ...pauseDoc.data(),
  })) as UserPause[];
};

export const completePause = async (pause: {
  type: string;
  duration: number;
}) => {
  const uid = getCurrentUserId();

  await addDoc(collection(db, 'users', uid, 'completedPauses'), {
    ...pause,
    completedAt: serverTimestamp(),
  });
};

export const abandonPause = async (pause: {
  type: string;
  duration: number;
  reason?: string;
}) => {
  const uid = getCurrentUserId();

  await addDoc(collection(db, 'users', uid, 'abandonedPauses'), {
    ...pause,
    abandonedAt: serverTimestamp(),
  });
};

export const getCompletedPauses = async () => {
  const uid = getCurrentUserId();
  const completedQuery = query(
    collection(db, 'users', uid, 'completedPauses'),
    orderBy('completedAt', 'desc')
  );
  const snapshot = await getDocs(completedQuery);

  return snapshot.docs.map((pauseDoc) => ({
    id: pauseDoc.id,
    ...pauseDoc.data(),
  })) as CompletedPause[];
};

export const getAbandonedPauses = async () => {
  const uid = getCurrentUserId();
  const abandonedQuery = query(
    collection(db, 'users', uid, 'abandonedPauses'),
    orderBy('abandonedAt', 'desc')
  );
  const snapshot = await getDocs(abandonedQuery);

  return snapshot.docs.map((pauseDoc) => ({
    id: pauseDoc.id,
    ...pauseDoc.data(),
  })) as AbandonedPause[];
};

export const getPauseStats = async () => {
  const completedPauses = await getCompletedPauses();

  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const completedToday = completedPauses.filter((pause) => {
    const completedDate = pause.completedAt?.toDate?.();

    if (!completedDate) {
      return false;
    }

    return completedDate >= todayStart;
  }).length;

  return {
    completedToday,
    streak: 0,
  };
};

export const getProgressStats = async () => {
  const completedPauses = await getCompletedPauses();
  const totalPauses = completedPauses.length;
  const totalMinutes = completedPauses.reduce(
    (sum, pause) => sum + pause.duration,
    0
  );

  const now = new Date();
  const currentDay = now.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  const weekStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + mondayOffset
  );

  const weeklyData = Array.from({ length: 7 }, (_, index) => ({
    name: ['L', 'M', 'M', 'J', 'V', 'S', 'D'][index],
    pausas: 0,
  }));

  completedPauses.forEach((pause) => {
    const completedDate = pause.completedAt?.toDate?.();

    if (!completedDate) {
      return;
    }

    const pauseDay = new Date(
      completedDate.getFullYear(),
      completedDate.getMonth(),
      completedDate.getDate()
    );
    const diffInDays = Math.floor(
      (pauseDay.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays >= 0 && diffInDays < 7) {
      weeklyData[diffInDays].pausas += 1;
    }
  });

  const weeklyTotal = weeklyData.reduce((sum, day) => sum + day.pausas, 0);
  const maxWeeklyPauses = Math.max(
    1,
    ...weeklyData.map((day) => day.pausas)
  );

  return {
    totalPauses,
    totalMinutes,
    streak: 0,
    weeklyTotal,
    weeklyData,
    maxWeeklyPauses,
  };
};

export const getPauseHistory = async () => {
  const [completedPauses, abandonedPauses] = await Promise.all([
    getCompletedPauses(),
    getAbandonedPauses(),
  ]);

  const completedHistory: PauseHistoryItem[] = completedPauses.map((pause) => ({
    id: pause.id,
    type: pause.type,
    duration: pause.duration,
    status: 'Completada',
    date: pause.completedAt?.toDate?.() ?? null,
  }));

  const abandonedHistory: PauseHistoryItem[] = abandonedPauses.map((pause) => ({
    id: pause.id,
    type: pause.type,
    duration: pause.duration,
    status: 'Abandonada',
    date: pause.abandonedAt?.toDate?.() ?? null,
    reason: pause.reason,
  }));

  return [...completedHistory, ...abandonedHistory].sort((a, b) => {
    const firstDate = a.date?.getTime() ?? 0;
    const secondDate = b.date?.getTime() ?? 0;

    return secondDate - firstDate;
  });
};
