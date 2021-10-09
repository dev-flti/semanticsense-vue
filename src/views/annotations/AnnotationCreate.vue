<template>
    <div class="container mb-4">
        <objects-modal v-if="checkedPredicate" 
        :show="openModal" 
        :isFunctional="checkedPredicate.is_functional == '1'" @save-close="addObjects" @close="closeDialog"
        :literals="literals"
        :individuals="individuals"
        :classes="classes"></objects-modal>
        <div class="action-bar">
           <button class="btn-lg btn-primary" type="button" id="save" :disabled="tripels.length == 0 || !root_id" @click="saveAnnotation()"> 
                            Save
           </button>
        </div>

    <div class="accordion" id="metadata">
        <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Project Metadata
        </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
        <div class="row">
            <div class="col inputs">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="sensorName" placeholder="Title" v-model="title"/>
                    <label for="sensorName">Title</label>
                </div>
                
                <div class="form-floating">
                            <textarea class="form-control" placeholder="Enter description" id="inputDescription" style="resize:none; height: 100px" v-model="description"></textarea>
                            <label for="inputDescription">Description</label>
                </div>

        
             </div>
            <div class="col inputs">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="author" placeholder="Author" v-model="author"/>
                    <label for="author">Author</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="date" class="form-control" id="date" placeholder="Date" v-model="date"/>
                    <label for="date">Date</label>
                </div>

            </div>      
        </div>
        </div>
        </div>
    </div>
</div> 

<div id="choose_ontology">

    <div class="ontology-wrapper d-flex mt-4">
        <div class="ontology-details ontology-dropdown">

        <div class="selector-label form-floating mb-3">
            <select id="selectOntology" class="form-select d-flex justify-content-center" @change="onOntologySelectorChange" v-model="ontology_id" aria-label="Ontology Selector">
                <option selected disabled>Select Ontology</option>
                <option v-for="ont in ontologies" :key="ont.id" :value="ont.id">{{ont.title}}</option>
            </select>
            <label for="selectOntology">Select Ontology</label>
        </div>
    
        </div>
        <div v-if="chosenOntology" class="ontology-info-wrapper">
        <div  class=" ontology-details">
            <div class="single-detail">
                <span>Title</span>
                <p>{{chosenOntology.title}}</p>
            </div>
              <div class="single-detail">
                <span>Creation Date:</span>
                <p>{{chosenOntology.creation_date}}</p>
            </div>
        </div>
            <div class="ontology-description">
          <p>{{chosenOntology.description}}</p>
        </div>
        </div>
    </div>
</div>
<annotation-individual :literalList="literals" :individualsList="individuals" @add-literal="addLiteral" @add-individual="addIndividual" @delete-individual="removeIndividual" @delete-literal="removeLiteral"></annotation-individual>

<div>
    <div>
        <h3>Select Root Individual</h3>
          <div class="selector-label form-floating mb-3">
                        <select class="form-select d-flex justify-content-center" aria-label="Default select example" v-model="root_id">
                            <option value="-1"  disabled>Select Root Individual</option>
                            <option v-for="(sub, index) in individuals" :key="index" :value="index">{{sub.name}}</option>    
                        </select>
                        <label for="inputSelect">Select Subject</label>
                    </div>
    </div>
</div>

