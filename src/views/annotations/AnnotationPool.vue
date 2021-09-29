<template>

    <div class="container">
        <div class="inner-container">
            <annotation-item v-for="item in loadAnnotations" 
            :key="item.id"
            :id="item.id" 
            :title="item.projectName" 
            :description="item.description"
            :author="item.author"></annotation-item>
        </div>
    </div>
</template>

<script>
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
        loadAnnotations(){
            const annotations = this.$store.getters['annotations/annotations'];
            console.log(annotations);
            return annotations;
        }
    }
}
</script>

<style scoped>

    .inner-container{
        display: flex;
        flex-wrap: wrap;
    }
</style>