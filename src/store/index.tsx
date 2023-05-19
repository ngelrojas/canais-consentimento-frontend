import { create } from 'zustand';
import { CanaisStore, LoginStore } from '../services';

export const useCanaisStore = create<CanaisStore>((set) => ({
  filterCanais: null,
  setFilterCanais: (data) => set(() => ({ filterCanais: data })),
}));

export const useLoginStore = create<LoginStore>((set) => ({
  userName: '',
  password: '',
  resp: null,
  setToken: (data) => set(() => ({ resp: data })),
}));