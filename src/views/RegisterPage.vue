<template>
    <div class="Register" style="background-image: url('https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'); background-size: 100% 100%;">
        <div class="RegisterMain">
            <v-main>
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
                    <v-text-field
                        v-model="name"
                        label="RestaurantName"
                        required
                    ></v-text-field>
                    <v-btn
                    color="success"
                    @click="submit"
                    >
                        Register
                    </v-btn>
                    <br>
                    <router-link to="RegisterPage">Already have an account? Login Here!</router-link>
                </v-form>   
            </v-main>
        </div>
    </div>
</template>

<script>
import {db,fb} from '../firebase'

export default {
    name: "ResgisterPage",
    data(){
        return{
            name:"",
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
            db.collection("Record").doc("IdRecord")
            .get()
            .then((Snapshot) =>{
                const NewId = Snapshot.data().RestaurantId +=1;
                var vm = this;
                const NewDocId = String(NewId)
                fb
                .auth()
                .createUserWithEmailAndPassword(vm.email, vm.password)
                .then(() => {
                    db.collection("Restaurant").doc(NewDocId).set({
                        RestaurantName: vm.name,
                        RestaurantId: NewId,
                        RestaurantOwner: fb.auth().currentUser.uid,
                        RestaurantMenu: "",
                    });
                    db.collection("Restaurant").doc(NewDocId).collection("QueueInfo").doc("SlotA").set({
                        Identifier: "SlotA",
                        Current: 0,
                        Issued: 0,
                        Waiting: 0,
                    });
                    db.collection("Restaurant").doc(NewDocId).collection("QueueInfo").doc("SlotB").set({
                        Identifier: "SlotB",
                        Current: 0,
                        Issued: 0,
                        Waiting: 0,
                    });
                    db.collection("Restaurant").doc(NewDocId).collection("QueueInfo").doc("SlotC").set({
                        Identifier: "SlotC",
                        Current: 0,
                        Issued: 0,
                        Waiting: 0,
                    });
                    db.collection("Restaurant").doc(NewDocId).collection("QueueSetting").doc("SlotA").set({
                        Identifier: "SlotA",
                        MinPax: 1,
                        MaxPax: 2,
                        QueueLimit: 20,
                    });
                    db.collection("Restaurant").doc(NewDocId).collection("QueueSetting").doc("SlotB").set({
                        Identifier: "SlotB",
                        MinPax: 3,
                        MaxPax: 4,
                        QueueLimit: 20,
                    });
                    db.collection("Restaurant").doc(NewDocId).collection("QueueSetting").doc("SlotC").set({
                        Identifier: "SlotC",
                        MinPax: 5,
                        MaxPax: 6,
                        QueueLimit: 20,
                    });
                    db.collection("Record").doc("IdRecord").update({
                        RestaurantId: NewId
                    });
                })
                this.$router.replace({ name: "SettingPage"});
            })
        }
    }    
}
</script>
<style>
.Register{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
.RegisterMain{
    width:75%
}
</style>