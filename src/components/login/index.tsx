import { useLogin } from '../../hooks';
import { CREDENTIALS } from '../../constants';
import { LocalStorageService } from '../../services/service.token';

export function LoginOpt(){
    const response = useLogin(CREDENTIALS.userName, CREDENTIALS.password);
    const localStorageService = new LocalStorageService();
    const token = response?.data.token || '';
    localStorageService.setItem('token', token);
    return <span />;
}