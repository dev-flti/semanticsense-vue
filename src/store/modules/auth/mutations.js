import { jwtDecrypt } from "../../../utils/jwtDecoder";

export default {
    setAuthStatus(state, data){
        state.authStatus = data;
    },
    saveAuthenticationData(state, data){
        
        
        localStorage.setItem("access_token", data.access_token);
        state.authenticationData.token =data.access_token
        state.authenticationData.expiration = jwtDecrypt(data.access_token).exp

        if(data.refresh_token){
            localStorage.setItem("refresh_token", data.refresh_token);
            state.authenticationData.refreshToken =  data.refresh_token

        }
        if(data.userId){
            localStorage.setItem("userId", data.userId);
            state.authenticationData.userId = data.userId

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