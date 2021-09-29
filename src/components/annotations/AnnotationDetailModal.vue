<template>
  <teleport to="body">
    <div v-if="show" @click="closeDialog" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
                        
        <h1>{{id}}</h1>
            <menu>
                <button class="btn-lg btn-primary" @click="exportData">Get JSON-LD</button>
                <button class="btn-lg btn-primary" @click="closeDialog">Close</button>
            </menu>

       
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
    props: ['show', 'id'],
    data(){
        return{

        }
    },
    methods: {
        exportData(){
            console.log("export")
        },
        closeDialog(){
            this.$emit('close')
        }
    },
    emits: ['close',]
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

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>