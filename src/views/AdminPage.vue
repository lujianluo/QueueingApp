<template>
    <div>
        <v-app-bar>
            <v-row>
                <v-col align-self="center">
                    <v-btn color="primary" @click="toSetting">Setting</v-btn>
                </v-col>
                <v-col align-self="center">
                    <v-dialog v-model="dialog" persistent max-width="290">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn outlined color="normal" v-bind="attrs" v-on="on">
                                QR code
                            </v-btn>
                        </template>
                        <v-card>
                            <qrcode-vue :value="RestaurantPageUrl" :size=250 level="H" />
                            <v-btn 
                            text 
                            @click="CloseDialog">
                                Close
                            </v-btn>
                        </v-card>
                    </v-dialog>
                </v-col>
                <v-col>
                    <v-btn color="success" @click="reset">Reset</v-btn>
                </v-col>
                <v-col align-self="center">
                    <v-btn color="error" @click="logout">Logout</v-btn>
                </v-col>
            </v-row>
        </v-app-bar>
        <v-main>
            <v-container>
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Slot
                        </th>
                        <th class="text-left">
                            Issued
                        </th>
                        <th class="text-left">
                            Waiting
                        </th>
                        <th class="text-left">
                            Current
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in QueueInfo"
                        :key="item.name"
                        >
                        <td>{{ item.Identifier }}</td>
                        <td>{{ item.Issued }}</td>
                        <td>{{ item.Waiting }}</td>
                        <td>{{ item.Current }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-container>
            <v-container>
                <v-row justify="center" style="min-height:50px">
                    <h3>Call a Number</h3>
                </v-row>
                <v-row justify="space-between">
                    <div v-for="slot in Slots" :key="slot.name">
                        <v-col>
                            <v-btn @click="callNumber(slot)">{{slot}}</v-btn>
                        </v-col>
                    </div>
                </v-row>
            </v-container>
            <v-container>
                <v-row justify="center" style="min-height:50px">
                    <h4>Now Calling</h4>
                </v-row>

                <v-card>
                   <v-img
                        height="200px"
                        src="https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?cs=srgb&dl=pexels-henry-%26-co-1939485.jpg&fm=jpg"
                    >
                    <v-card-title>
                    {{calledSlot}}
                    </v-card-title>
                    <v-card-subtitle>
                    Number: {{calledNumber}}<br>
                    Contact:{{calledContact}}
                    </v-card-subtitle>
                   </v-img>
                </v-card>

            </v-container>
        </v-main>
    </div>
</template>

<script>
import {db,fb} from '../firebase'
import firebase from '@firebase/app'
import QrcodeVue from 'qrcode.vue'
export default {
    name: "AdminPage",
    components: {
      QrcodeVue,
    },
    data(){
        return{
            headers:[
                {text: "Slot", sortable: false, value:'Identifier'},
                {text: "Current", value: "Current"},
                {text: "Issued", value: "Issued"},
                {text: "Waiting", value: "Waiting"}
            ],
            QueueInfo: [],
            RestaurantId: "",
            Slots: ["SlotA","SlotB","SlotC"],
            dialog: false,
            calledSlot:"",
            calledNumber:"",
            calledContact:"",
        }
    },
    methods:{
        LoadData(){
            db.collection("Restaurant").where("RestaurantOwner", "==", fb.auth().currentUser.uid)
            .get()
            .then((querySnapshot) =>{
                querySnapshot.forEach((doc)=> {
                    const NewId = String(doc.data().RestaurantId);
                    this.RestaurantId = NewId
                    db.collection("Restaurant").doc(NewId).collection("QueueInfo")
                    .onSnapshot((querySnapshot) =>{
                        this.QueueInfo = [];   
                        querySnapshot.forEach((doc)=> {
                        this.QueueInfo.push(doc.data());    
                        });
                    })
                })
            })
        },
        logout(){
            fb
            .auth()
            .signOut()
            .then(() => {
                this.$router.replace({ name: "Home" });
            });
        },
        toSetting(){
            this.$router.push("SettingPage")
        },
        callNumber(slot){
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueInfo").doc(slot)
            .get()
            .then((Snapshot) => {
                const curNum = Snapshot.data().Current
                console.log(" current"+curNum)
                var vm = this;
                db.collection("Restaurant").doc(vm.RestaurantId).collection("QueueRecord")
                .where("Identifier", "==", slot)
                .where("QueueNumber", "==", curNum)
                .where("Status", "==", "Processing")
                .get()
                .then(function(querySnapshot){
                    querySnapshot.forEach(function(doc) {
                        vm.calledSlot = doc.data().Identifier
                        vm.calledNumber = doc.data().QueueNumber
                        vm.calledContact = doc.data().Contact
                        console.log(doc.data().id)
                    })
                })
                .catch(function(error) {
                    console.log("Error getting document:", error);
                })
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            })
            this.updateRecord(slot )

        },
        updateRecord(slot){
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueInfo").doc(slot)
            .update({
                Waiting: firebase.firestore.FieldValue.increment(-1),
                Current: firebase.firestore.FieldValue.increment(1),
            })
        },
        CloseDialog(){
            this.dialog = false
        },
        reset(){
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueInfo").doc("SlotA")
            .update({
                Current: 0,
                Waiting: 0,
                Issued: 0
            });
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueInfo").doc("SlotB")
            .update({
                Current: 0,
                Waiting: 0,
                Issued: 0
            });
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueInfo").doc("SlotC")
            .update({
                Current: 0,
                Waiting: 0,
                Issued: 0
            });
            var vm = this;
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueRecord").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    db.collection("Restaurant").doc(vm.RestaurantId).collection("QueueRecord").doc(doc.id).delete()
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            });
        }
    },
    created(){
        this.LoadData()
    },
    computed: {
        RestaurantPageUrl: function () {
            return  'http://localhost:8080/#/RestaurantPage/' + this.RestaurantId
        }
  }
}
</script>
<style>

</style>