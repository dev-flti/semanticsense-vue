<template>
    <footer>
            <div class="copyright">
                <p>Copyright 2021 © university augsburg</p>
            </div>
            <div>
                <ul>
                    <li>
                        <router-link to="/" v-if="!isLoggedIn">Imprint</router-link>
                    </li>
                    <li>
                        <router-link to="/">Data protection</router-link>
                    </li>
                </ul>
            </div>
    </footer>
</template>

<script>
export default {}
</script>

<style scoped>
 footer {

    position: fixed;
    height: 50px;
    flex: 0 0 50px;
     bottom: 0px;
    left: 0px;
    right: 0px;
    margin-bottom: 0px;
    display: flex;
     justify-content: space-between;
     background-color: white;
     border-top: solid #3B4018 2px;
    width: 100%;
    color: #3B4018;
    text-align: center;
    padding: 0 2rem;
 }
 footer .copyright{
     display: flex;
     justify-content: center;
    align-items: center;
 }

  footer p{
    padding: 0;
    margin: unset;
 }

 footer ul{
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
 }


 footer a {
  text-decoration: none;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  color: #3B4018;

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
</style>