<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">



          <div class="dialog-container">
       
                        
        <form ref="form" @submit.stop.prevent="handleSubmit">


                <div v-if="isFunctional" class="options-wrapper">
                  <div class="options-headlines">
                    <h3>Choose existent Literals</h3>
                     <h4>Creating literal can be done above the tripel building section</h4>
                  </div>
                
                <div v-for="(lit, index) in literals_list" :key="index" class="form-group form-check">
                        <div class="class-description">
                            <div  class="class-description-cb">
                                <input type="checkbox" v-model="selected" @change="updateChecked" :id="lit.id" :value="lit.id" class="form-check-input">
                            </div>
                            <div class="class-description-txt">
                                <p class="bold">Literal</p>
                                <span>{{lit.name}}</span>
                            </div>

                        </div>
                </div>  
                                </div>  


                <div v-if="!isFunctional" class="options-wrapper">
                  <div class="options-headlines"> 
                <h3>Choose existent individual (class objects)</h3>
                <h4>Creating individual can be done above the tripel building section</h4>
                </div>
                <div v-for="(ind, index) in individuals_list" :key="index" class="form-group form-check">
                        <div class="class-description">
                            <div  class="class-description-cb">
                                <input type="checkbox" v-model="selected" @change="updateChecked" :id="ind.id" :value="ind.id" class="form-check-input">
                            </div>
                            <div class="class-description-txt">
                                <p class="bold">{{classes[ind.classId].name}}</p>
                                <div class="object-info-wrapper">
                                <div class="object-info">
                                <p>Name: {{ind.name}}</p>
                                <p>Label: {{ind.label}}</p>
                                </div>
                                <div class="object-description">
                                <p>{{ind.comment}}</p>
                                </div>
                                </div>
                               
                            </div>

                        </div>
                </div>  
                </div>
                

                
                
                <!-- <div>
                    <h3>Create new Individual</h3>
                    <div v-for="clo in classes_opts" :key="clo.value" class="form-group form-check">
                    <input type="checkbox" v-model="selected" :id="clo.value" class="form-check-input">
                    <label class="form-check-label" :for="clo.value" >{{clo.text}}</label>
                </div> 
                </div>--> 
                </form>
            <menu>
                <button class="btn-lg btn-primary" :disabled="selected.length == 0" @click="saveClose">Save & Close</button>
                <button class="btn-lg btn-primary" @click="closeDialog">Close</button>
            </menu>

          </div>
       
      </dialog>
    </transition>
  </teleport>
</template>



<script>
  export default {
      props:['show', 'isFunctional', 'literals', 'individuals', 'classes'],
    data() {
      return {
        name: '',
        nameState: null,
        submittedClasses: [],
        submittedIndividuals: [],
        selected: [], 
      }
    },
    emits: ['close', 'save-close'],
    computed: {
        literals_list(){
            return Object.values(this.literals)
        },
        individuals_list(){
          return Object.values(this.individuals)
        },
        valid(){
            return this.selected.length > 0
        },
      //  a_classes_opts(){
      //      let options = []
      //      console.log(this.a_classes)
      //      this.a_classes.forEach(cl => {
      //          console.log(cl.name)
      //          options.push({
      //              text: cl.name,
      //              value: cl.id
      //          })
      //      });
           
      //      console.log(options)
      //      return options
      //  },
      //  classes_opts(){
      //      let options = []

      //      this.classes.forEach(cl => {
      //          console.log(cl.name)
      //          options.push({
      //              text: cl.name,
      //              value: cl.name
      //          })
      //      });
        
      //      return options
      //  }
    },
    methods: {
        closeDialog() {
            this.$emit('close');
            return;
        },
        saveClose() {
        
        //console.log(this.selected)
        this.$emit('save-close', this.selected);
        this.selected = []
        },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      handleSubmit() {
      }
    }
  }
</script>
<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

dialog {
  position: fixed;
  top: 10vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: scroll;
  max-height:800px;
  background-color: white;
}
.dialog-container{
    width: 90%;
    margin: auto;
    padding: 20px;
}

.dialog-header{
    margin-bottom: 30px;
}

header {
  background-color: #3a0061;
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}

.class-description{
    display: flex;
    margin-bottom: 25px;
}
.class-description-cb{
    margin: auto;
    width: 10%;
}
.class-description-txt{
    width: 90%;
    margin-left: 10px;
        display: flex;
    flex-direction: column;
}
.class-description-txt p{
    margin: 0;
}
.submit-button-wrapper{
    margin: 20px 0;
    display: flex;
    justify-content: flex-end;
}
label{
    color: #ababab;
}

.object-info-wrapper{
  display:flex;
}

.object-info{
  display: block;
  width: auto;
  flex-direction: column;
  margin-right: 20px; 
  color:#6e6e6e;
   
}
.object-description{
  width: 60%;
  color:#6e6e6e;
  text-align: center;

}
.bold{
  margin-bottom: 5px;
  font-weight: 800;
  font-size: 18px;
}

.options-headlines{
  margin-bottom: 30px;
}

</style>