<template>
    <div id='app'>
        <v-form>
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