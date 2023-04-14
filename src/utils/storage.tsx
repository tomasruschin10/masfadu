import jwtDecode from 'jwt-decode';
import { updateUserdata } from '../redux/actions/user';
import { store } from '../redux/store';

export const getUserDataWithToken = (token) => {
    if ( !!token ) {
        const userData:any = jwtDecode(token)
        store.dispatch(updateUserdata(userData.userData))
    }
}