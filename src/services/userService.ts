import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { auth, db } from '@/services/firebaseConfig';

type RegisterUserParams = {
  name: string;
  email: string;
  password: string;
};

type LoginUserParams = {
  email: string;
  password: string;
};

export type OnboardingReminderSettings = {
  notifications: boolean;
  silentClasses: boolean;
  nightReminder: boolean;
};

export type OnboardingData = {
  reason: string;
  goal: string;
  supportTime: string;
  reminderType: string;
  reminderSettings: OnboardingReminderSettings;
};

export type UserProfile = {
  uid: string;
  name: string;
  email: string;
  onboarding?: OnboardingData & {
    completedAt?: unknown;
  };
  onboardingCompleted?: boolean;
  lastLoginAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
};

const mapFirebaseError = (error: unknown) => {
  if (!(error instanceof FirebaseError)) {
    return 'Ocurrio un error inesperado. Intentalo de nuevo.';
  }

  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Ese correo ya esta registrado.';
    case 'auth/invalid-email':
      return 'El correo electronico no es valido.';
    case 'auth/weak-password':
      return 'La contrasena debe tener al menos 6 caracteres.';
    case 'auth/operation-not-allowed':
      return 'Email y contrasena no estan habilitados en Firebase Authentication.';
    case 'auth/user-not-found':
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Correo o contrasena incorrectos.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Prueba de nuevo mas tarde.';
    case 'permission-denied':
      return 'No se pudo guardar el usuario en Firestore por permisos insuficientes.';
    case 'failed-precondition':
      return 'Firestore no esta configurado o todavia no fue habilitado en Firebase.';
    case 'not-found':
      return 'No se encontro la base de datos de Firestore del proyecto.';
    case 'unavailable':
      return 'No se pudo conectar con Firebase. Intentalo nuevamente.';
    default:
      return `Error de Firebase: ${error.code}`;
  }
};

const logFirebaseError = (context: string, error: unknown) => {
  if (error instanceof FirebaseError) {
    console.error(`[${context}]`, error.code, error.message);
    return;
  }

  console.error(`[${context}]`, error);
};

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterUserParams) => {
  const normalizedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      normalizedEmail,
      password
    );

    try {
      await updateProfile(userCredential.user, {
        displayName: trimmedName,
      });

      await setDoc(
        doc(db, 'users', userCredential.user.uid),
        {
          uid: userCredential.user.uid,
          name: trimmedName,
          email: normalizedEmail,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      return userCredential.user;
    } catch (profileError) {
      logFirebaseError('registerUser/profile', profileError);

      try {
        await deleteUser(userCredential.user);
      } catch (deleteError) {
        logFirebaseError('registerUser/deleteUser', deleteError);
      }

      throw profileError;
    }
  } catch (error) {
    logFirebaseError('registerUser', error);
    throw new Error(mapFirebaseError(error));
  }
};

export const loginUser = async ({ email, password }: LoginUserParams) => {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      normalizedEmail,
      password
    );

    await setDoc(
      doc(db, 'users', userCredential.user.uid),
      {
        uid: userCredential.user.uid,
        email: normalizedEmail,
        name: userCredential.user.displayName ?? '',
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      },
      { merge: true }
    );

    return userCredential.user;
  } catch (error) {
    logFirebaseError('loginUser', error);
    throw new Error(mapFirebaseError(error));
  }
};

export const saveUserOnboarding = async (onboarding: OnboardingData) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('No hay un usuario autenticado para guardar el onboarding.');
  }

  try {
    await setDoc(
      doc(db, 'users', currentUser.uid),
      {
        onboarding: {
          ...onboarding,
          completedAt: serverTimestamp(),
        },
        onboardingCompleted: true,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    logFirebaseError('saveUserOnboarding', error);
    throw new Error(mapFirebaseError(error));
  }
};

export const getCurrentUserProfile = async () => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('No hay un usuario autenticado.');
  }

  try {
    const userSnapshot = await getDoc(doc(db, 'users', currentUser.uid));

    if (!userSnapshot.exists()) {
      return {
        uid: currentUser.uid,
        name: currentUser.displayName ?? '',
        email: currentUser.email ?? '',
      } satisfies UserProfile;
    }

    return userSnapshot.data() as UserProfile;
  } catch (error) {
    logFirebaseError('getCurrentUserProfile', error);
    throw new Error(mapFirebaseError(error));
  }
};
