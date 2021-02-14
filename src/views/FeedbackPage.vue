<template>
    <div>
        <v-main>
            <v-container>
                <v-rating
                    v-model="rating"
                    background-color="red lighten-3"
                    color="red"
                    large
                ></v-rating>
                <v-text-field
                    v-model="name"
                    label="name"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="contact"
                    label="contact(Optional)"
                ></v-text-field>
                <v-textarea
                    v-model="text"
                    solo
                    name="input-7-4"
                    label="Enter your feedback here"
                ></v-textarea>
                <v-btn
                @click="submit">
                submit
                </v-btn>
            </v-container>
        </v-main>
    </div>
</template>
<script>
import {db} from '../firebase'
export default {
    name: 'FeedbackPage',
    data(){
        return{
            RestaurantId: this.$route.params.RestaurantId,
            name: "",
            contact: "",
            text: "",
            rating: null,
        }
    },
    methods:{
        submit(){
            db.collection("Restaurant").doc(this.RestaurantId).collection("Feedback").add({
                name: this.name,
                contact: this.contact,
                text: this.text,
                rating: this.rating
            })
            .then(function() {
                alert("Document successfully written!");
            })
            .catch(function(error) {
                alert(error);
            });
        }
    }
}
</script>