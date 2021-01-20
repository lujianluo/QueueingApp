<template>
<div>
<div v-for= "restaurant in Restaurant" :key="restaurant.id">
{{restaurant.RestaurantName}}
<v-img :src="restaurant.Menu"></v-img>
</div>
</div>
</template>

<script>
import { db,} from '../firebase';

export default {
    data(){
        return{
            RestaurantId: this.$route.params.RestaurantId,
            }
    },
    firestore(){
      return {
        Restaurant: db.collection('Restaurant'),
      }
},
}
</script>