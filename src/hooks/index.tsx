import { useEffect } from 'react';
import { Canais } from '../services/service.canais';
import { Login } from '../services/service.login';
import { useCanaisStore, useLoginStore, useTotalRegister } from '../store';
import { LocalStorageService } from '../services/service.token';

//TODO: before upload to dev or hml, server, remove .getFilterCanaiss replace to .getFilterCanais
export const useFilterCanais = (filter: any) => {
  const { filterCanais, setFilterCanais } = useCanaisStore();
  const token = new LocalStorageService().getItem('token');
  
  useEffect(() => {
    const fetchFilterCanais = async () => {
      const canais = new Canais(token);
      const data = await canais.getFilterCanaiss(filter);
      setFilterCanais(data);
    };

    fetchFilterCanais();
  }, [setFilterCanais]);

  return filterCanais;
};

export const useLogin = (userName: string, password: string) => {
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

export const useTotalRegisters = (tIn:number, tOut:number) => {

  const { totalIn, setTotalIn, totalOut, setTotalOut } = useTotalRegister();

  useEffect(() => {
    setTotalIn(tIn);
    setTotalOut(tOut);
  }, []);
  
    return { totalIn, totalOut };
};
