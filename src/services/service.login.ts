import API from '../api';
import { PATH } from '../constants';
import { PATH_LOGIN_PLATFORM, PATH_OAUTH_LOGIN_API } from '../api/config';
import axios from 'axios';

export class Login {
    private userName: String;
    private password: String;
    private response: any;

    constructor(userName: String, password: String) {
        this.userName = userName;
        this.password = password;
    }

    /**
     * @description: Retorna o token de acesso da API
     * **/
    //TODO: change name getToken to getLogin
    public async getToken () {
        this.response = await API.post(PATH_OAUTH_LOGIN_API, {
            userName: this.userName,
            password: this.password
        });
        return this.response; 
    }

    /**
     * @description: Retorna o profile do usuario logado na area administrativa
     * **/
    public async getSignIn () {
        this.response = await API.post(PATH_LOGIN_PLATFORM, {
            userName: this.userName,
            password: this.password
        });
        return this.response; 
    }

    /*
    * TODO: method below is just for test
    */
   public async getSignInn () {
        let groups = {};
        
        groups = {
            "data": {
                    "profiles": ['GroupFrontend', 'GroupBackend', 'GroupMobile']
            }
        };
        
        return groups;
   }
}