<div id="add_annotation" class="add-annotation">
    <div class="annotation-create-wrapper">
    <div class="annotation-create-item">
        <div class="add-annotation-section-header">
                    <h3>Subject</h3>
                    <div class="selector-label form-floating mb-3">
                        <select class="form-select d-flex justify-content-center" aria-label="Default select example" @change="onSubjectSelectorChange($event)" v-model="subject_id">
                            <option value="-1"  disabled>Select Subject Class</option>
                            <option v-for="(sub, index) in individuals" :key="index" :value="index">{{sub.name}}</option>    
                        </select>
                        <label for="inputSelect">Select Subject</label>
                    </div>

                     
            </div>
            <div v-if="subject" class="triple-save p-2" >
                <div class="triple-save-section">
                 <div class="tripel-part-data">
                    <span class="data-label">Name</span>
                    <span>{{individuals[subject.id].name}}</span>
                 </div>
                 <div class="tripel-part-data">
                        <span class="data-label">Class Type</span>
                        <span>{{classes[individuals[subject.id].classId].name}}</span>
                    </div>
                 <div class="tripel-part-data">
                    <span class="data-label">Label</span>
                    <span>{{individuals[subject.id].label}}</span>
                 </div>
                 <div class="tripel-part-data">
                    <span class="data-label">Comment</span>
                    <span>{{individuals[subject.id].comment}}</span>
                 </div>
                </div>
            </div>
    </div>
    
      <div class="annotation-create-item">
        <div class="add-annotation-section-header">
                    <h3>Predicate</h3>
                    
                    <div class="selector-label form-floating mb-3">
                            <select class="form-select d-flex justify-content-center" id="inputSelect" aria-label="Default select example" @change="onPredicateSelectorChange()" v-model="predicate_id">
                                <option value="-1" disabled selected>Literal Relations</option>
                                <option v-for="pred in ontologyRelations_f" :key="pred.id" :value="pred.id">{{pred.name}}</option>  
                                <option value="-2" disabled selected>Object Relations</option>
                                <option v-for="pred in ontologyRelations_nf" :key="pred.id" :value="pred.id">{{pred.name}}</option>  
                            </select>
                            <label for="inputSelect">Select Predicate</label>
                    </div>

                    
            </div>
                  <div v-if="checkedPredicate" class="triple-save p-2" >
                    <div class="triple-save-section">
                    <div class="tripel-part-data">
                        <span class="data-label">Name</span>
                        <span>{{checkedPredicate.name}}</span>
                    </div>
                    <div v-if="!checkedPredicate.is_functional" class="tripel-part-data">
                        <span class="data-label">Subjects</span>
                        <span>{{possibleSubjectsObjects.subj_output}}</span>
                    </div>
                    <div v-if="!checkedPredicate.is_functional" class="tripel-part-data">
                        <span class="data-label">Objects</span>
                        <span>{{possibleSubjectsObjects.obj_output}}</span>
                    </div>
                    </div>
                </div>
    </div>

      <div class="annotation-create-item">
        <div class="add-annotation-section-header">
                    <h3>Object</h3> 
                    <button class="btn btn-primary" :disabled="!checkedPredicate" @click="toggleObjectModal()" type="button" id="openModal">Choose Object</button>                   
            </div>
            <div class="triple-save p-2" >
                <div class="triple-save-section object">
                    <span v-if="checkedPredicate && o_array.length == 0" class="">Please choose object or literal</span>
                    <span v-if="!checkedPredicate" class="">First select predicate</span>
                
                <div v-if="checkedPredicate">
                <div v-if="!checkedPredicate.is_functional && o_array.length > 0">
                 <div  v-for="(o, index) in o_array" :key="o" class="triple-save-section">
                    <div class="tripel-part-data">
                        <span class="data-label">Name</span>
                        <span>{{individuals[o].name}}</span>
                    </div>
                    <div class="tripel-part-data">
                        <span class="data-label">Class Type</span>
                        <span>{{classes[individuals[o].classId].name}}</span>
                    </div>
                    <div class="tripel-part-data">
                        <span class="data-label">Label</span>
                        <span>{{individuals[o].label}}</span>
                    </div>
                    <div class="tripel-part-data">
                        <span class="data-label">Comment</span>
                        <span>{{individuals[o].comment}}</span>
                    </div>

                    <div v-if="index != o_array.length - 1">
                        <hr>
                    </div>

                    </div>

            </div>    

            <div v-if="checkedPredicate.is_functional && o_array.length > 0">
                <div  v-for="(o, index) in o_array" :key="index" class="triple-save-section">
                    <div class="tripel-part-data">
                        <span class="data-label">Value</span>
                        <span>{{literals[o].name}}</span>
                    </div>
                </div>
            </div>  
            </div> 

            </div>
        </div>
    </div>
    </div>
                <div class="add-tripel-btn-section">
                    <p class="fail-add-text" v-if="addFailure">{{failAddText}}</p>
                    <button class="btn-lg btn-primary" type="button" id="addTriple" @click="addTripel()"> 
                            Add Triple
                        </button>
                </div>
                  
            </div>


    <div v-for="(tripel, index) in tripels" :key="index" class="tripel-list-item">
  <div class="tripel-wrapper">
      <div class="tripel-part">
         <div> 
            <span class="data-label">Name:</span>
            <p>{{individuals[tripel.subject].name}}</p>
        </div>
        <div> 
            <span class="data-label">Label:</span>
            <p>{{individuals[tripel.subject].label}}</p>
        </div>
        <div> 
            <span class="data-label">Comment:</span>
            <p>{{individuals[tripel.subject].comment}}</p>
        </div>
      </div> 
      <div class="tripel-part">
          <div> 
                <span class="data-label">Name</span>
                <p>{{tripel.predicate.name}}</p>
            </div>
            <div> 
                <span class="data-label">Is Functional: {{tripel.predicate.is_functional ? "Yes" : "No"}}</span>
                <p>{{tripel.predicate.is_functional ? "Only Literals possible" : "Only Objects Possible"}}</p>
            </div>
      </div>
       <div v-if="!tripel.predicate.is_functional" class="tripel-part">
             <div class="triple-save-section">
                    <div class="tripel-part-data">
                        <span class="data-label">Name</span>
                        <span>{{individuals[tripel.object].name}}</span>
                    </div>
                    <div class="tripel-part-data">
                        <span class="data-label">Class Type</span>
                        <span>{{classes[individuals[tripel.object].classId].name}}</span>
                    </div>
                    <div class="tripel-part-data">
                        <span class="data-label">Label</span>
                        <span>{{individuals[tripel.object].label}}</span>
                    </div>
                    <div class="tripel-part-data">
                        <span class="data-label">Comment</span>
                        <span>{{individuals[tripel.object].comment}}</span>
                    </div>
               
            </div>
      </div> 
        <div v-if="tripel.predicate.is_functional" class="tripel-part">
            <div class="triple-save-section">
                <div class="tripel-part-data">
                    <span class="data-label">Value</span>
                    <span>{{literals[tripel.object].name}}</span>
                </div>
            </div>
        </div>
