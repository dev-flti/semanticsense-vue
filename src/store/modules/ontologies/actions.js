import requestHandler from "../../../utils/requestHandler"
import { getBackendBaseUrl, getCreateCategoriesEndpoint, getOntologieListEndpoint, getOntologyCategoriesEndpoint, getOntologyDataEndpoint, getOntologyDeleteEndpoint, getOntologyImportEndpoint} from "../../../utils/envHelper"

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
        // console.log(url)
        let response = await requestHandler.get(url, {
            params: params
        })
        // console.log(response.data)
        if(response && response.data){
            context.commit('setChosenOntology', response.data);
        }
    },
    async deleteOntology(context, data){
        const url = getBackendBaseUrl() + getOntologyDeleteEndpoint()
        const params = {
            'id': data,
        }
        await requestHandler.delete(url, {
            params: params
          })
        // console.log("deleted")
        context.dispatch('loadOntologies')
        // console.log("reloaded")

        
    },
    async uploadOntology(_, data){
        const url = getBackendBaseUrl() + getOntologyImportEndpoint()
        // console.log("url")
        // console.log(url)
        const headers = {
            'Content-Type': 'application/json',
          }
        
        const payload = {
            title: data.title,
            url: data.url,
            user: localStorage.getItem("userId"),
            description: data.description,
            category_id: data.category_id
        }

        // console.log(payload)
        /* const response = */ await requestHandler.post(url, payload, {
          headers: headers
        })
        .catch((err) => {
           alert(err);
        });

        // console.log("response")
        // console.log(response)
    },
    async loadCategories(context){
        const url = getBackendBaseUrl() + getOntologyCategoriesEndpoint()
        
        let response = await requestHandler.get(url)
        if(response && response.data){
            context.commit('setCategoryList', response.data.results);
        }
    },
    async saveCategory(_, data){
        const url = getBackendBaseUrl() + getCreateCategoriesEndpoint()
        // console.log("url")
        // console.log(url)
        const headers = {
            'Content-Type': 'application/json',
          }
        
        const payload = {
            title: data.title,
            description: data.description
        }

        // console.log(payload)
        /* const response = */ await requestHandler.post(url, payload, {
          headers: headers
        })
        .catch((err) => {
           alert(err);
        });

        // console.log("response")
        // console.log(response)
    },
}

/*   
https://nx16910.your-storageshare.de/s/B5noPtzXG7X2PXE/download/semantichardwarewebontology_old.owl 
*/