import { jwtDecrypt } from "../../../utils/jwtDecoder";

export default {
    setAuthStatus(state, data){
        state.authStatus = data;
    },
    saveAuthenticationData(state, data){
        const authData = {
            token: data.access_token,
            expiration: jwtDecrypt(data.access_token).exp,
            userId: null,
            refreshToken: null
          };
        
        localStorage.setItem("access_token", data.access_token);
        state.authenticationData.token = authData.token
        state.authenticationData.expiration = authData.expiration
        if(data.refresh_token){
            localStorage.setItem("refresh_token", data.refresh_token);
            authData['refreshToken'] = data.refresh_token
            state.authenticationData.refresToken = authData.refreshToken

        }
        if(data.userId){
            localStorage.setItem("userId", data.userId);
            authData['userId'] = data.userId
            state.authenticationData.userId = authData.userId

        }
       
          //state.authenticationData = authData
    },
    clearAuthenticationData(state){
        const authData = {
            token: "",
            expiration: "",
            userId: "",
            refreshToken: ""
          };
        
          state.authenticationData = authData

        
    }
}