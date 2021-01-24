<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined color="primary" v-bind="attrs" v-on="on">
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
                    @click="SubmitQueue">
                        Submit
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
            QueueInfo: [],
        }
    },
    methods:{
        UpdateQueue(NewNumber){
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueInfo").doc(this.SelectedSlot).update({
                Issued: firebase.firestore.FieldValue.increment(1),
                Waiting: firebase.firestore.FieldValue.increment(1),
            });
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueRecord").add({
                Contact: this.UserInput,
                Identifier: this.SelectedSlot,
                QueueNumber: NewNumber
            })
        },
        LoadSlotInfo(SlotId){
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueInfo").doc(SlotId)
            .get()
            .then((Snapshot) =>{
                    const SelectedIssued = Snapshot.data().Issued +=1;
                    this.UpdateQueue(SelectedIssued)

            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            })          
        },
        SubmitQueue(){
            this.LoadSlotInfo(this.SelectedSlot)
        }
    },
}
</script>