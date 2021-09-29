<template>
    <header v-if="['login'].indexOf($route.name) < 0">
        <nav>
            <span class="nav-headline">
                SemanticSens
            </span>
            <ul>
        <li>
          <router-link to="/annotation-pool">Annotation Pool</router-link>
        </li>
        <li>
          <router-link to="/annotation-create">Create Annotation</router-link>
        </li>
        <li >
          <router-link to="/upload-ontology">Upload Ontology</router-link>
        </li>
         <li >
          <button class="btn-lg btn-primary" @click="logout">Logout</button>
        </li> 
 
            </ul>
        </nav>
    </header>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    methods:{
        ...mapActions('auth', {
            actionLogout: 'logout'
        }),      
        
        logout(){
          console.log("logout")
          this.actionLogout()
          this.$router.push('/login')
      }
    }
}
</script>

<style scoped>
   header {
  width: 100%;
  height: 6rem;

  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

header a {
  text-decoration: none;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  color: #3B4018;

}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #3B4018  ;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3B4018;

}

header .nav-headline{
    font-size: 3rem;
    font-family: Montserrat;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>