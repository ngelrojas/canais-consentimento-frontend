import API from '../api';
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
        this.response = await API.get(`/search?${filter}`
        // , {
        //     headers: {
        //         Authorization: `Token ${this.token}`
        //     }
        // }
        );
        return this.response; 
    }

}