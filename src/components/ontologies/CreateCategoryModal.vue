<template>
  <teleport to="body">
    <div v-if="show" @click="closeDialog" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
    <div class="modal-wrapper">

        <h2>Create Category</h2>
            <div class="form-floating mb-3">
                    <input type="text" v-model="title" class="form-control" id="ontologyTitle" placeholder="Enter Title"/>
                    <label for="ontologyTitle">Title</label>

            </div>

            <div class="form-floating mb-3">
                    <textarea type="text" v-model="description" class="form-control" id="ontologyTitle" placeholder="Enter Title"/>
                    <label for="ontologyTitle">Description</label>

            </div> 


            <menu class="menu-btns">
                <button class="btn-lg btn-primary" @click="closeSave">Save</button>
                <button class="btn-lg btn-primary" @click="closeDialog">Close</button>
            </menu>

        </div>    
       
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
    props: ['show'],
    data(){
        return{
            description: "",
            title: ""
        }
    },
    methods: {
        closeSave(){
            this.$emit('saveClose', {description: this.description, title: this.title})
        },
        closeDialog(){
            this.$emit('close')
        }
    },
    emits: ['close', 'saveClose']
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
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
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
.modal-wrapper{
    padding: 20px;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>