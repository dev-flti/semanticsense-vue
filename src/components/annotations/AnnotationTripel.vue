<template>
  <div class="tripel-wrapper">
      <div class="tripel-part">
        <div> 
            <span class="tripel-label">Name:</span>
            <p>{{subject.name}}</p>
        </div>
        <div> 
            <span class="tripel-label">Label:</span>
            <p>{{subject.label}}</p>
        </div>
        <div> 
            <span class="tripel-label">Comment:</span>
            <p>{{subject.comment}}</p>
        </div>
          <div> 
            <span class="tripel-label">Id:</span>
            <p>{{subject.id}}</p>
        </div>
        
      </div>
      <div class="tripel-part">
            <div> 
                <span class="tripel-label">Id</span>
                <p>{{predicate.id}}</p>
            </div>
            <div> 
                <span class="tripel-label">Name</span>
                <p>{{predicate.name}}</p>
            </div>
      </div>
      <div class="tripel-part">
            <div class="tripel-obj" v-for="obj in objs" :key="obj">
                <div> 
                <span class="tripel-label">Comment</span>
                <p>test</p>
                </div>
                <div> 
                    <span class="tripel-label">Label</span>
                    <p>test</p>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['triple',],
    data(){

        return {

        }
    },
    computed: {
        subject(){
            return this.triple.subject;

        },
        predicate(){
            return this.triple.predicate;
        },
        objs(){
            return this.triple.objects;
        }
    }
}
</script>

<style scoped>
    .tripel-label{

    }
    
    .tripel-obj{

    }

    .tripel-part{
        width: 32%;
        /* border: solid 1px #a2a2a2; */
        padding: 10px;
        margin-bottom: 20px;
        grid-template-rows: 20px 50px 1fr 50px;
        border-radius: 10px;
        box-shadow: 0px 6px 10px rgb(0 0 0 / 25%);
        color: #2b2b2b;
        background: rgba(146,146,148, 0.5);
        background: radial-gradient(circle, rgba(146,146,148,0.1) 20%, rgba(81, 93, 99, 0.3) 100%);
        transition: all 200ms ease-in;

    }
    .tripel-part:hover{
        transform: scale(1.02);
    }

    .tripel-wrapper{
        width:100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 40px;

    }

 
</style>>

