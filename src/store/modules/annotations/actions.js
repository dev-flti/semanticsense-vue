import requestHandler from "../../../utils/requestHandler"
import { getAnnotationDataEndpoint, getAnnotationListEndpoint, getBackendBaseUrl, getPostAnnotationEndpoint } from "../../../utils/envHelper"

export default {
    async saveAnnotation(_, data){
        const url = getBackendBaseUrl() + getPostAnnotationEndpoint()
        const headers = {
            'Content-Type': 'application/json',
          }
        /* const response = */ await requestHandler.post(url, data, {
          headers: headers
        })
        .catch((err) => {
           alert(err);
        });
    },
    async loadAnnotations(context){
        let response = await requestHandler.get(getBackendBaseUrl() + getAnnotationListEndpoint())
            if(response && response.data){
                context.commit('setAnnotationsList', response.data.results);
            }

    },
    async loadAnnotationData(_, data){
        const url = getBackendBaseUrl() + getAnnotationDataEndpoint()
        const params = {
            'id': data,
        }
        let response = await requestHandler.get(url, {
            params: params
        })        
        if(response && response.data){
            return response.data;
        }
    }
    
}