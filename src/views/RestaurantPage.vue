<template>
  <div class="Restaurant" style="background-image: url('https://images.pexels.com/photos/326311/pexels-photo-326311.jpeg?cs=srgb&dl=pexels-pixabay-326311.jpg&fm=jpg'); background-size: 100% 100%;">
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
<style>
.Restaurant{
  height:100vh;
}
</style>

