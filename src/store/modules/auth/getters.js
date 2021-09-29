import { tokenAlive } from "../../../utils/jwtDecoder";
export default{
    getAuthenticationData(state){
        return state.authenticationData
    },
    getLoginStatus(state){
        return state.authStatus
    },
    isTokenActive(state){
        
        if (!state.authenticationData.expiration){
            return false
        }
        else return tokenAlive(state.authenticationData.expiration)
    },
    userId(state) {
        return state.userId;
    },
    token(state){
        return state.token;
    },
    isAuthenticated(state){
        return !!state.token;
    },
    didAutoLogout(state){
        return state.didAutoLogout;
    }
    
      
}