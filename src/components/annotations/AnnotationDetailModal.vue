<template>
  <teleport to="body">
    <div v-if="show" @click="closeDialog" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
                    
            <menu>
                <button class="btn-lg btn-primary" @click="exportData">Get JSON-LD</button>
                <button class="btn-lg btn-primary" @click="closeDialog">Close</button>
            </menu>

            <div>
                <div v-if="data" class="accordion" id="accordionRelations">

                  <div v-for="(value, key) in data" :key="key" class="accordion-item">
                  <h2 class="accordion-header" :id="'header-'+key">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#body-'+key" aria-expanded="false" :aria-controls="'body-'+key">
                      {{value.subject.name}}
                  </button>
                  </h2>

                 <div :id="'body-'+key" class="accordion-collapse collapse" :aria-labelledby="'header-'+key" data-bs-parent="#accordionRelations">
                    <div class="accordion-body">
                      <div class="row">
                        <div>
                        </div>
                       <div class="relation-wrapper" v-if="value.not_functional != 0">
                            <h3>Object - Relations</h3>

                            <div class="relation-item" v-for="(item, index) in value.not_functional" :key="index">
                                <div class="left-side">
                                  {{item.predicate.name}}
                                </div>
                                <div class="icon">
                                  <img :src="require('../../assets/icons/arrow-alt-circle-right.svg')">
                                </div>
                                <div class="right-side">
                                  <p class="item-name">{{item.object.name}}</p>
                                  <p>{{item.object.label[0]}}</p>
                                  <p>{{item.object.comment[0]}}</p>

                                </div>
                            </div>
                        </div>
                        <div class="relation-wrapper" v-if="value.functional.length != 0">
                            <h3>Literal - Relations</h3>
                            <div class="relation-item" v-for="(item, index) in value.functional" :key="index">
                                <div class="left-side">
                                  {{item.predicate.name}}
                                </div>
                                <div class="icon">
                                  <img :src="require('../../assets/icons/arrow-alt-circle-right.svg')">
                                </div>
                                <div class="right-side">
                                  <p class="item-name">Value</p>
                                  <p >{{item.object.value}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="empy-list-wrapper" v-if="(value.functional.length == 0) && (value.not_functional == 0)">
                            <div class="empty-list">
                                <h4>No Objects or Literals</h4>
                            </div>
                        </div>
                      </div>
                      <!-- <div class="row">
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
                      </div> -->
                    </div>
                  </div>

              </div>
          </div>
            </div>

       
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
    props: ['show', 'id', 'data'],
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
  overflow: scroll;
  background-color: white;
  max-height: 800px;
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

.relation-wrapper{
}

.relation-item{
    display: flex;
    margin-bottom: 20px;
}
.relation-item p{
  margin: 0;
  padding: 0;
}

.left-side{
  width: 40%;
  margin:auto;
}
.right-side{
width: 40%;
}
.icon{
  margin: auto;
    width:30%;
}
.icon img{
  margin: auto;
  max-height: 30px;;
}
.item-name{
  font-weight: 800;
}
#accordionRelations .accordion-button{
        background-color: #8c8c8c ;
        color: white!important;
    }
.accordion-button::before{
  background-image: url(../../assets/icons/chevron-down-white.svg);
}
.accordion-button::after{
  background-image: url(../../assets/icons/chevron-up-white.svg);
}
.empty-list{
 width: 100%;
 margin: auto;
 text-align: center;
}
.empty-list-wrapper{
  padding: 30px;
}
</style>
