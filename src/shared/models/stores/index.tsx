import { create } from 'zustand';
import { getAccessToken } from '@/shared/api/libraries/getAccessToken';

interface GlobalState {
  accessToken: string;
  setAccessToken: (token: string) => void;
  visitedPage: string;
  setVisitedPage: (page: string) => void;
  restoreAccessToken: () => Promise<string>;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  accessToken: '',
  setAccessToken: (token: string) => set({ accessToken: token }),
  visitedPage: '',
  setVisitedPage: (page: string) => set({ visitedPage: page }),
  theme: 'light',
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      }
      return { theme: newTheme };
    }),
  setTheme: (theme: 'light' | 'dark') =>
    set(() => {
      if (typeof window !== 'undefined') {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }
      return { theme };
    }),
  restoreAccessToken: async () => {
    try {
      const newAccessToken = await getAccessToken();
      const token = newAccessToken ?? '';
      set({ accessToken: token });
      return token;
    } catch (error) {
      console.error('Failed to restore access token:', error);
      return '';
    }
  },
}));
