import { useEffect } from 'react';
import { Canais } from '../services/service.canais';
import { Login, SignIn } from '../services/service.login';
import { useCanaisStore, useLoginStore, useSignInStore } from '../store';
import { LocalStorageService } from '../services/service.token';


//TODO: before upload to dev or hml, server, remove .getFilterCanaiss replace to .getFilterCanais
export const useFilterCanais = (filter: any) => {
  const { filterCanais, setFilterCanais } = useCanaisStore();
  const token = new LocalStorageService().getItem('token');
  
  useEffect(() => {
    const fetchFilterCanais = async () => {
      const canais = new Canais(token);
      const dataFilter = await canais.getFilterCanaiss(filter);
      setFilterCanais(dataFilter.data[0]?.dados);
    };

    fetchFilterCanais();
  }, [setFilterCanais]);

  return filterCanais;
};

export const useLogin = (userName: any, password: any) => {
  const {resp, setToken } = useLoginStore();
  
  useEffect(()  => {
    const fetchLogin = async () => {
      const login = new Login(userName, password);
      const data = await login.getToken();
      setToken(data);
    };
    fetchLogin();
  }, []);
  
  return resp;
};

export const useSignIn = (userName: any, password: any) => {
  const {resp, setToken } = useSignInStore();

  useEffect(()  => {
    const fetchSignIn = async () => {
      const signIn = new SignIn(userName, password);
      const data = await signIn.getProfile();
      setToken(data);
    }
    fetchSignIn();
  }, []);
  return resp;
}