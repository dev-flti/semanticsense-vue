<template>
    <div class="container">
        <section>
            Filter
        </section>
        <div class="inner-container">
            <annotation-item v-for="item in loadAnnotations" 
            :key="item.id" 
            :title="item.projectName" 
            :description="item.description"
            :creator="item.creator"></annotation-item>
        </div>
    </div>
</template>

<script>
import AnnotationItem from '../../components/annotations/AnnotationItem.vue'
export default {
    components: {AnnotationItem},
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