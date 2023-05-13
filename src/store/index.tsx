import { create } from 'zustand';
import { CanaisStore } from '../services';

export const useCanaisStore = create<CanaisStore>((set) => ({
  totalCanais: null,
  filterCanais: null,
  setTotalCanais: (data) => set(() => ({ totalCanais: data })),
  setFilterCanais: (data) => set(() => ({ filterCanais: data })),
}));