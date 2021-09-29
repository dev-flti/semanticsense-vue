import requestHandler from "../../../utils/requestHandler"

export default {
    async loadOntologies(){
        let response = await requestHandler.get("http://localhost:8000/api/ontology/list/")
        console.log(response)
    }
}