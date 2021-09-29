<template>
    <annotation-detail-modal  :show="show" :id="id" @close="closeModal"></annotation-detail-modal>
    <div>
        <div class="card">
          <img :src="require('../../assets/images/sensor_2.jpeg')" class="card-img-top" alt="Picture">

            <h5 class="card-title">{{ title }}</h5>
            <p>{{ author }}</p>
            <p class="card-text">
                {{description}}
            </p>

            <div class=actions>
        <button @click="openDetails()" class="btn btn-outline-secondary">Open</button>
</div>
</div>
</div>

</template>

<script>
import AnnotationDetailModal from "../../components/annotations/AnnotationDetailModal.vue"
export default {
    data(){
        return{
            show: false,
        }
    },
    components: {
        AnnotationDetailModal
    },
    props: ['id','title', 'description', 'author'],
    methods: {
        openDetails(){
            this.show = true
            console.log(this.id)
        },
        closeModal(){
            this.show = false;
        }
    }
}
</script>

<style scoped>
    .controls {
    display: flex;
    justify-content: space-between;
    }

    .card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem 2rem;
  max-width: 20rem;
}
</style>