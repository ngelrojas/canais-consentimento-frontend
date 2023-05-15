import { useEffect } from 'react';
import { Canais } from '../services/service.canais';
import { Login } from '../services/service.login';
import { useCanaisStore, useLoginStore } from '../store';

export const useTotalCanais = (token: any) => {
  const { totalCanais, setTotalCanais } = useCanaisStore();

  useEffect(() => {
    const fetchTotalCanais = async () => {
      const canais = new Canais(token);
      const data = await canais.getTotalCanais();
      setTotalCanais(data);
    };

    fetchTotalCanais();
  }, [token, setTotalCanais]);

  return totalCanais;
};

export const useFilterCanais = (token: any, filter: any) => {
  const { filterCanais, setFilterCanais } = useCanaisStore();

  useEffect(() => {
    const fetchFilterCanais = async () => {
      const canais = new Canais(token);
      const data = await canais.getFilterCanais(filter);
      setFilterCanais(data);
    };

    fetchFilterCanais();
  }, [token, filter, setFilterCanais]);

  return filterCanais;
};
// TODO: check this point is not returning
export const useLogin = (userName: string, password: string) => {
  const {resp, setToken } = useLoginStore();

  useEffect(() => {
    const fetchLogin = async () => {
      const login = new Login(userName, password);
      const data = await login.getToken();
      console.log("HERE =>> ", data);
      setToken(data);
    };
    console.log("HERE =>> ", resp);

    fetchLogin();
  },[resp, setToken]);

  return resp;
}