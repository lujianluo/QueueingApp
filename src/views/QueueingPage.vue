<template>
    <div >
        <v-app-bar>
            <v-row>
                <v-col>
                <h3>Your Slot:</h3>{{QueueingSlot}}
                </v-col>
                <v-col>
                <h3>Your Number:</h3>
                {{QueueingNumber}}
                </v-col>
            </v-row>
        </v-app-bar>
        <v-main class="QueueingPage" style="background-image: url('https://media.giphy.com/media/OkVVUlG40FnuE/giphy.gif'); background-size: 100% 100%;">
            <QueueDisplay :RestaurantId = "RestaurantId" />
            <ShowMenu :RestaurantId = "RestaurantId"/>
        </v-main>
    </div>
</template>
<script>
import { db} from '../firebase'
import QueueDisplay from '../components/QueueDisplay'
import ShowMenu from '../components/ShowMenu'

export default {
  name: "QueueingPage",
  components: {
    QueueDisplay,
    ShowMenu
  },
  data(){
    return{
      RestaurantId: this.$route.params.RestaurantId,
      Contact: this.$route.params.Contact,
      QueueingSlot: "",
      QueueingNumber: "",
    }
  },
    methods:{
        LoadData(){
            var vm = this;
                db.collection("Restaurant").doc(this.RestaurantId).collection("QueueRecord")
                .where("Contact", "==", this.Contact)
                .get()
                .then(function(querySnapshot){
                    querySnapshot.forEach(function(doc) {
                        vm.QueueingSlot = doc.data().Identifier
                        vm.QueueingNumber = doc.data().QueueNumber
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
<style>
.QueueingPage{
    height:90vh
}
</style>