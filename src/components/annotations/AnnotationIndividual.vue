<template>
    <div class="new-individual-wrapper">
        <div class="individual-list-wrapper">
            <ul class="list-group">
                <li class="list-group-item first-item">
                    <input class=" form-check-input me-1" id="0" type="radio" value="-1" aria-label="-1" checked v-model="checkedIndividual">
                    Create New Individual
                </li>
                 <li v-for="(item, index) in individualsList" :key="index" class="list-group-item">
                    <input class=" form-check-input me-1" type="radio" :id="index" :value="index" aria-label="-1" v-model="checkedIndividual">
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div class="individual-inputs-wrapper">
             <div class="form-floating mb-3">
                            <select class="form-select" id="inputSelect" aria-label="Floating label select example" v-model="selectedClass">
                                <option value="-1" disabled>Open this select menu</option>
                                <option v-for="cl in classes" :key="cl.id" :value="cl.id">{{cl.name}}</option>
                            </select>
                            <label for="inputSelect">Select class for individual</label>
            </div>
            <div class="form-floating mb-3">
                    <input type="text" v-model="individualName" class="form-control" id="individualName" placeholder="Enter Name" :disabled="!!disabledInput"/>
                    <label for="individualName">Name</label>
            </div>
            <div class="form-floating mb-3">
                    <input type="text" v-model="individualLabel" class="form-control" id="individualLabel" placeholder="Enter Label" :disabled="!!disabledInput"/>
                    <label for="individualLabel">Label</label>
            </div>
                
            <div class="form-floating">
                        <textarea v-model="individualComment" :disabled="!!disabledInput" class="form-control" placeholder="Enter comment" id="individualComment" style="resize:none; height: 100px"></textarea>
                        <label for="individualComment">Comment</label>
            </div>
            <div class="individual-buttons">
                <button class="btn btn-primary" :disabled="!!disabledInput" type="button" @click="addIndividual()">Add</button>
        </div>
            </div>
            
    </div>
    <div>
       

    </div>
</template>

<script>
export default {
    data() {
        return {
            checkedIndividual: null,
            individuals: [],
            individualName: "", 
            individualLabel: "", 
            individualComment: "", 
            individualId: "",
            selectedClass: null,
            disabledInput: false
        }
    },
    watch: {
        checkedIndividual(){
            console.log(this.individualsList)
            if(this.checkedIndividual >= 0 ){

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
    props: ['individualsList', ],
    methods: {
        onIndividualChange(event){
            console.log(event.target)
        },
        onClassChange(event){
            console.log(event.target.value)
            console.log(this.classes)
        },
        addIndividual(){
            console.log(this.checkedIndividual)
             if (this.individualName != "" && this.individualLabel != "" && this.individualComment != "" && this.selectedClass){
             /*   this.individuals.push({
                    "name": this.individualName,
                    "label": this.individualLabel,
                    "comment": this.individualComment
                })
            } */
            const data = {
                    "name": this.individualName,
                    "label": this.individualLabel,
                    "comment": this.individualComment,
                    "classId": this.selectedClass
                }
            this.individualName = "";
            this.individualLabel = ""; 
            this.individualComment  = "";
            this.selectedClass = null;
            this.$emit('add-individual', data)
        }
    }
    },
    computed: {
        classes() {
            let classes_arr = []
            Object.entries(this.$store.getters['ontologies/getClasses']).forEach(([key, value]) => {
                let val = value;
                val["id"] = key;
                classes_arr.push(val)
        });
            return classes_arr;
        }
    },
    emits: ['add-individual',]

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
    .first-item{
        color:white;
        background-color: #3B4018;
    }
</style>