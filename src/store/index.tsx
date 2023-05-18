import { create } from 'zustand';
import { CanaisStore, LoginStore } from '../services';

export const useCanaisStore = create<CanaisStore>((set) => ({
  totalCanais: null,
  filterCanais: null,
  setTotalCanais: (data) => set(() => ({ totalCanais: data })),
  setFilterCanais: (data) => set(() => ({ filterCanais: data })),
}));

export const useLoginStore = create<LoginStore>((set) => ({
  userName: '',
  password: '',
  resp: null,
  setToken: (data) => set(() => ({ resp: data })),
}));