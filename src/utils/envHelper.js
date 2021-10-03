export function getBackendBaseUrl(){
    return process.env.VUE_APP_BACKEND_BASE_URL
}

//Annotation Endpoints
export function getAnnotationListEndpoint(){
    return process.env.VUE_APP_GET_ANNOTATIONS_ENDPOINT
}
export function getAnnotationDataEndpoint(){
    return process.env.VUE_APP_GET_ANNOTATION_DATA_ENDPOINT
}
export function getPostAnnotationEndpoint(){
    return process.env.VUE_APP_POST_ANNOTATION_ENDPOINT
}

//Ontology Endpoints
export function getOntologieListEndpoint(){
    return process.env.VUE_APP_GET_ONTOLOGIES_ENDPOINT
}
export function getOntologyDeleteEndpoint(){
    return process.env.VUE_APP_ONTOLOGY_DELETE_ENDPOINT
}
export function getOntologyDataEndpoint(){
    return process.env.VUE_APP_GET_ONTOLOGY_DATA_ENDPOINT
}
export function getOntologyImportEndpoint(){
    return process.env.VUE_APP_GET_ONTOLOGY_UPLOAD_ENDPOINT
}
export function getOntologyCategoriesEndpoint(){
    return process.env.VUE_APP_GET_CATEGORIES_ENDPOINT
}

//User Endpoints
export function getUserTokenRefreshEndpoint(){
    return process.env.VUE_APP_USER_TOKEN_REFRESH_ENDPOINT
}
export function getUserCreateEndpoint(){
    return process.env.VUE_APP_USER_CREATE_ENDPOINT
}
export function getUserTokenAuthEndpoint(){
    return process.env.VUE_APP_USER_TOKEN_AUTH_ENPOINT
}
