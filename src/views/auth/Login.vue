<template>

<section id="login" class="login-section">
    <div class="login-content">
        <div class="image-side">
            
        </div>

        <div class="form-side">
            <div class="wrapper">

                <div class="app-title">
                <h1>SemanticSens</h1>
            </div>
                <form ref="form" @submit.stop.prevent="handleSubmit">

                    <div class="form-floating mb-3">
                        <input type="email" v-model="email" class="form-control" id="emailInput" placeholder="E-Mail"/>
                        <label for="emailInput">E-Mail</label>
                    </div>

                    <div class="form-floating mb-3">
                        <input type="password" v-model="password" class="form-control" id="passwordInput" placeholder="Password"/>
                        <label for="passwordInput">Password</label>
                    </div>

                    <div class="submit">
                        <button class="btn-lg btn-primary mr" type="button" @click="login">Login</button>
                        <button class="btn-lg btn-primary" type="button" @click="register">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
    
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    computed:{
        ...mapGetters('auth',{
            getterLoginStatus: 'getLoginStatus'
        })
    },
    methods: {
        ...mapActions('auth', {
            actionLogin: 'login'
        }),
        handleSubmit(){
            console.log("login")
        },
        async login(){
            await this.actionLogin({
                email: this.email,
                password: this.password
            });
            if(this.getterLoginStatus === 'success'){
                this.$router.push("/annotation-pool")
            }else{
                alert('Failed to login - please check credentials')
            }
        }
    }
}
</script>


<style scoped>
.mr{
    margin-right: 15px;
}
.login-section{
    height: 100%;
    position: absolute;
    width: 100%;
}
.login-content{
    height: 100%;
    /* position: absolute; */
    width: 100%;
    display: flex;
}

.image-side{
    width: 60%;
    background-image: url('../../assets/images/login_back.png');
    background-size: cover;
}
.form-side{
    width: 40%;
    padding: 30px 100px;
    margin: auto;
    width: 50%;
}
.wrapper{

}
.app-title{
    margin-bottom: 100px;
}
.app-title h1{
    color: #3B4018;
    font-size:70px!important;
    font-weight: 300;
}
.submit{

}
</style>