</div>

    <div class="tripel-actions">
        <button class="btn btn-secondary" type="button" :value="index" @click="removeTripel($event)">Remove</button>
    </div>
  </div>

 </div>
</template>

<script>
import { mapActions } from 'vuex'
import AnnotationIndividual from '../../components/annotations/AnnotationIndividual.vue'
import ObjectsModal from '../../components/annotations/ObjectsModal.vue'
//import TheHeader from '../../components/general/TheHeader.vue';

export default {
      components: {
            ObjectsModal,
           // TheHeader,
        AnnotationIndividual,
  },
    data(){
        return{

            //project metadata
            title: "",
            author: "", 
            date: "",
            description: "",

            //ontology data
            individuals: {},
            literals: {},
            ontology_id: "",
            subject_list: [],
            predicate_list: [],
            chosenOntology: null,
            ontologyRelations_f: null,
            ontologyRelations_nf: null,
            possibleTriples: [],
            classes: null,

            root_id: null,
            //variables current editable triple
            subject: null,
            predicate: null,
            o_array: [],
            subject_id: "",
            predicate_id: "",
    

            //triples
            tripels: [],
         
            //utils
            openModal: false,
            failAddText: "",
            addFailure: false
            // is_functional: null
        }
    },
    methods: {
        ...mapActions('ontologies', {
            loadOntologyData: 'loadSingleOntology',
            loadOntologiesList: 'loadOntologies',
        }),
        ...mapActions('annotations', {
            saveAnnotationToServer: 'saveAnnotation'
            }),
        addObjects(data){
            // console.log("hii")
            this.o_array = data;
            //  console.log(this.o_array)
            //  console.log(this.individuals)
            // console.log(this.literals)

            this.closeDialog();
        },
        addIndividual(data){
            // console.log("add object")
            // console.log(data)
            this.individuals[data.id] = data
        },
        addLiteral(data){
            // console.log("add Literal")
            // console.log(data)
            this.literals[data.id] = data
            
            // console.log(this.literals)
        },
        removeLiteral(data){
            delete this.literals[data]
        },
        removeIndividual(data){
            delete this.individuals[data]

        },
        closeDialog(){
            this.openModal = false;
            return;
        },
        toggleObjectModal(){
            this.openModal = !this.openModal
            

            return this.openModal
        },
        addTripel(){
            // console.log("Subj:")
            // console.log(this.subject)
            // console.log("Pred:")
            // console.log(this.predicate_id)
            // console.log("Obj:")
            // console.log(this.o_array)

        

            if(this.subject_id && this.checkedPredicate && this.o_array.length > 0){

            this.o_array.forEach(e => {
                    console.log(this.ontologyRelations)
                    console.log(this.checkedPredicate)
                    console.log(this.individuals[this.subject_id])
                    console.log(e)
                    let search = null
                    if(!this.checkedPredicate.is_functional){
                        search = this.ontologyRelations.find(x => x.subject.id === this.individuals[this.subject_id]['classId'] && x.predicate.id == this.checkedPredicate.id && x.object.id == this.individuals[e]['classId'])
                    }else {
                        search = this.ontologyRelations.find(x => x.subject.id === this.individuals[this.subject_id]['classId'] && x.predicate.id == this.checkedPredicate.id)
                    }
                    console.log(search)
                if(!search){
                    this.failAddText = "Tried to add a not valid combination of subject, predicate and object - please check and try again"
                    this.addFailure = true
                }else{
                    this.failAddText = ""
                    this.addFailure = false
                }
            })
            if(!this.addFailure){
                this.o_array.forEach(e => {

                    this.tripels.push({
                            subject: this.subject_id,
                            predicate: this.checkedPredicate,
                            object: e
                        })


                })
                    this.subject =  null
                    this.predicate = null
                    this.o_array = []
                    this.subject_id = ""
                    this.predicate_id = ""
                    this.addFailure = false
            }
             
           
            }else{
                this.failAddText = "There is something missing"
                    this.addFailure = true
            }
            // this.is_functional = null
            console.log(this.tripels)
        },
        removeTripel(event){
            console.log(event.target.value)
            this.tripels.splice(event.target.value, 1)
        },
        async onOntologySelectorChange(){
            // console.log(this.ontology_id)

            await this.loadOntologyData(this.ontology_id)
            

            this.getSubjects()
            this.getOntologyRelations()
            this.getPredicates()
            this.getChosenOntology() 
            this.getPossibleTripels()
            this.getClasses()

            // console.log(this.subject_list)
            // console.log(this.ontologyRelations)

            // console.log(this.chosenOntology)
            this.subject = null
            this.predicate = null
            this.o_array = []
            this.individuals= {}
            this.literals= {}
            this.tripels = []
            this.root_id = null
            // this.is_functional = false

        },
        onSubjectSelectorChange(event){
            // console.log(event.target.value)
             this.subject = {
                "id": event.target.value,
                // "data":  this.$store.getters['ontologies/getClassData'](event.target.value)
            }
        },
        onPredicateSelectorChange(){
          this.o_array = []          
          //this.isFunctional()
          //console.log("hi")
          //console.log(this.predicate_id)
          //console.log(this.checkedPredicate)

        },
        async saveAnnotation(){
            console.log(this.tripels)
            let save_data = {
                user_id: localStorage.getItem("userId"),
                title: this.title,
                author: this.author,
                description: this.description,
                date: this.date, 
                ontology_id: this.chosenOntology.ontology_id,
                root_name: this.individuals[this.root_id].name,
                individuals:{
                },
                literals: {       
                },
                relations:[]
            }
            this.tripels.forEach(e =>{
                if (!(e.subject in save_data.individuals)){
                    save_data.individuals[e.subject] = this.individuals[e.subject]
                }

                if(e.predicate.is_functional == "0"){
                    //Object.entries(e.objects).forEach(([key, value]) => {
                        if(!(e.object in save_data.individuals))
                        {
                            save_data.individuals[e.object] = this.individuals[e.object]
                            save_data.relations.push({
                            subject: e.subject,
                            predicate: e.predicate,
                            object: e.object
                            })
                        }
                    //})
                }else{
                    //e.objects.forEach(value => {
                        save_data.literals[e.object] = this.literals[e.object]
                        save_data.relations.push({
                            subject: e.subject,
                            predicate: e.predicate,
                            object: e.object
                        })
                    //})
                }
                
            })


                // console.log(e.subject)
                // console.log(e.predicate)
                // console.log(e.objects)
                 console.log("save-data:")
                 console.log(save_data)

                //await this.saveAnnotationToServer(save_data)

        },
        getSubjects(){
            this.subject_list = this.$store.getters['ontologies/getSubjects'];
        },
        getPredicates(){
            this.predicate_list = this.$store.getters['ontologies/getRelations'];
        },
        getChosenOntology(){
            this.chosenOntology = this.$store.getters['ontologies/getChosenOntology']
            // console.log(this.chosenOntology)
        },
        getClasses(){
            this.classes = this.$store.getters['ontologies/getClasses']
            // console.log(this.chosenOntology)
        },
        getOntologyRelations(){
            this.ontologyRelations_f =  Object.values(this.$store.getters['ontologies/getRelations']["functional"])
            this.ontologyRelations_nf =  Object.values(this.$store.getters['ontologies/getRelations']["not_functional"])

        },
        getPossibleTripels(){
            this.ontologyRelations =  this.$store.getters['ontologies/getPossibleTripels']
        },
    },
    computed: {
    
        ontologies(){
            return this.$store.getters['ontologies/ontologies'];
        },
        
        checkedSubject(){
            if(this.individuals.length > 0 && this.subject_id >= 0){
                return this.individuals[this.subject_id]
            }
            return null
        },
        checkedPredicate(){

            if(this.predicate_id != ""){
                //console.log("hi 3")
                //console.log(this.predicate_id)
                let pred = this.$store.getters['ontologies/getRelations']["functional"][this.predicate_id]
                if(!pred)
                   pred = this.$store.getters['ontologies/getRelations']["not_functional"][this.predicate_id]
                // console.log(pred)
                return pred
            }
                        //console.log("hi 2")

            //console.log(this.predicate_id)
            return null
        },
        possibleSubjectsObjects(){

            let objs = []
            let output = {
            subj_output: "",
            obj_output: "",
            }
            if(!this.checkedPredicate.is_functional){
                
                // console.log(this.ontologyRelations)
                
                this.ontologyRelations.forEach(element => {
                    
                    if(element.predicate.id == this.predicate_id){
                        output.subj_output += (this.$store.getters['ontologies/getClassData'](element.subject.id).name + ", ")
                        
                        let o = this.$store.getters['ontologies/getClassData'](element.object.id).name
                        if(!objs.includes(o))
                            objs.push(o)
                    }
                });

                output.subj_output = output.subj_output.substring(0, output.subj_output.length - 2);

                objs.forEach(element => {
                    output.obj_output += (element + ", ")
                });
                
                output.obj_output = output.obj_output.substring(0, output.obj_output.length - 2);

                }
                return output;
        },
        
    },
     created() {
        
        this.loadOntologiesList()
    }
}
</script>


