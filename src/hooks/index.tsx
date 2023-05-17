import { useEffect } from 'react';
import { Canais } from '../services/service.canais';
import { Login } from '../services/service.login';
// import { getToken } from '../services/service.login';
import { useCanaisStore, useLoginStore } from '../store';
import { LocalStorageService } from '../services/service.token';

// export const useTotalCanais = (token: any) => {
//   const { totalCanais, setTotalCanais } = useCanaisStore();

//   useEffect(() => {
//     const fetchTotalCanais = async () => {
//       const canais = new Canais(token);
//       const data = await canais.getTotalCanais();
//       setTotalCanais(data);
//     };

//     fetchTotalCanais();
//   }, [token, setTotalCanais]);

//   return totalCanais;
// };

export const useFilterCanais = (filter: any) => {
  const { filterCanais, setFilterCanais } = useCanaisStore();
  const token = new LocalStorageService().getItem('token');
  
  useEffect(() => {
    const fetchFilterCanais = async () => {
      const canais = new Canais(token);
      const data = await canais.getFilterCanais(filter);
      console.log('IN DATA: ', data);
      setFilterCanais(data);
    };

    fetchFilterCanais();
  }, [filter, setFilterCanais]);

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

// export const useLogin = (userName: string, password: string) => {
//   const { resp, setToken } = useLoginStore();
//   useEffect(() => {
//     const fetchLogin = async () => {
//       const data = await getToken(userName, password);
//       console.log(data);
//       setToken(data);
//     };
//     fetchLogin();
//   }, []);

//   return resp;
// };
