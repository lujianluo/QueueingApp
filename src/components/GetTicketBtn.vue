<template>
    <div class="GetTicketBtn">
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined color="error" v-bind="attrs" v-on="on">
                        Queue Here!
                    </v-btn>
                </template>
                <v-card>
                        <v-text-field
                            label="Enter Your PhoneNumber Here"
                            :rules="rules"
                            hide-details="auto"
                            v-model="UserInput"
                        >
                        </v-text-field>
                        <v-select
                        :items="items"
                        label="SelectSlot"
                        solo
                        v-model="SelectedSlot"
                        ></v-select>
                        <v-btn 
                        text 
                        @click="SubmitQueue"
                        color="primary">
                            Submit
                        </v-btn>
                        <v-btn 
                        text 
                        @click="dialog = false"
                        color="error">
                            Close
                        </v-btn>
                </v-card>
            </v-dialog>
        </v-row>        
    </div>
</template>

<script>
import { db} from '../firebase';
import firebase from '@firebase/app'

export default {
    name: "GetTicketBtn",
    props: ['RestaurantId'],
    data() {
        return {
            dialog: false,
            rules: [
                value => !!value || 'Required.',
                value => {
                const pattern = /^[0-9]\d*$|^$/
                return pattern.test(value) || 'Numbers Only'
                },
                value => (value && value.length == 8) || 'Eight Number needed',
            ],
            items: ['SlotA','SlotB','SlotC'],
            UserInput:"",
            SelectedSlot:"",
        }
    },
    methods:{
       SubmitQueue(){
             db.collection("Restaurant").doc(this.RestaurantId).collection("QueueInfo").doc(this.SelectedSlot)
            .get()
            .then((Snapshot) =>{
                const QueueIssued = Snapshot.data().Issued
                db.collection("Restaurant").doc(this.RestaurantId).collection("QueueSetting").doc(this.SelectedSlot)
                .get()
                .then((Snapshot)=>{
                    const QueueLimit = Snapshot.data().QueueLimit
                    console.log(QueueLimit+ "and"+ QueueIssued )
                        if (QueueIssued < QueueLimit){
                            var vm = this;
                            db.collection("Restaurant").doc(vm.RestaurantId).collection("QueueRecord")
                            .where("Contact", "==", vm.UserInput).where("Status", "==", "Processing")
                            .get()
                            .then(function(querySnapshot){
                                if (querySnapshot.size != 0){
                                    alert ("you can only queue for one slot at a time")
                                }   else{
                                        db.collection("Restaurant").doc(vm.RestaurantId).collection("QueueInfo").doc(vm.SelectedSlot)
                                        .get()
                                        .then((Snapshot) =>{
                                            const NewNumber = Snapshot.data().Issued +=1;
                                            db.collection("Restaurant").doc(vm.RestaurantId).collection("QueueInfo").doc(vm.SelectedSlot).update({
                                                Issued: firebase.firestore.FieldValue.increment(1),
                                                Waiting: firebase.firestore.FieldValue.increment(1),
                                            });
                                            db.collection("Restaurant").doc(vm.RestaurantId).collection("QueueRecord").add({
                                                Contact: vm.UserInput,
                                                Identifier: vm.SelectedSlot,
                                                QueueNumber: NewNumber,
                                                Status: "Processing",
                                            })
                                            alert("your Number is" + NewNumber)
                                        })
                                         .catch(function(error) {
                                            console.log("Error getting documents: ", error);
                                        })
                                        vm.$router.push({ name: 'QueueingPage', params: { RestaurantId: vm.RestaurantId, Contact:vm.UserInput}})    
                                    }
                            })
                        } else {
                            alert ("Queue Limit Exceeded")
                        }
                })
            }),
            this.dialog = false
        },

    },
}
</script>
<style>
.GetTicketBtn{
    height:10vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>