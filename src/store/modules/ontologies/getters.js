export default {
  
    categories(state) {
        return state.categories
    },
    ontologies(state) {
        return state.ontologies
    },
    getClasses(state) {
        return state.chosenOntology.classes
    },
    getRelations(state) {
        return state.chosenOntology.properties
    },
    getPossibleTripels(state) {
        // let relations = state.chosenOntology.relations;
        // let tripels = [];
        // Object.entries(relations).forEach(([key, value]) => {
        //     value.subjs.forEach(subject => {
        //         value.objs.forEach(object => {
        //             tripels.push({
        //                 subj: subject,
        //                 pred: key,
        //                 obj: object
        //             })
        //         })
        //     });
        // });
        return state.chosenOntology.possible_tripels
    },
    isInPossibleTripels: (_, getters) => (testObj) => {
        
        let tripels = getters.getPossibleTripels;

        if(tripels.some(tripel => tripel.subj.id === testObj.subj.id && tripel.pred.id === testObj.pred.id && tripel.obj.id === testObj.obj.id)){
            //console.log("true")
            return true
        } else{
            //console.log("false")
            return false
        }
    },
    getClassData: (_, getters) => (id) => {
        return getters.getClasses[id]
    },
    getSubjects(_, getters){
        

        let tripels = getters.getPossibleTripels
        let subjectIds = []
        let subjects = []
        if (tripels){
            tripels.forEach(ele => {
                if(ele.predicate.id in getters.getRelations['not_functional'] ){
                    if(!subjectIds.includes(ele.subj.id)){
                        subjectIds.push(ele.subj.id)
                }
            }})
        
        subjectIds.forEach(e => {
            subjects.push({
                id: e,
                class_data: getters.getClasses[e]})
        })
        }
       
        return subjects;
    },
    getPredicates(_, getters){
        let predicates = [];
        if(getters.getRelations)
        Object.entries(getters.getRelations).forEach(([key, value]) => {
            predicates.push({
                "id": key,
                "name": value.relation_name
            })
        })
        return predicates
    },
    getChosenOntology(state){
        return state.chosenOntology
    }
}