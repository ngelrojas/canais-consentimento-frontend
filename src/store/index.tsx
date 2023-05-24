import { create } from 'zustand';
import { CanaisStore, LoginStore, TotalRegisters } from '../services';

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

export const useTotalRegister = create<TotalRegisters>((set) => ({
  totalIn: 0,
  totalOut: 0,
  setTotalIn: (data) => set(() => ({ totalIn: data })),
  setTotalOut: (data) => set(() => ({ totalOut: data })),
}));