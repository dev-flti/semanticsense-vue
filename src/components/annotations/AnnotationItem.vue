<template>
    <div>
        <base-card>
          <img src="../../assets/images/sensor_test.webp" class="card-img-top" alt="Picture">

            <h5 class="card-title">{{ title }}</h5>
            <p>{{ creator }}</p>
            <p class="card-text">
                {{description}}
            </p>

            <div class=actions>
<button @click="openDetails" class="btn btn-outline-secondary">Open</button>
</div>
</base-card>
</div>

</template>

<script>
export default {
    props: ['title', 'description', 'creator'],
    methods: {
        openDetails(){
            console.log(this.$route.path + "/id")
        }
    }
}
</script>

<style scoped>
    .controls {
    display: flex;
    justify-content: space-between;
    }
</style>