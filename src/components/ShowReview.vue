<template>
    <div class="show">
        <v-row justify="center">
            <v-dialog v-model="dialog"  fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined color="normal" v-bind="attrs" v-on="on">
                        Show Review
                    </v-btn>
                </template>
                <v-card>
                    <v-toolbar color="primary">
                        <v-btn
                            icon
                            dark
                            @click="dialog = false"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Reviews</v-toolbar-title>
                    </v-toolbar>
                            <div v-for="feedback in Feedbacks" :key="feedback.id">
                            <v-card >
                                <v-card-title>
                                    {{feedback.name}}
                                </v-card-title>
                                <v-card-subtitle>
                                    <v-rating
                                        v-model="feedback.rating"
                                        background-color="red lighten-3"
                                        color="red"
                                        small
                                    ></v-rating>                                   
                                </v-card-subtitle>
                                <v-card-text>
                                    {{feedback.text}}
                                </v-card-text>
                            </v-card>
                            </div>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import {db} from '../firebase'
export default {
    name:"ShowReview",
    props: ['RestaurantId'],
    data(){
        return{
            dialog: false,
            Feedbacks: [],
        }
    },
    methods:{
        LoadData(){
            var vm = this
            db.collection("Restaurant").doc(this.RestaurantId).collection("Feedback")
            .get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                    vm.Feedbacks.push(doc.data())
                })
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            })            
        }
    },
    created(){
        this.LoadData();
    }
}
</script>