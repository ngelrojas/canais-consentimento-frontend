import API from '../api';
import { PATH } from '../constants';

export class Canais {
    
    private token: any;
    private response: any;

    constructor(token: any) {
        this.token = token;
    }

    /*
    * @description: Retorna todos os canais filtrados por
    * @param: filter: any
    */
    public async getFilterCanais (filter: any) {
        this.response = await API.get(`${PATH.urlAPI}?${filter}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }
        );
        return this.response; 
    }

}