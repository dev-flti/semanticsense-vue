<template>
    <div class="new-individual-wrapper">
        <div class="individual-list-wrapper">
            <ul class="list-group">
                <li class="list-group-item first-item">
                    <input class=" form-check-input me-1" id="0" type="radio" value="0" aria-label="-1" checked v-model="literal">
                    Manage Individuals
                </li>
                <li class="mt-1 list-group-item first-item">
                    <input class=" form-check-input me-1" id="1" type="radio" value="1" aria-label="-2" v-model="literal">
                    Manage Literals
                </li>
                </ul>

                <ul v-if="!literalMode" class="list-group">
                <div class="list-scrollable">
                
                <span class="list-sperator">Objects are ressources which are derived from classes.</span>

                 <li v-for="(item, index) in individualsList" :key="index" class="list-group-item">
                    <input class=" form-check-input me-1" type="radio" :id="index" :value="index" aria-label="-1" v-model="checkedIndividual">
                    {{item.name}}
                </li>

                </div>

                </ul>
                

                <ul v-if="literalMode" class="list-group">
                                    <div class="list-scrollable">

                <span class="list-sperator">Literals are values which belong to an functional relation.</span>

                <li v-for="(item, index) in literalList" :key="index" class="list-group-item">
                    <input class=" form-check-input me-1" type="radio" :id="index" :value="index" aria-label="-1" v-model="checkedLiteral">
                    {{item.name}}
                </li>
                                </div>

            </ul>
        </div>
        <div class="individual-inputs-wrapper">
             <div class="form-floating mb-3">
                            <select class="form-select" id="inputSelect" :disabled="!!literalMode || !!disabledInput" aria-label="Floating label select example" v-model="selectedClass">
                                <option value="-1" disabled>Open this select menu</option>
                                <option v-for="cl in classes" :key="cl.id" :value="cl.id">{{cl.name}}</option>
                            </select>
                            <label for="inputSelect">Select class for individual</label>
            </div>
            <div class="form-floating mb-3">
                    <input type="text" v-model="individualName" class="form-control" id="individualName" placeholder="Enter Name" :disabled="!!disabledInput "/>
                    <label v-if="!literalMode" for="individualName">Name</label>
                    <label v-if="literalMode" for="individualName">Value</label>

            </div>
            <div class="form-floating mb-3">
                    <input type="text" v-model="individualLabel" class="form-control" id="individualLabel" placeholder="Enter Label" :disabled="!!disabledInput || !!literalMode"/>
                    <label for="individualLabel">Label</label>
            </div>
                
            <div class="form-floating">
                        <textarea v-model="individualComment" :disabled="!!disabledInput || !!literalMode" class="form-control" placeholder="Enter comment" id="individualComment" style="resize:none; height: 100px"></textarea>
                        <label for="individualComment">Comment</label>
            </div>
            <div class="individual-buttons">
                <button class="btn btn-primary" :disabled="!!disabledInput || buttonEnabled" type="button" @click="addIndividual()">Add</button>
                <button class="btn btn-primary" :disabled="!disabledInput || buttonEnabled" type="button" @click="removeIndividual()">Remove</button>

        </div>
            </div>
            
    </div>
    <div>
       

    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
    data() {
        return {
            checkedIndividual: null,
            checkedLiteral: null,
            individuals: [],
            individualName: "", 
            individualLabel: "", 
            individualComment: "", 
            individualId: "",
            selectedClass: null,
            disabledInput: false,
            literal: ""
        }
    },
    watch: {
        checkedLiteral(){
            console.log(this.checkedLiteral)
             if(this.checkedLiteral != "" ){
            this.individualName = this.literalList[this.checkedLiteral].name
            this.disabledInput = true;
            } else {
            this.individualComment = ""
            this.individualLabel = ""
            this.individualName =  ""
            this.selectedClass = null
            this.disabledInput = false;
            }
        },
        checkedIndividual(){
            console.log(this.checkedIndividual)

            if(this.checkedIndividual != "" ){

            this.individualComment = this.individualsList[this.checkedIndividual].comment
            this.individualLabel = this.individualsList[this.checkedIndividual].label
            this.individualName = this.individualsList[this.checkedIndividual].name
            this.selectedClass = this.individualsList[this.checkedIndividual].classId
            console.log(this.checkedIndividual)
            this.disabledInput = true;
            } else {
            this.individualComment = ""
            this.individualLabel = ""
            this.individualName =  ""
            this.selectedClass = null
            this.disabledInput = false;
            }
        }
    },
    props: ['individualsList', 'literalList'],
    methods: {

        addIndividual(){
            if(!this.literalMode){
                if (this.individualName != "" && this.individualLabel != "" && this.individualComment != "" && this.selectedClass){
                const data = {
                        "name": this.individualName,
                        "label": this.individualLabel,
                        "comment": this.individualComment,
                        "classId": this.selectedClass,
                        "classType": this.$store.getters['ontologies/getClassData'](this.selectedClass).name,
                        "id": uuidv4()
                    }
                this.individualName = "";
                this.individualLabel = ""; 
                this.individualComment  = "";
                this.selectedClass = null;
                this.$emit('add-individual', data)
                }
            }else{
                if(this.individualName != ""){
                    const data = {
                        "name": this.individualName,
                        "id": uuidv4(),
                    }
                this.individualName = "";
                this.$emit('add-literal', data)
                 }
                }
            
            
        },
        removeIndividual(){
            console.log(this.literalList)
            console.log(this.individualsList)
            if(this.literalMode){
                this.$emit('delete-literal', this.checkedLiteral)
                //this.literalList.delete(this.checkedLiteral)

            }else{
                this.$emit('delete-individual', this.checkedIndividual)
                //this.individualsList.delete(this.checkedIndividual)
            }
            this.checkedIndividual = ""
            this.checkedLiteral = ""

}
    
    },
    computed: {
        classes() {
            let classes_arr = []
            let loaded = this.$store.getters['ontologies/getClasses']
            if(loaded && loaded.length>0){

                Object.entries().forEach(([key, value]) => {
                    let val = value;
                    val["id"] = key;
                    classes_arr.push(val)
            });
            }
            return classes_arr;
        },
        buttonEnabled() {
            if(!this.literalMode){
                if ( this.individualName != "" && this.selectedClass && this.individualLabel != "" && this.individualComment != ""){
                return false
                }
                 return true
            }else{
                if ( this.individualName != ""){
                return false
                }
                 return true
            }
            
        },
        isLiteral(){
            if(this.checkedIndividual == "-2"){
                return true;
            }

            return false;
        },
        literalMode(){
            return this.literal == "1"
        }
    },
    emits: ['add-individual','add-literal', 'delete-individual', 'delete-literal']

}
</script>

<style scoped>
    .new-individual-wrapper{
            margin: 40px 0;
            display: flex;
    }
    .individual-list-wrapper{
        width: 30%;
        overflow: scroll;
    }
    .individual-inputs-wrapper{
        width:70%;
        margin-left: 20px;
    }
    .individual-buttons{
        margin-top: 20px;
        display:flex;
        width:100%;
        justify-content: center;
    }
    .individual-buttons button{
        margin-right:10px;
    }
    .first-item{
        color:white;
        background-color: #3B4018;
    }
    .list-sperator{
        color: #989898;
        margin: 10px 0;
        display: flex;
        flex-direction: column;
    }
      .list-scrollable{
            height: 300px;
            overflow-y: auto;
            padding-top: 10px;
    }
</style>