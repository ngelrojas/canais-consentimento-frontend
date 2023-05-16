import { useLogin } from '../../hooks';
import { CREDENTIALS } from '../../constants';
import { LocalStorageService } from '../../services/service.token';

export function LoginOpt(){
    const token = useLogin(CREDENTIALS.userName, CREDENTIALS.password);
    const localStorageService = new LocalStorageService();
    localStorageService.setItem('token', token.data.token);
    return (
        <span />
    )
}