import { jwtDecrypt } from "../../../utils/jwtDecoder";

export default {
    setAuthStatus(state, data){
        state.authStatus = data;
    },
    saveAuthenticationData(state, data){
        const authData = {
            token: data.access_token,
            expiration: jwtDecrypt(data.access_token).exp,
            userId: jwtDecrypt(data.access_token).user_id,
            refreshToken: ""
          };
        
        localStorage.setItem("access_token", data.access_token);
        
        if(data.refresh_token){
            localStorage.setItem("refresh_token", data.refresh_token);
            authData['refreshToken'] = data.refresh_token
        }
       
          state.authenticationData = authData
    }
}