import { useEffect } from 'react';
import { Canais } from '../services/service.canais';
import { useCanaisStore } from '../store';

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
