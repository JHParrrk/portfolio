import { create } from 'zustand';
import { getAccessToken } from '@/shared/api/libraries/getAccessToken';

interface GlobalState {
  accessToken: string;
  setAccessToken: (token: string) => void;
  visitedPage: string;
  setVisitedPage: (page: string) => void;
  restoreAccessToken: () => Promise<string>;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  accessToken: '',
  setAccessToken: (token: string) => set({ accessToken: token }),
  visitedPage: '',
  setVisitedPage: (page: string) => set({ visitedPage: page }),
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
