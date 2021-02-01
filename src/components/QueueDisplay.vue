<template>
  <div class="QueueDisplay">
    <v-container>
      <v-card class="mx-auto">
        <v-card-title>
            {{RestaurantId}} --- {{RestaurantInfo.RestaurantName}}
        </v-card-title>
      </v-card>
    </v-container>

    <div v-for="Slot in Slots" :key="Slot.Name">
      <v-container class="DisplayContainer">
          <v-card class="ReuseableCard" max-height="15vh">
            <v-list>
              <div v-for="id in QueueSetting" :key="id.id">
                <div v-if="id.Identifier == Slot">
                  <v-list-item-title>
                    {{Slot}} ---- {{id.MinPax}} - {{id.MaxPax}} Pax
                  </v-list-item-title>
                </div>
              </div>

              <div v-for="doc in QueueInfo" :key="doc.id">
                <div v-if="doc.Identifier == Slot">
                  <v-list-item-subtitle>
                    Now Serving: {{doc.Current}}
                    <br>
                    Numbers of Waiting: {{doc.Waiting}}
                  </v-list-item-subtitle>
                </div>
              </div>
            </v-list>
          </v-card>
        </v-container>
    </div>
  </div>
</template>

<script>
import { db} from '../firebase';

export default {
  name: "QueueDisplay",
  props: ['RestaurantId'],
  data(){
    return{
        RestaurantInfo: [],
        QueueInfo: [],
        QueueSetting: [],
        Slots: ['SlotA', 'SlotB', 'SlotC'],
    }
  },
  methods:{
    LoadRestaurantInfo(){
      db.collection("Restaurant").where("RestaurantId", "==", parseInt(this.RestaurantId))
      .get()
      .then((querySnapshot) =>{
        querySnapshot.forEach((doc)=> {
          this.RestaurantInfo = doc.data();    
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    },

    LoadQueueInfo(){
      db.collection("Restaurant").doc(this.RestaurantId).collection("QueueInfo")
      .get()
      .then((querySnapshot) =>{
        querySnapshot.forEach((doc)=> {
          this.QueueInfo.push(doc.data());    
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    },

    LoadQueueSetting(){
      db.collection("Restaurant").doc(this.RestaurantId).collection("QueueSetting")
      .get()
      .then((querySnapshot) =>{
        querySnapshot.forEach((doc)=> {
          this.QueueSetting.push(doc.data());    
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    },
  },

  created() {
    this.LoadRestaurantInfo();
    this.LoadQueueInfo();
    this.LoadQueueSetting();
  },
}
</script>

<style>
.QueueDisplay{
  position: relative;
  align-items: center;
  justify-content: center;
  height: 60vh;
}
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 15vh;
}
.ReuseableCard{
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  min-width: 250px;
}

</style>