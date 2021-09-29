<template>

<div class="container">
    <div class="header-section">
        <h1>Upload Ontology</h1>
    </div> 
    <div class="info-section">
        <div>
        Ontologien werden als Regelwerk zur semantischen Annotation von realen Objekten, Individuen oder verschiedensten Dingen benötigt.
        </div>
    </div>
    <div class="form-section">
        <form ref="form" @submit.stop.prevent="handleSubmit">
           <div class="form-floating mb-3">
                    <input type="text" v-model="title" class="form-control" id="ontologyTitle" placeholder="Enter Title"/>
                    <label for="ontologyTitle">Title</label>

            </div>

            <div class="form-floating mb-3">
                    <input type="text" v-model="url" class="form-control" id="ontologyUrl" placeholder="Enter Ontology URL"/>
                    <label for="ontologyUrl">URL</label>
            </div>
                
            <div class="form-floating mb-3">
                            <select class="form-select" id="inputSelect" aria-label="Floating label select example" v-model="selectedCategory">
                                <option value="-1" disabled>Open this select menu</option>
                                <option v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</option>
                            </select>
                            <label for="inputSelect">Select Category</label>
            </div>

            <div class="form-floating mb-3">
                    <textarea type="text" v-model="description" class="form-control" id="ontologyTitle" placeholder="Enter Title"/>
                    <label for="ontologyTitle">Description</label>

            </div> 

            <button class="btn-lg btn-primary" type="button" :disabled="!isValid" @click="uploadOntology()">Upload</button>

        </form>
    </div>   

    <div class="ontology-list">
        <div></div>
        <div v-for="o in getOntologiesList" :key="o.id" class="ontology-list-item">
            <p class="onto-title">{{o.title}}</p>
            <p class="onto-description">{{o.description}}</p>
        </div>
        
    </div>
</div>

</template>

<script>
// import TheHeader from '../../components/general/TheHeader.vue';
import {mapActions, mapGetters} from 'vuex';

export default {
    components:{
        // TheHeader,
    },
    data(){
            return {
                title: "",
                url: "",
                description:"",
                selectedCategory: null
            }
        },
    methods: {  
        ...mapActions('ontologies', {
            loadOntologiesAction: 'loadOntologies',
            uploadOntologyAction: 'uploadOntology'
        }),        
        
        async uploadOntology(){
            



            await this.uploadOntologyAction({
                title: this.title,
                url: this.url,
                description: this.description
            })

            await this.loadOntologiesAction()
            // await this.actionLogin({
            //     url: this.url,
            //     title: this.title,
            //     category_id: this.category_id,
            //     description: this.description

            // });
            this.title = ""
            this.url = ""
            this.description = ""
            this.selectedCategory = null
        }
    },
    computed: {
        ...mapGetters('ontologies', {
            getOntologiesList: 'ontologies'
        }),
        isValid(){
            if(this.title != "" && this.url != "" && this.description != "")
                return true
            
            return false
        },
        categories(){
            return this.$store.getters['ontologies/categories']
        }
    },
    created() {
        
        this.loadOntologiesAction()
    }
    }
</script>

<style scoped>
.info-section{
    margin-bottom: 50px;
}
.form-section{
    
}
 .ontology-list{
     display: flex;
     flex-wrap: wrap;
     margin-top: 50px;

 }
 .ontology-list-item{
     margin-bottom:40px;
     margin-left: 40px;
     margin-top: 0;

     width: 23%;
     padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 6px 10px rgb(0 0 0 / 25%);
    color: #2b2b2b;
    background: rgba(146,146,148, 0.5);
    background: radial-gradient(circle, rgba(146,146,148,0.1) 20%, rgba(81, 93, 99, 0.3) 100%);
    transition: all 200ms ease-in;

    }
    .ontology-list-item:hover{
        transform: scale(1.02);
    }
    .onto-description{

    }

    .onto-title{
        font-size: 17px;
        font-weight: 600;
    }
</style>