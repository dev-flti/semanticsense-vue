<template>

    <div class="container">
        <div class="inner-container">
            <annotation-item v-for="item in getAnnotationListAction" 
            :key="item.id"
            :id="item.id" 
            :title="item.title" 
            :description="item.description"
            :author="item.author"
            :creationDate="item.publicated_timestamp"
            :categoryName="item.category_name"></annotation-item>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AnnotationItem from '../../components/annotations/AnnotationItem.vue'
// import TheHeader from '../../components/general/TheHeader.vue';

export default {
    components: {
        AnnotationItem, 
    // TheHeader
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters('annotations', {
            getAnnotationListAction: 'getAnnotations'
        })
    },
    methods: {
        ...mapActions('annotations', {
            loadingAnnotationsAction: 'loadAnnotations'
        }),
    },
    created() {
        this.loadingAnnotationsAction()
        console.log(this.getAnnotationListAction)
    }
}
</script>

<style scoped>

    .inner-container{
        display: flex;
        flex-wrap: wrap;
    }
</style>