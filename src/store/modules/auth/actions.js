import axios from "axios"

//let timer;
export default {
    async login(context, payload){

       let data = JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true})
        // console.log(data)

        const headers = {
          'Content-Type': 'application/json',
        }
        const response = await axios
        .post("http://localhost:8000/api/user/token-auth/", data, {
          headers: headers
        })
        .catch((err) => {
          console.log(err);
        });
        if (response && response.data) {
          console.log(response.data)
          // console.log(response.data)
          context.commit("saveAuthenticationData", {
                        access_token: response.data.authCredentials.access,
                        refresh_token: response.data.authCredentials.refresh,
                        userId: response.data.user.id
                    });
          context.commit("setAuthStatus", "success");
        } else {
          context.commit("setAuthStatus", "failed");
        }     
    },
        logout(context) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userId');

        context.commit('clearAuthenticationData')
    },
    // signup(context, payload){
    //     return context.dispatch('auth', {
    //         ...payload,
    //         mode: 'signup'
    //     })
    // },
    // async auth(context, payload){

    //     const mode = payload.mode;
    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3wA9fKG5ak8_DyiGDzlRgycJCg1Aqq7M';

    //     if(mode === 'signup'){
    //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3wA9fKG5ak8_DyiGDzlRgycJCg1Aqq7M'
    //     }
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             username: payload.email,
    //             password: payload.password,
    //             returnSecureToken: true
    //         })
    //     });  
  
    //     const responseData = await response.json();
  
    //     if(!response.ok){
    //         throw new Error(responseData.message || 'failed to login user');
    //     }
        
        
    //     const expireIn = +responseData.expiresIn * 1000;
    //     const expirationDate = new Date().getTime() + expireIn;
    //     localStorage.setItem('token', responseData.idToken);
    //     localStorage.setItem('userId', responseData.localId);
    //     localStorage.setItem('tokenExpiration', expirationDate);

    //     timer = setTimeout(function() {
    //         context.dispatch('autoLogout');
    //     }, expireIn)

    //     context.commit('setUser', {
    //       token: responseData.idToken,
    //       userId: responseData.localId,
    //    })
    // },
    
    // logout(context) {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('id');
    //     localStorage.removeItem('tokenExpiration');

    //     clearTimeout(timer);

    //     context.commit('setUser', {
    //         token: null,
    //         userId: null,
    //     })
    // },
    // tryLogin(context) {
    //     const token = localStorage.getItem('token');
    //     const id = localStorage.getItem('userId');
    //     const tokenExpiration = localStorage.getItem('tokenExpiration');

    //     const expiresIn = +tokenExpiration - new Date().getTime();

    //     if(expiresIn < 0){
    //         return;
    //     }

    //     timer = setTimeout(function(){
    //         context.dispatch('autoLogout')
    //     }, expiresIn);

    //     if(token && id){
    //         context.commit('setUser',{
    //             token: token, 
    //             userId: id,
    //         });
    //     }

    // },
    // autoLogout(context){
    //     context.dispatch('logout');
    //     context.commit('setAutoLogout');
    // }
}