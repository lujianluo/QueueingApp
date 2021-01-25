<template>
<div data-app> 
<QueueDisplay :RestaurantId = "RestaurantId" />
<GetTicketBtn :RestaurantId = "RestaurantId"/>
<CheckQueueNumber :RestaurantId = "RestaurantId"/>
<ShowMenu :RestaurantId = "RestaurantId"/>
</div>
</template>

<script>

import QueueDisplay from '../components/QueueDisplay'
import GetTicketBtn from '../components/GetTicketBtn'
import CheckQueueNumber from '../components/CheckQueueNumber'
import ShowMenu from '../components/ShowMenu'

export default {
  name: "RestaurantPage",
  components: {
    QueueDisplay,
    GetTicketBtn,
    CheckQueueNumber,
    ShowMenu
  },
  data(){
    return{
      RestaurantId: this.$route.params.RestaurantId
    }
  }
}
</script>

