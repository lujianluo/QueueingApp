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
        </v-form>        
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
                        Identifier: "SlotA",
                        MinPax: 3,
                        MaxPax: 4,
                        QueueLimit: 20,
                    });
                    db.collection("Restaurant").doc(NewDocId).collection("QueueSetting").doc("SlotC").set({
                        Identifier: "SlotA",
                        MinPax: 5,
                        MaxPax: 6,
                        QueueLimit: 20,
                    });
                    db.collection("Record").doc("IdRecord").update({
                        RestaurantId: NewId
                    });
                    this.$router.replace({ name: "SettingPage"});

                })
            
            })
        }
    }    
}
</script>