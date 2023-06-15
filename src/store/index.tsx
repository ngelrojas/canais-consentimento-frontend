import { create } from 'zustand';
import { CanaisStore, LoginStore, TotalRegisters, AuthStore } from '../services';
import { Login } from '../services/service.login';
import { LocalStorageService } from '../services/service.token';

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

const localStorage = new LocalStorageService()

// TODO: change getSignInn to getSignIn
export const useAuthStore = create<AuthStore>((set) => ({
  loggedIn: false,
  username: '',
  login: (username: string, password: string) => {
    let authIn = new Login(username, password);
    
    authIn.getSignInn().then((resp: any) => {
      set({ loggedIn: true, username: resp.data.profiles[0] });
      localStorage.setItem("errorLogin", false);
      localStorage.setItem("loggedIn", true);
    }).catch((err) => {
      set({ loggedIn: false, username: `${err}` });
      localStorage.setItem("errorLogin", true);
    })

  },
  logout: () => {
    set({ loggedIn: false, username: '' });
    localStorage.setItem("loggedIn", false);
  },
})

);
