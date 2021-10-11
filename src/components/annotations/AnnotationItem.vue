<template>
<div>
    <annotation-detail-modal  :show="show" :id="id" :data="data" @close="closeModal"></annotation-detail-modal>
    <div>

        <div class="card">
            <div>
                <div class="custom-card-header">
                    <div class="header-left">
                        <p class="author">Universität Augsburg</p>
                    </div>
                    <div class="header-right">
                        <p class="timestamp">{{creationDateConverted}}</p>
                    </div>

                </div>

                <img :src="require('../../assets/images/sensor_2.jpeg')" class="card-img-top" alt="Picture">

            <h6 class="category">{{categoryName}}</h6>
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">
                {{description}}
            </p>

            <div class=actions>
        <button @click="openDetails()" class="btn btn-outline-secondary">Open</button>
</div>
            </div>
         
</div>
</div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import AnnotationDetailModal from "../../components/annotations/AnnotationDetailModal.vue"
export default {
    data(){
        return{
            show: false,
            data: null
        }
    },
    components: {
        AnnotationDetailModal
    },
    props: ['id','title', 'description', 'author', 'creationDate', 'categoryName'],
    methods: {
        ...mapActions('annotations', {
            loadAnnotationDataAction: 'loadAnnotationData',
        }),
        async openDetails(){
            this.show = true
            let data = await this.loadAnnotationDataAction(this.id)
            this.data = data
            console.log(this.data)
            console.log(this.id)
        },
        closeModal(){
            this.show = false;
        }
    },
    computed: {
        creationDateConverted(){
            let date = new Date(this.creationDate)

            return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()
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
.timestamp{
    color: #9e9e9e;
}
.author{
    color: #9e9e9e;

}
.custom-card-header{
    justify-content: flex-end;
    display: flex;
}
.header-left{
width: 58%;
}
.header-right{
    width:58%;
    text-align: end;
}
</style>