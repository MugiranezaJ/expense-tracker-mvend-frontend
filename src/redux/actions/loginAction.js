import Axios from './axiosConfig'

export const USER_LOGIN = 'LOGIN';
export const LoGIN_LOADING = 'LOADING';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const loginAction = (userCredentials) => dispatch => {
    dispatch({
        type: LoGIN_LOADING
    });
    return Axios.post(`/login`,
    userCredentials
    )
    .then((res) => {
        localStorage.setItem('etrackertoken',res.data.token);
        dispatch({
            type: USER_LOGIN
        })
    })
    .catch(err=>{
        if(err.message === 'Network Error'){
            dispatch({
                type: USER_LOGIN,
                error: err.message
            })
        }
        if(err.response){
            dispatch({
                type: USER_LOGIN,
                error: err.response.data.error
            })
        }
    });
}

export const closeSnackbar = () => dispatch =>{
    dispatch({
        type: CLOSE_SNACKBAR
    });
}