<template>
  <div>
    <div v-for="Slot in Slots" :key="Slot.Name">
          <v-card class="Reuseable card" elevation="11" shaped max-width="200px">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>
                  <div v-for="id in QueueSetting" :key="id.id">
                    <div v-if="id.Identifier == Slot">
                      {{Slot}} ---- {{id.MinPax}} - {{id.MaxPax}} Pax
                    </div>
                  </div>
                </v-list-item-title>
                <div v-for="doc in QueueInfo" :key="doc.id">
                  <div v-if="doc.Identifier == Slot">
                    <v-list-item-subtitle>
                      Now Serving: {{doc.Current}}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      Numbers of Waiting: {{doc.Waiting}}
                    </v-list-item-subtitle>
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-card>
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