import { create } from 'zustand';
import { account } from '@/appwrite/config';
import showMessage from '@/hooks/useNotify';

import { User } from '@/types';

import messages from '@/constants/messages';
import { translateError } from '@/utils/translateError';

type AuthState = {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  initialLoad: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  isAuthenticated: false,
  initialLoad: true,

  login: async (email: string, password: string): Promise<void> => {
    try {
      await account.createEmailPasswordSession(email, password);

      await useAuthStore.getState().fetchUser();

      const { user } = useAuthStore.getState();
      if (!user?.labels?.includes('admin')) {
        // Если пользователь не администратор, завершаем сессию
        await account.deleteSession('current');
        showMessage(
          'error',
          'Вход запрещён: доступ только для администраторов.'
        );
        console.error('Вход запрещён: пользователь не администратор.');
        return;
      }

      showMessage('success', messages.auth.loginSuccess);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error('Ошибка авторизации:', error);
      showMessage('error', translateError(errorMessage));
    }
  },

  fetchUser: async () => {
    try {
      const user = await account.get();
      const isAdmin = user.labels?.includes('admin') || false;
      set({
        user: user,
        isAdmin: isAdmin,
        isAuthenticated: true,
      });
    } catch (error: unknown) {
      console.error('Пользователь не авторизован:', error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      // Показываем уведомление только если это не первоначальная загрузка
      if (!useAuthStore.getState().initialLoad) {
        showMessage('error', translateError(errorMessage));
      }
    } finally {
      // Сбрасываем флаг после завершения первоначальной загрузки
      set({ initialLoad: false });
    }
  },

  logout: async () => {
    try {
      await account.deleteSession('current');
      set({ user: null, isAdmin: false, isAuthenticated: false });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  },
}));

export default useAuthStore;
