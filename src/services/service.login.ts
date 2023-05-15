import API from '../api';
import { PATH } from '../constants';

export class Login {
    private userName: String;
    private password: String;
    private response: any;

    constructor(userName: String, password: String) {
        this.userName = userName;
        this.password = password;
    }

    public async getToken () {
        this.response = await API.post(PATH.urlLogin, {
            userName: this.userName,
            password: this.password
        });
        return this.response; 
    }


}