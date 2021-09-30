<template>
    
    <div :id={id} class="ontology-list-item">
            <p class="onto-title">{{title}}</p>
            <p class="onto-description">{{description}}</p>
            
            <button class="btn-lg btn-secondary" type="button" @click="deleteOntology">Delete</button>

        </div>

</template>

<script>
import { mapActions } from 'vuex'
export default {
    props:['id', 'title', 'description'],
    methods:{
        ...mapActions('ontologies',{
            deleteOntologyAction: 'deleteOntology'
        }),
        deleteOntology(){
            console.log("delete " + this.id)
            this.deleteOntologyAction(this.id)
        }
    },
    
}
</script>

<style scoped>
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