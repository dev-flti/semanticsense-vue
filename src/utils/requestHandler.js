import axios from 'axios'
import store from '../store/index';
 
const requestHandler = axios.create({});
 
 
requestHandler.interceptors.request.use((config) => {
    const authData = store.getters["auth/getAuthenticationData"];
    if (authData == null) {
      return config;
    }
    
    // console.log("authData")
    // console.log(authData)
    config.headers.common["Authorization"] = `Bearer ${authData.token}`;
    return config;
  });
  
  requestHandler.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if(! error.response){
        return null
      }
      if (error.response.status === 401) {
        const authData = store.getters["auth/getAuthenticationData"];
        console.log(authData)
        const payload = {
          refresh: authData.refreshToken,
        };
        
        //console.log("payload")
        console.log(payload)


        var response = await axios.post(
          "http://localhost:8000/api/user/token-refresh/",
          payload
        );
         console.log("reponse")
         console.log(response.data)

        store.commit("auth/saveAuthenticationData", {
          access_token: response.data.access 
        });

        error.config.headers[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        return axios(error.config);
      } else {
        return Promise.reject(error);
      }
    }
  );
  
  export default requestHandler;