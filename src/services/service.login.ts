import API from '../api';
import { PATH } from '../constants';
import axios from 'axios';

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

export class SignIn {
    private userName: String;
    private password: String;
    private response: any;

    constructor(userName: String, password: String) {
        this.userName = userName;
        this.password = password;
    }

    public async getProfile(){
        // this.response = await API.get(PATH.urlGroup);
        // return this.response;
        // return ['GroupFrontend', 'GroupBackend', 'GroupMobile'];
        this.response = axios.post('https://dummyjson.com/auth/login', {
            username: this.userName,
            password: this.password
        })
        return this.response;
    }
}

// export const getToken = async (userName: string, password: string) => {
//   const response = await API.post(PATH.urlLogin, {
//     userName,
//     password,
//   });
//   return response;
// };
