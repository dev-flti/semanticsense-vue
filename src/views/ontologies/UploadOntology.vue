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

    <div class="list-sec">

        here is a list 
    </div>
</div>

</template>

<script>
// import TheHeader from '../../components/general/TheHeader.vue';
import {mapActions} from 'vuex';

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
            loadOntologiesAction: 'loadOntologies'
        }),        
        
        async uploadOntology(){
            
            

            console.log("upload")
            console.log(this.title + this.url + this.description + "  " + this.selectedCategory)

            await this.loadOntologiesAction()
            // await this.actionLogin({
            //     url: this.url,
            //     title: this.title,
            //     category_id: this.category_id,
            //     description: this.description

            // });

        }
    },
    computed: {
        isValid(){
            if(this.title != "" && this.url != "" && this.description != "")
                return true
            
            return false
        },
        categories(){
            return this.$store.getters['ontologies/categories']
        }
    },
    }
</script>

<style scoped>

</style>