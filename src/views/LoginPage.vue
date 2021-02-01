<template>
    <div class="Login" style="background-image: url('https://images.unsplash.com/photo-1531685250784-7569952593d2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80'); background-size: 100% 100%;">
        <v-form>
            <v-img :src="Logo" style="width: 150px; height:100px; display: inline-block;"></v-img>
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Password"
                required
            ></v-text-field>
            <v-btn
                color="success"
                @click="submit"
            >
                Login
            </v-btn>
            <br>
            <router-link to="RegisterPage">Do not have an account? Register Here!</router-link>
        </v-form>        
    </div>
</template>

<script>
import {fb} from '../firebase'
export default {
    name:"LoginPage",
    data(){
        return{
            email:"",
            password:"",
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            Logo: require('../assets/logo.png')
        }
    },
    methods:{
        submit(){
            fb
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(data => {
                console.log(data);
                this.$router.replace({ name: "AdminPage" });
            })
            .catch(error => {
                this.error = error;
            });           
        }
    }
}
</script>
<style>
.Login{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>