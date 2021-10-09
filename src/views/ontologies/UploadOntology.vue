<template>
<div class="container">
<create-category-modal :show="showDialog" @close="closeModal" @saveClose="saveCloseModal"></create-category-modal>
    <div class="header-section">
        <h1>Upload Ontology</h1>
    </div> 
    <div class="info-section">
        <div>
            Ontologies are schemas with rules that determine the way in which a uniquely identifiable object can be semantically annotated within the semantic web.         
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
            
            <div class="select-category">

            <div class="category-selector form-floating mb-3">
                            <select class="form-select" id="inputSelect" aria-label="Floating label select example" v-model="selectedCategory">
                                <option value="-1" disabled>Open this select menu</option>
                                <option v-for="c in categories" :key="c.id" :value="c.id">{{c.title}}</option>
                            </select>
                            <label for="inputSelect">Select Category</label>
            </div>
            <div class="category-btns">
                <button class="btn btn-secondary" type="button" @click="openCategoryModal()">New Category</button>
            </div>
            </div>

            <div class="form-floating mb-3">
                    <textarea type="text" v-model="description" class="form-control" id="ontologyTitle" placeholder="Enter Title"/>
                    <label for="ontologyTitle">Description</label>

            </div> 

            <button class="btn-lg btn-primary" type="button" :disabled="!isValid" @click="uploadOntology()">Upload</button>

        </form>
    </div>   

    <div class="ontology-list">
        <ontology-item v-for="o in getOntologiesList" :key="o.id" :id="o.id" :title="o.title" :description="o.description"></ontology-item>        
        
    </div>
</div>

</template>

<script>
// import TheHeader from '../../components/general/TheHeader.vue';
import {mapActions, mapGetters} from 'vuex';
import OntologyItem from '../../components/ontologies/OntologyItem.vue';
import CreateCategoryModal from "../../components/ontologies/CreateCategoryModal.vue"

export default {
    components:{
        OntologyItem,
        CreateCategoryModal
        // TheHeader,

    },
    data(){
    
        return {
                title: "",
                url: "",
                description:"",
                selectedCategory: null,
                showDialog: false
            }
        },
    methods: {  
        ...mapActions('ontologies', {
            loadOntologiesAction: 'loadOntologies',
            uploadOntologyAction: 'uploadOntology',
            loadCategoriesAction: 'loadCategories',
            saveCategoryAction: 'saveCategory'
        }),        
        async uploadOntology(){

            await this.uploadOntologyAction({
                title: this.title,
                url: this.url,
                description: this.description,
                category_id: this.selectedCategory
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
        },
        closeModal(){
            this.showDialog = false;
        },
        async saveCloseModal(data){
            
            await this.saveCategoryAction(data)
            await this.loadCategoriesAction()

            this.closeModal()
        },
        openCategoryModal(){
            this.showDialog = true
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
        this.loadCategoriesAction()
    }
    }
</script>

<style scoped>
.info-section{
    margin-bottom: 50px;
    margin-top: 30px;
    font-size: 22px;
}
.form-section{
    
}
 .ontology-list{
     display: flex;
     flex-wrap: wrap;
     margin-top: 50px;

 }

 .category-btns{
     width: 15%;
     display: flex;
     padding: 20px;
     justify-content: center;
     justify-items: center;
 }
 .select-category{
     display: flex;
 }
 .category-selector {
     width: 85%;
 }
</style>