<style scoped>

    .action-bar{
        float: right;
        border: none;
        padding: 1rem 0;
    }

    #metadata .accordion-button{
        background-color: #3B4018 ;
        color: white!important;
    }

    .inputs{
            flex-direction: column;
            display: flex;
    }

    .add-annotation{
        margin-top: 20px;
        width: 90%;
       
    }

    .add-annotation-section-header{
        width: 100%;
        padding: 20px;
        background-color: #3B4018;
        color: white;
        display: flex;
        flex-direction: column;
        height: 150px;
    }
    .add-annotation-section-header h3{
        text-align: center;
        padding: 0;
    }

    .annotation-create-item{
        width: 33.33%;
        padding: 20px;
    }

    .single-detail span{
        font-weight: bold;
    }


    .ontology-details{
        width: 20%;
        margin-right: 2rem;
    }
    .ontology-description{
        width: auto;
    }

    .ontology-wrapper{
        padding: 20px;
        border-bottom: 1px solid #3B4018;
        border-top: 1px solid #3B4018;
    }

    


    .ontology-dropdown{
        margin-bottom: auto;
        margin-top: auto;
    }


    .triple-save{
        /* border: 1px solid #a2a2a2; */
        border-radius: 5px;
        margin: 20px 0 5px 0;
    }

    .accordion-item{
        border: none!important;
    }

    .annotation-create-wrapper{
        display: flex;
        width: 100%;
    }
    .add-tripel-btn-section{
        justify-content: center;
        display: flex;
        flex-direction: column;
        margin-bottom: 40px;
        align-items: center;

    }
    .add-tripel-btn-section button{
        width:20%;
    }

    .tripel-part-data{
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        margin-bottom: 10px;
    }
    .data-label{
        font-weight: bold;
    }
  
    .tripel-part{
        width: 32%;
        /* border: solid 1px #a2a2a2; */
        padding: 10px;
        margin-bottom: 20px;
        grid-template-rows: 20px 50px 1fr 50px;
        border-radius: 10px;
        box-shadow: 0px 6px 10px rgb(0 0 0 / 25%);
        color: #2b2b2b;
        background: rgba(146,146,148, 0.5);
        background: radial-gradient(circle, rgba(146,146,148,0.1) 20%, rgba(81, 93, 99, 0.3) 100%);
        transition: all 200ms ease-in;

    }
    .tripel-part:hover{
        transform: scale(1.02);
    }

    .tripel-wrapper{
        width:90%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;

    }
    .selector-label{
        color:#2b2b2b;
        font-weight: 700;
    }
    .ontology-info-wrapper{
        width:100%;
        display: flex;
    }
    .tripel-list-item{
        display:flex;
    }

    .tripel-actions{
        margin: auto;
    }
    .fail-add-text{
        color: orangered;
        font-size: 16px;
        font-weight: 700;
    }
