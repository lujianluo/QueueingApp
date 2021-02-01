<template>
    <div class="Check">
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined color="normal" v-bind="attrs" v-on="on">
                        Check!
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
                    <v-btn 
                    text 
                    @click="CheckQueueNumber">
                        Submit
                    </v-btn>
                    <v-btn 
                    text 
                    @click="CloseDialog">
                        Close
                    </v-btn>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import { db} from '../firebase';
export default {
    name: "CheckQueueNumber",
    props: ['RestaurantId'],
    data(){
        return{
            dialog: false,
            UserInput: "",
            rules: [
                value => !!value || 'Required.',
                value => {
                    const pattern = /^[0-9]\d*$|^$/
                    return pattern.test(value) || 'Numbers Only'
                },
                value => (value && value.length == 8) || 'Eight Number needed',
            ],
        }
    },
    methods:{
        CheckQueueNumber(){
            db.collection("Restaurant").doc(this.RestaurantId).collection("QueueRecord")
            .where("Contact", "==", this.UserInput).where("Status", "==", "Processing")
            .get()
            .then(function(querySnapshot) {
                if(querySnapshot.size == 0){
                    alert("no queue record founded")
                } else {
                    querySnapshot.forEach(function(doc) {
                        alert ("your number is " + doc.data().QueueNumber)
                    })
                }
            })
            this.dialog = false
        },
        CloseDialog(){
        this.dialog = false
    }
    }
}
</script>
<style>
.Check{
  height:5vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>