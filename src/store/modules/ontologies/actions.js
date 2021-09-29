import requestHandler from "../../../utils/requestHandler"
import { getBackendBaseUrl, getOntologieListEndpoint, getOntologyDataEndpoint, getOntologyImportEndpoint} from "../../../utils/envHelper"

export default {
    async loadOntologies(context){
        
        let response = await requestHandler.get(getBackendBaseUrl() + getOntologieListEndpoint())
        if(response && response.data){
            context.commit('setOntologyList', response.data.results);
        }
    },
    async loadSingleOntology(context, data){
        const params = {
            'id': data,
        }
        const url = getBackendBaseUrl() + getOntologyDataEndpoint()
        console.log(url)
        let response = await requestHandler.get(url, {
            params: params
        })
        console.log(response.data)
        if(response && response.data){
            context.commit('setChosenOntology', response.data);
        }
    },
    async uploadOntology(_, data){
        const url = getBackendBaseUrl() + getOntologyImportEndpoint()
        console.log("url")
        console.log(url)
        const headers = {
            'Content-Type': 'application/json',
          }
        
        const payload = {
            title: data.title,
            url: data.url,
            user: localStorage.getItem("userId"),
            description: data.description
        }

        console.log(payload)
        const response = await requestHandler.post(url, payload, {
          headers: headers
        })
        .catch((err) => {
          console.log(err);
        });

        console.log("response")
        console.log(response)
    }
}

// https://nx16910.your-storageshare.de/s/B5noPtzXG7X2PXE/download/semantichardwarewebontology_old.owl