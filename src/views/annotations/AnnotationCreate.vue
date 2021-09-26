<template>
    <div class="container mb-4">
        <objects-modal :show="openModal" @close="closeDialog"></objects-modal>
        <div class="action-bar">
           <div class="dropdown">
                        <button class="dropdown-toggle btn btn-primary" type="button" id="subjectDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
                            Actions
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="subjectDropdownButton">
                        <li><a class="dropdown-item" href="#">Semantic Hardware Web Ontology</a></li>
                        <li><a class="dropdown-item" href="#">CMS-Blogcontent Ontology</a></li>
                    </ul>
                    </div>
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
         <select class="form-select d-flex justify-content-center" @change="onOntologySelectorChange($event)" v-model="ontology_id" aria-label="Ontology Selector">
                        <option selected>Select Ontology</option>
                        <option v-for="ont in ontologies" :key="ont.id" :value="ont.id">{{ont.title}}</option>
                    </select>
        </div>
        <div class=" ontology-details">
            <div class="single-detail">
                <span>Title</span>
                <p>{{chosenOntology.title}}</p>
            </div>
              <div class="single-detail">
                <span>Creation Date:</span>
                <p>{{chosenOntology.creation_date}}</p>
            </div>
             <div class="single-detail">
                <span>Last Updated:</span>
                <p>{{chosenOntology.last_updated}}</p>
            </div>
        </div>
            <div class="ontology-description">
          <p>{{chosenOntology.description}}</p>
        </div>
    </div>
</div>
<annotation-individual :individualsList="individuals" @add-individual="addIndividual"></annotation-individual>


<div id="add_annotation" class="add-annotation">
    <div class="annotation-create-wrapper">
    <div class="annotation-create-item">
        <div class="add-annotation-section-header">
                    <h3>Subject</h3>
                     <select class="form-select d-flex justify-content-center" aria-label="Default select example" @change="onSubjectSelectorChange($event)" v-model="subject_id">
                        <option value="-1" selected>Select Subject Class</option>
                        <option v-for="sub in subjects" :key="sub.id" :value="sub.id">{{sub.class_data.name}}</option>    
                    </select>
            </div>
            <div class="triple-save p-2" >
                <div class="triple-save-section subject">
                    <div class="input-group mb-3">
                        <input type="text" class="w-100 text-center" placeholder="Enter Label for Subject" aria-label="Label" aria-describedby="label_input">
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="w-100 text-center" placeholder="Enter Comment for Subject" aria-label="Label" aria-describedby="label_input">
                    </div>
                </div>
            </div>
    </div>
    
      <div class="annotation-create-item">
        <div class="add-annotation-section-header">
                    <h3>Predicate</h3>
                    <select class="form-select d-flex justify-content-center" aria-label="Default select example" @change="onPredicateSelectorChange($event)" v-model="predicate_id">
                        <option value="-1" selected>Select Predicate</option>
                        <option v-for="pred in predicates" :key="pred.id" :value="pred.id">{{pred.name}}</option>  
                    </select>
            </div>
                  <div class="triple-save p-2" >
                <div class="triple-save-section subject">
                    <div class="input-group mb-3">
                        <input type="text" class="w-100 text-center" placeholder="Enter Label for Subject" aria-label="Label" aria-describedby="label_input">
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="w-100 text-center" placeholder="Enter Comment for Subject" aria-label="Label" aria-describedby="label_input">
                    </div>
                </div>
            </div>
    </div>

      <div class="annotation-create-item">
        <div class="add-annotation-section-header">
                    <h3>Object</h3> 
                    <button class="btn btn-primary" @click="toggleObjectModal()" type="button" id="openModal">Choose Object</button>                   
            </div>
            <div class="triple-save p-2" >
                <div class="triple-save-section object">
                    <span class="">Please choose object</span>
            </div>
        </div>
    </div>
    </div>
                <div class="add-tripel-btn-section">
                    <button class="btn-lg btn-primary" type="button" id="addTriple" @click="listClasses()"> 
                            Add Triple
                        </button>
                </div>
                  
            </div>


    
<annotation-tripel v-for="tripel in tripels" :key="tripel" :triple="tripel"></annotation-tripel>
</div>
</template>

<script>
import AnnotationTripel from '../../components/annotations/AnnotationTripel.vue'
import AnnotationIndividual from '../../components/annotations/AnnotationIndividual.vue'

import ObjectsModal from '../../components/annotations/ObjectsModal.vue'
export default {
      components: {
        AnnotationTripel,
            ObjectsModal,
        AnnotationIndividual,
  },
    data(){
        return{

            title: "",
            author: "", 
            date: "",
            description: "",

            openModal: false,
            individuals: [],
            //variables current editable triple
            //subject
            value: "",
            subject_id: "",
            ontology_id: "",
            predicate_id: "",
            subject: null,
            predicate: null,

            //predicate

            p_id: "",
            p_name:"",
            //object
            o_array: {},


            //triples
            tripels: []
         

        }
    },
    methods: {
        addIndividual(data){
            console.log("hello")
            console.log(data)
            this.individuals.push(data)
            console.log(this.individuals)
        },
        closeDialog(){
            this.openModal = false;
            return;
        },
        toggleObjectModal(){
            this.openModal = !this.openModal
            console.log(this.openModal)
            return this.openModal
        },
        listClasses(){
            console.log("hello")
            this.$store.getters['ontologies/getClasses'];
            this.$store.getters['ontologies/getPossibleTripels']("d5bf416f900c4f4098a502b44cd0c139");
            this.$store.getters['ontologies/isInPossibleTripels']("d5bf416f900c4f4098a502b44cd0c139", {
                subj: "3",
                pred: "1431",
                obj: "2"
            });
        },
        onOntologySelectorChange(event){
            console.log(event.target.value)
        },
        onSubjectSelectorChange(event){
             this.subject = {
                "id": event.target.value,
                "data":  this.$store.getters['ontologies/getClassData'](event.target.value)
            }
        },
        onPredicateSelectorChange(event){
            console.log(event.target.value)
        }
    },
    computed: {
        ontologies(){
            return this.$store.getters['ontologies/ontologies'];
        },
        subjects(){
            return this.$store.getters['ontologies/getSubjects'];
        },
        predicates(){
            return this.$store.getters['ontologies/getPredicates'];
        },
        chosenOntology(){
            return this.$store.getters['ontologies/getChosenOntology']
        },            
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
       
    }

    .add-annotation-section-header{
        width: 100%;
        padding: 20px;
        background-color: #3B4018;
        color: white;
        justify-content: center;
        display: flex;
        flex-direction: column;
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
        margin-bottom: 50px;
    }
    .object{
        text-align: center;
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