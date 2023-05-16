import API from '../api';
import { PATH } from '../constants';
import axios from 'axios';

export class Canais {
    
    private token: any;
    private response: any;

    constructor(token: any) {
        this.token = token;
    }

    /*
    *  @description: Retorna todos os canais totalizados 
    */
    public async getTotalCanais () {
        this.response = await API.get(`/canaistotal`
        // ,{
        //     headers: {
        //         Authorization: `Token ${this.token}`
        //     }
        // }
        );
        return this.response; 
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

    public async getFilterCanaiss (filter: any) {
        this.response = await axios.get('http://localhost:3001/search')
        return this.response; 
    }

}