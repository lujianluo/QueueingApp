<template>
    <div class="show">
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn outlined color="normal" v-bind="attrs" v-on="on">
                        Show Menu
                    </v-btn>
                </template>
                <v-card>
                    <v-img :src="Menu"></v-img>
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
    name: "ShowMenu",
    props: ['RestaurantId'],
    data(){
        return{
            Menu: "",
            dialog: false
        }

    },
    methods:{
        LoadRestaurantInfo(){
      db.collection("Restaurant").where("RestaurantId", "==", parseInt(this.RestaurantId))
      .get()
      .then((querySnapshot) =>{
        querySnapshot.forEach((doc)=> {
          this.Menu = doc.data().RestaurantMenu;    
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    },
    CloseDialog(){
        this.dialog = false
    }
    },
    created(){
        this.LoadRestaurantInfo();
    }
}
</script>
<style>
.show{
    height:10vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>