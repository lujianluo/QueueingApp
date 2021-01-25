<template>
<div data-app> 
<QueueDisplay v-bind:RestaurantId = "RestaurantId" />
<GetTicketBtn v-bind:RestaurantId = "RestaurantId"/>
<CheckQueueNumber v-bind:RestaurantId = "RestaurantId"/>
</div>
</template>

<script>

import QueueDisplay from '../components/QueueDisplay'
import GetTicketBtn from '../components/GetTicketBtn'
import CheckQueueNumber from '../components/CheckQueueNumber'

export default {
  name: "RestaurantPage",
  components: {
    QueueDisplay,
    GetTicketBtn,
    CheckQueueNumber,
  },
  data(){
    return{
      RestaurantId: this.$route.params.RestaurantId
    }
  }
}
</script>