</style>







/*     triples:[{
                subject: {
                    name: "Device",
                    comment: "This Device measures temperature and humidity",
                    label: "TempHumDevice",
                    id: 1,
                },
                predicate:{
                    name: "hasCommand",
                    id: 2,
                },
                objects: [
                    {
                        name: "MeasureCommandSend",
                        comment: "this Command sends the measured value",
                        label: "MeasureCommandSend",
                        id: 3,
                    },
                    {
                         name: "MeasureCommandReceive",
                        comment: "this command recieves a measurement from hardware",
                        label: "MeasureCommandReceive",
                        id: 4,
                    }
                ]
            },
            {
                subject: {
                   name: "MeasureCommandSend",
                        comment: "this Command sends the measured value",
                        label: "MeasureCommandSend",
                        id: 3, 
                },
                predicate:{
                    name: "isRxOrTC",
                    id: 5,
                },
                objects: [
                    {
                        name: "RX",
                        comment: "Receiving Property",
                        label: "Receive",
                        id: 6,
                    }
                ]
            },
            a_classes: [{
                        name: "MeasureCommandSend",
                        comment: "this Command sends the measured value",
                        label: "MeasureCommandSend",
                        id: 3,
                    },
                    {
                         name: "MeasureCommandReceive",
                        comment: "this command recieves a measurement from hardware",
                        label: "MeasureCommandReceive",
                        id: 4,
                    }],
            ] */